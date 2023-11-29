import { v4 as uniqueId } from 'uuid';


export class Project {
    constructor(title) {
        this.title = title;
        this.todoList = [];
        this.id = uniqueId();
    }

    addTodo(todo) {
        this.todoList.push(todo);
      }

    changeProjectTitle(newTitle) {
        this.title = newTitle;
    }
}

export class RetrievedProject {
    constructor(title, todoList, id) {
        this.title = title;
        this.todoList = todoList;
        this.id = id;
    }

    addTodo(todo) {
        this.todoList.push(todo);
      }

    changeProjectTitle(newTitle) {
        this.title = newTitle;
    }
}


export default class Todo {
    constructor(title, description, dueDate, priority, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.id = uniqueId();
        this.expanded = false;
    }

    changeTitle(string) {
        this.title = string;
    }

    changeDescription(string) {
        this.description = string;
    }

    changeDueDate(string) {
        this.dueDate = string;
    }

    changePriorityToLow() {
        this.priority = 'Low';
    }

    changePriorityToHigh() {
        this.priority = 'High';
    }

    changeStatusToDone() {
        this.status = 'Done';
    }

    changeStatusToInProgress() {
        this.status = 'In progress';
    }

    changeExpandedToTrue() {
        this.expanded = true;
    }

    changeExpandedToFalse() {
        this.expanded = false;
    }
}

export class RetrievedTodo {
    constructor(title, description, dueDate, priority, status, id, expanded) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.id = id;
        this.expanded = expanded;
    }

    changeTitle(string) {
        this.title = string;
    }

    changeDescription(string) {
        this.description = string;
    }

    changeDueDate(string) {
        this.dueDate = string;
    }

    changePriorityToLow() {
        this.priority = 'Low';
    }

    changePriorityToHigh() {
        this.priority = 'High';
    }

    changeStatusToDone() {
        this.status = 'Done';
    }

    changeStatusToInProgress() {
        this.status = 'In progress';
    }

    changeExpandedToTrue() {
        this.expanded = true;
    }

    changeExpandedToFalse() {
        this.expanded = false;
    }
}