import { main } from ".";
import todoList from './check.png';
const { parse, differenceInDays } = require('date-fns');

const header = document.querySelector('.header');
const headerSticker = new Image();
headerSticker.classList.add('header-sticker');
headerSticker.src = todoList;
header.appendChild(headerSticker);


export function displayProject(project, todoList, projectId) {
    //A project container
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');
    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-header');

    const projectHeaderButtons = document.createElement('div');
    projectHeaderButtons.classList.add('project-header-buttons');

    const projectTitle = document.createElement('p');
    projectTitle.classList.add('project-title');
    projectTitle.setAttribute('data-project-id', projectId);
    projectTitle.textContent = project;
    projectTitle.contentEditable = true;

    const projectDeleteButton = document.createElement('span');
    projectDeleteButton.classList.add('material-symbols-outlined', 'project-delete-button');
    projectDeleteButton.setAttribute('data-project-id', projectId);
    projectDeleteButton.textContent = 'delete';

    const addNewTodo = document.createElement('span');
    addNewTodo.classList.add('material-symbols-outlined', 'add-new-todo');
    addNewTodo.setAttribute('data-project-id', projectId);
    addNewTodo.textContent = 'add';

    projectHeaderButtons.appendChild(addNewTodo);
    projectHeaderButtons.appendChild(projectDeleteButton);
    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectHeaderButtons);
    projectContainer.appendChild(projectHeader);

    function displayTodo(todoTitle, todoDescription, todoDueDate, todoPriority, todoStatus, todoId, todoExpandState) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo');

        const unexpandedTodo = document.createElement('div');
        unexpandedTodo.classList.add('unexpanded-todo');

        const unexpandedTodoButtons = document.createElement('div');
        unexpandedTodoButtons.classList.add('unexpanded-todo-buttons');

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');

        const titleHeader = document.createElement('p');
        titleHeader.classList.add('title-header');
        titleHeader.textContent = 'Title';

        const title = document.createElement('p');
        title.classList.add('todo-title');
        title.contentEditable = true;
        title.setAttribute('data-project-id', projectId);
        title.setAttribute('data-id', todoId);
        title.textContent = todoTitle;

        const deleteButton = document.createElement('span');
        deleteButton.classList.add('material-symbols-outlined', 'delete-button', 'delete-buttons');
        deleteButton.textContent = 'delete';
        deleteButton.setAttribute('data-project-id', projectId);
        deleteButton.setAttribute('data-id', todoId);

        const checkBox = document.createElement('span');
        checkBox.classList.add('material-symbols-outlined', 'check-box');
        checkBox.setAttribute('data-project-id', projectId);
        checkBox.setAttribute('data-id', todoId);

        const priorityIconContainer = document.createElement('div');
        priorityIconContainer.classList.add('priority-icon-container');

        //Define styles based on the current status and priority of a todo
        if (todoStatus === 'Done') {
            checkBox.textContent = 'check_box';
            title.style.textDecoration = 'line-through';
            priorityIconContainer.style.backgroundColor = 'lightgreen';
            checkBox.style.color = 'mediumseagreen';
        } else {
            checkBox.textContent = 'check_box_outline_blank';

            if (todoPriority === 'High') {
            priorityIconContainer.style.backgroundColor = '';
            priorityIconContainer.textContent = '🔥';
            }
        }


        //An expanded todo
        const expandedTodo = document.createElement('div');
        expandedTodo.classList.add('expanded-todo');

        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description-container');

        const descriptionTitle = document.createElement('p');
        descriptionTitle.classList.add('description-title');
        descriptionTitle.textContent = 'Description';

        const description = document.createElement('p');
        description.classList.add('todo-description');
        description.setAttribute('data-project-id', projectId);
        description.setAttribute('data-id', todoId);
        description.textContent = todoDescription;
        description.contentEditable = true;

        const dueDateContainer = document.createElement('div');
        dueDateContainer.classList.add('due-date-container');

        const dueDateTitle = document.createElement('p');
        dueDateTitle.classList.add('due-date-title');
        dueDateTitle.textContent = 'Due Date';

        const dueDate = document.createElement('p');
        dueDate.classList.add('todo-due-date');
        dueDate.setAttribute('data-project-id', projectId);
        dueDate.setAttribute('data-id', todoId);
        dueDate.textContent = todoDueDate;
        dueDate.contentEditable = true;

        //Display the remaining or overdue time based on the due date
        const remainingTimeContainer = document.createElement('div');
        remainingTimeContainer.style.display = 'none';
        remainingTimeContainer.classList.add('remaining-time-container');
        const remainingTimeTitle = document.createElement('div');
        remainingTimeTitle.classList.add('remaining-time-title');

        const targetDate = todoDueDate;
        const potentialFormats = ['MM/dd/yyyy', 'yyyy-MM-dd', 'dd/MM/yyyy', 'yyyyMMdd', 'ddMMyyyy', 'MMddyyyy', 'yyyy MM dd', 'MM dd yyyy', 'dd MM yyyy'];
        
        let parsedDate;
        for (const format of potentialFormats) {
            parsedDate = parse(targetDate, format, new Date());

            if (!isNaN(parsedDate.getTime())) {
                break;
            }
        }

        if (!isNaN(parsedDate.getTime())) {
            const currentDate = new Date();
            const daysDifference = differenceInDays(parsedDate, currentDate);

            const remainingTime = document.createElement('p');
            remainingTime.classList.add('remaining-time');

            if (todoStatus === 'Done') {
                remainingTime.textContent = '';
                remainingTimeTitle.textContent = '';
            } else {
                if (daysDifference >= 0) {
                    remainingTime.textContent = daysDifference;
                    remainingTimeTitle.textContent = 'Days Remaining';
                    remainingTimeContainer.appendChild(remainingTimeTitle);
                    remainingTimeContainer.appendChild(remainingTime);
                    remainingTimeContainer.style.display = 'block';
                } else {
                    remainingTime.textContent = Math.abs(daysDifference);
                    remainingTimeTitle.textContent = 'Overdue Days 😭';
                    remainingTimeContainer.appendChild(remainingTimeTitle);
                    remainingTimeContainer.appendChild(remainingTime);
                    remainingTimeContainer.style.display = 'block';
                }


            }
        } else {
            remainingTimeContainer.style.display = 'none';
        }


        const priorityParentContainer = document.createElement('div');
        priorityParentContainer.classList.add('priority-parent-container');

        const priorityContainer = document.createElement('div');
        priorityContainer.classList.add('priority-container');

        const priorityTitle = document.createElement('p');
        priorityTitle.classList.add('priority-title');
        priorityTitle.textContent = 'Priority'

        const priorityText = document.createElement('p');
        priorityText.classList.add('priority-text');
        priorityText.textContent = todoPriority;

        const priorityButtons = document.createElement('div');
        priorityButtons.classList.add('priority-buttons-container');

        const lowPriority = document.createElement('button');
        lowPriority.classList.add('low-priority-button', 'priority-buttons');
        lowPriority.setAttribute('data-project-id', projectId);
        lowPriority.setAttribute('data-id', todoId);
        lowPriority.textContent = 'Low';

        const highPriority = document.createElement('button');
        highPriority.classList.add('high-priority-button', 'priority-buttons');
        highPriority.setAttribute('data-project-id', projectId);
        highPriority.setAttribute('data-id', todoId);
        highPriority.textContent = 'High';

        //Style priority buttons based on a priority
        if (todoPriority === 'High') {
            highPriority.classList.add('selected-priority');
            lowPriority.classList.remove('selected-priority');
        } else if (todoPriority === 'Low') {
            highPriority.classList.remove('selected-priority');
            lowPriority.classList.add('selected-priority');
        }

        const expandButtonContainer = document.createElement('div');
        expandButtonContainer.classList.add('expand-button-container');

        const expandButton = document.createElement('span');
        expandButton.classList.add('material-symbols-outlined', 'expand-button');
        expandButton.setAttribute('data-project-id', projectId);
        expandButton.setAttribute('data-id', todoId);
        expandButton.textContent = 'expand_more';

        const expandLessButton = document.createElement('span')
        expandLessButton.classList.add('material-symbols-outlined', 'expand-less-button');
        expandLessButton.setAttribute('data-project-id', projectId);
        expandLessButton.setAttribute('data-id', todoId);
        expandLessButton.textContent = 'expand_less';

        //Handle appearance of an expanded todo and change the button accordingly
        if (todoExpandState === false) {
            expandedTodo.style.display = 'none';
            expandButtonContainer.appendChild(expandButton);
        } else {
            expandedTodo.style.display = 'flex';
            expandButtonContainer.appendChild(expandLessButton);
        }

        //Append children
        unexpandedTodoButtons.appendChild(priorityIconContainer);
        unexpandedTodoButtons.appendChild(expandButtonContainer);
        unexpandedTodoButtons.appendChild(checkBox);
        unexpandedTodoButtons.appendChild(deleteButton);
        titleContainer.appendChild(titleHeader);
        titleContainer.appendChild(title);
        unexpandedTodo.appendChild(titleContainer);
        unexpandedTodo.appendChild(unexpandedTodoButtons);

        priorityContainer.appendChild(priorityText);
        priorityButtons.appendChild(lowPriority);
        priorityButtons.appendChild(highPriority);
        priorityContainer.appendChild(priorityButtons);
        priorityParentContainer.appendChild(priorityTitle);
        priorityParentContainer.appendChild(priorityContainer);
        descriptionContainer.appendChild(descriptionTitle);
        descriptionContainer.appendChild(description);
        dueDateContainer.appendChild(dueDateTitle);
        dueDateContainer.appendChild(dueDate);
        expandedTodo.appendChild(descriptionContainer);
        expandedTodo.appendChild(dueDateContainer);
        expandedTodo.appendChild(remainingTimeContainer);
        expandedTodo.appendChild(priorityParentContainer);

        todoItem.appendChild(unexpandedTodo);
        todoItem.appendChild(expandedTodo);

        projectContainer.appendChild(todoItem);
    }

    //Display all todo items from a project's todo list
    todoList.forEach(item => {
        displayTodo(item.title, item.description, item.dueDate, item.priority, item.status, item.id, item.expanded);
    })

    main.appendChild(projectContainer);
}


export function displayNoProjectsCard() {
    const noProjectsCard = document.createElement('div');
    noProjectsCard.classList.add('no-projects-card');

    const noProjectsMessage = document.createElement('p');
    noProjectsMessage.classList.add('no-projects-message');
    noProjectsMessage.textContent = 'Add a new project';

    const newProjectButton = document.createElement('button');
    newProjectButton.classList.add('new-project-button');
    newProjectButton.setAttribute('id', 'no-projects-card-button');
    newProjectButton.textContent = '+';

    noProjectsCard.appendChild(noProjectsMessage);
    noProjectsCard.appendChild(newProjectButton);
    main.appendChild(noProjectsCard);
}