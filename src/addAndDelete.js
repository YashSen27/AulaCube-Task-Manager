import Todo, { Project } from './createProject';
import { projects } from './storage';
import { renderPage } from '.';

export function addNewProject() {
    const newEmptyProject = new Project('New Project');
    addProjectToDatabase(newEmptyProject);
    renderPage();
}

export function addProjectToDatabase(project) {
    projects.push(project);
}

export function deleteProject(event) {
    const projectId = event.target.getAttribute('data-project-id');

    projects.forEach((project, index) => {
        if (projectId === project.id) {
            projects.splice(index, 1)
        }
    });

}

export function addNewTodo(event) {
    const projectId = event.target.getAttribute('data-project-id');
    
        projects.forEach(project => {
            if (projectId === project.id) {
                const newEmptyTodo = new Todo('', '', '', 'Low', 'In progress');
                project.todoList.push(newEmptyTodo);
            }
        });

}

export function deleteTodo(event) {
    const projectId = event.target.getAttribute('data-project-id');
    const todoId = event.target.getAttribute('data-id');

    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList = project.todoList.filter(todo => todoId !== todo.id);
        }
    });
}