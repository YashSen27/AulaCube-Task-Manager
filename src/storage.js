import Todo, { Project, RetrievedProject, RetrievedTodo } from './createProject';
import { addProjectToDatabase } from './addAndDelete';

//The projects array that is used throughout the app as a database
export let projects = [];

//Store projects from the projects array to the local storage
export function storeProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

/* localStorage.clear(); */

//Retrieve stored projects from the local storage
let storedProjectsWithoutMethods = JSON.parse(localStorage.getItem('projects'));

export let retrievedProjects;
if (!storedProjectsWithoutMethods) {
    const defaultProject = new Project('Deep Dive into DSA');
    const anotherDefaultProject = new Project('Project Title');
    const todoRecipe = new Todo('Learn what is data structure?', 'Trying to get on detail on what are the essential data structures I need to study.', '2023-11-22', 'Low', 'Done');
    const todoMeeting = new Todo('Make base strong', 'Learn about arrays and basic C programming for laying foundation.', '2023-11-25', 'High', 'In progress');
    const todoDIY = new Todo('Learn about Stack, Queue and Linked List', 'Implement the features and solve the coding questions on leetcode.', '2023-12-03', 'Low', 'In progress');
    const todoPhotography = new Todo('Learn about Trees, Graph and Algorithm', 'Practice more related questions on leetcode.', '2023-11-28', 'Low', 'Done');
    const todoMuseum = new Todo('Coding Challenges', 'Participiate in competetitive programming challenges and find whereyou stand.', '2023-11-30', 'High', 'In progress');
    defaultProject.addTodo(todoRecipe);
    defaultProject.addTodo(todoMeeting);
    defaultProject.addTodo(todoDIY);
    defaultProject.addTodo(todoPhotography);
    defaultProject.addTodo(todoMuseum);
    addProjectToDatabase(defaultProject);
    addProjectToDatabase(anotherDefaultProject);
    storeProjects();
    storedProjectsWithoutMethods = JSON.parse(localStorage.getItem('projects'));

    //Add the lost methods back to the projects
    retrievedProjects = storedProjectsWithoutMethods.map(project => {
        const returnedProject = new RetrievedProject(project.title, project.todoList, project.id);

        returnedProject.todoList = project.todoList.map(todo => {
        return new RetrievedTodo(todo.title, todo.description, todo.dueDate, todo.priority, todo.status, todo.id, todo.expanded);
        });

        return returnedProject;
    });

  //Assign the retrieved projects to the projects array for use throughout the app
  projects = retrievedProjects;
} else {
//Add the lost methods back to the projects
    retrievedProjects = storedProjectsWithoutMethods.map(project => {
    const returnedProject = new RetrievedProject(project.title, project.todoList, project.id);

    returnedProject.todoList = project.todoList.map(todo => {
    return new RetrievedTodo(todo.title, todo.description, todo.dueDate, todo.priority, todo.status, todo.id, todo.expanded);
      });

    return returnedProject;
  });

  //Assign the retrieved projects to the projects array for use throughout the app
  projects = retrievedProjects;
}