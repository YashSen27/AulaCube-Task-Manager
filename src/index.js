import './style.css'
import { displayProject, displayNoProjectsCard } from './DOM';
import { handleProjectTitleChange, handleTitleChange, handleDescriptionChange,handleDateChange, handleCheckBox, handlePriorityChangeToLow, handlePriorityChangeToHigh, handleExpandStateChangeToExpand, handleExpandStateChangeToShrink } from './handleInput';
import { addNewProject, deleteProject, addNewTodo, deleteTodo } from './addAndDelete';
import { projects, storeProjects, retrievedProjects } from './storage';

export const main = document.querySelector('main');

export function renderPage() {
    while (main.firstChild) {
        main.removeChild(main.firstChild)
    }

    //With every update that requires rendering, the page is rendered, the change is displayed, and it is also stored 
    //in the local storage. For updates that don't require rendering, such as 'contenteditable' fields, storage is handled 
    //in the functions that manage these changes in a database, e.g. the handleTitleChange function in handleInput.js.
    storeProjects();

    //Display a card to inform a user that no projects are present in the app at the moment or display a project
    if (projects.length === 0) {
        displayNoProjectsCard();
    } else {
        projects.forEach(project => {
            displayProject(project.title, project.todoList, project.id);
        });
    }

    //Add event listeners
    const addNewProjectButtons = document.querySelectorAll('.new-project-button');
    const deleteProjectButtons = document.querySelectorAll('.project-delete-button');
    const addButtons = document.querySelectorAll('.add-new-todo');
    const expandButtons = document.querySelectorAll('.expand-button');
    const expandLessButtons = document.querySelectorAll('.expand-less-button');
    const checkBoxes = document.querySelectorAll('.check-box');
    const deleteButtons = document.querySelectorAll('.delete-button');

    const projectTitles = document.querySelectorAll('.project-title');
    const titles = document.querySelectorAll('.todo-title');
    const descriptions = document.querySelectorAll('.todo-description');
    const dates = document.querySelectorAll('.todo-dueDate');
    const lowPriorityButtons = document.querySelectorAll('.low-priority-button');
    const highPriorityButtons = document.querySelectorAll('.high-priority-button');

    //Event listeners for the buttons
/*     I encountered an interesting issue with this event listener for the new project buttons. 
    The code looked like this:
        addNewProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            addNewProject();
            renderPage();
        });
    })
    But every click on the button was triggering multiple projects to be added for some reason. Breaking down the code,
    i.e. moving the renderPage function inside the addNewProject function and than calling only the addNewProject
    function solved the issue. */
    addNewProjectButtons.forEach(button => {
        button.addEventListener('click', addNewProject);
    })

    deleteProjectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            deleteProject(event);
            renderPage();
        })
    });

    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            addNewTodo(event);
            renderPage();
        })
    });

    expandButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            handleExpandStateChangeToExpand(event);
            renderPage();
        })
    });

    expandLessButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            handleExpandStateChangeToShrink(event);
            renderPage();
        })
    });

    checkBoxes.forEach(checkBox => {
        checkBox.addEventListener('click', (event) => {
            handleCheckBox(event);
            renderPage();
        })
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            deleteTodo(event);
            renderPage();
        })
    });

    //Event listeners for the input
    projectTitles.forEach(title => {
        title.addEventListener('input', (event) => {
            const field = event.target;
            handleProjectTitleChange(field);
        })
    });

    titles.forEach(title => {
        title.addEventListener('input', (event) => {
            const field = event.target;
            handleTitleChange(field);
        })
    });
    
    descriptions.forEach(description => {
        description.addEventListener('input', (event) => {
            const field = event.target;
            handleDescriptionChange(field);
        })
    });

    dates.forEach(date => {
        date.addEventListener('blur', (event) => {
            const field = event.target;
            handleDateChange(field);
            renderPage();
        })
    })

    lowPriorityButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            handlePriorityChangeToLow(event);
            renderPage();
        })
    })

    highPriorityButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            handlePriorityChangeToHigh(event);
            renderPage();
        })
    })
}


renderPage();