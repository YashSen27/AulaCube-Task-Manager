import { projects, storeProjects } from './storage';

export function handleProjectTitleChange(title) {
    const projectId = title.getAttribute('data-project-id');
    projects.forEach(project => {
            if (projectId === project.id) {
                project.changeProjectTitle(title.innerText);
            }
        });
    storeProjects();
}

export function handleTitleChange(title) {
    const projectId = title.getAttribute('data-project-id');
    const titleId = title.getAttribute('data-id');
    
    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList.forEach(todo => {
                if (todo.id === titleId) {
                    todo.changeTitle(title.innerText);

                }
            })
        }
    });
    storeProjects();
}

export function handleDescriptionChange(description) {
    const projectId = description.getAttribute('data-project-id');
    const descriptionId = description.getAttribute('data-id');

    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList.forEach(todo => {
                if (todo.id === descriptionId) {
                    todo.changeDescription(description.innerText);
                }
            })
        }
    });
    storeProjects();
}

export function handleDateChange(date) {
    const projectId = date.getAttribute('data-project-id');
    const dateId = date.getAttribute('data-id');

    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList.forEach(todo => {
                if (todo.id === dateId) {
                    todo.changeDueDate(date.innerText);
                }
            })
        }
    });
}

export function handlePriorityChangeToLow(event) {
    const projectId = event.target.getAttribute('data-project-id');
    const todoId = event.target.getAttribute('data-id');
    
    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList.forEach(todo => {
                if (todo.id === todoId) {
                    if (todo.priority === 'High') {
                        todo.changePriorityToLow();
                    } else {
                        return;
                    }
                }
            })
        }
    })
}

export function handlePriorityChangeToHigh(event) {
    const projectId = event.target.getAttribute('data-project-id');
    const todoId = event.target.getAttribute('data-id');
    
    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList.forEach(todo => {
                if (todo.id === todoId) {
                    if (todo.priority === 'Low') {
                        todo.changePriorityToHigh();
                    } else {
                        return;
                    }
                }
            })
        }
    })
}

export function handleCheckBox(event) {
    const projectId = event.target.getAttribute('data-project-id');
    const todoId = event.target.getAttribute('data-id');

    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList.forEach(todo => {
                if (todo.id === todoId) {
                    if (todo.status === 'Done') {
                        todo.changeStatusToInProgress();
                    } else {
                        todo.changeStatusToDone();
                    }
                }
            })
        }
    })
}

export function handleExpandStateChangeToExpand(event) {
    const projectId = event.target.getAttribute('data-project-id');
    const todoId = event.target.getAttribute('data-id');

    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList.forEach(todo => {
                if (todo.id === todoId) {
                    todo.changeExpandedToTrue();
                }
            })
        }
    })
    storeProjects();
}

export function handleExpandStateChangeToShrink(event) {
    const projectId = event.target.getAttribute('data-project-id');
    const todoId = event.target.getAttribute('data-id');

    projects.forEach(project => {
        if (projectId === project.id) {
            project.todoList.forEach(todo => {
                if (todo.id === todoId) {
                    todo.changeExpandedToFalse();
                }
            })
        }
    })
    storeProjects();
}