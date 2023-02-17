import {Todo, Project} from "./object-functions";
import { compareAsc, format } from 'date-fns';
import displayAdder from "./helper";

//create text input for a new porject when the add project button is clicked
const makeProjectForm = () => {
    const newProjectButton = document.getElementById("new-project-button");
    newProjectButton.remove();

    const sideBar = document.getElementById("side-bar");
    const projectFormContainer = displayAdder.createForm(sideBar, '', 'project-form-container');

    projectFormContainer.addEventListener('submit', makeProject);
    
    const projectForm = displayAdder.createInput(projectFormContainer, 'text', 'project-form', '', 'project-form');
    projectForm.required = true;
    projectForm.maxLength = "16";

    displayAdder.createInput(projectFormContainer, 'submit', 'form-submit', 'Add', 'add-project-button', 'project-button');
    displayAdder.createButton(projectFormContainer, deleteProjectForm, 'Cancel', 'remove-project-form-button', 'project-button');
}

//delete the project form box, triggered when a project is added or canceled
const deleteProjectForm = () => {
    const container = document.getElementById('project-form-container');
    container.innerHTML = '';
    container.remove();
    makeProjectAddButton();
}

//remake the add project button after the input box is removed
const makeProjectAddButton = () => {
    const sideBar = document.getElementById('side-bar');
    displayAdder.createButton(sideBar, makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');
}

//create a project with the name that is entered in the input
const makeProject = (e) => {
    e.preventDefault();
    const inputField = document.getElementById('project-form');
    const newProject = Project(inputField.value);
    window.projectArray.push(newProject);
    addProjectToDisplay(newProject);
    deleteProjectForm();
}

//take the project object and create a display using its title
const addProjectToDisplay = (projectObject) => {
    const sideBar = document.getElementById('side-bar');
    var projectName = projectObject.title;
    const projectTab = displayAdder.createButton(sideBar, browseToProject.bind(projectObject), projectName, projectName + '-project-tab', 'sidebar-button,current-project-button');
    projectTab.onmouseenter = makeDeleteProjectButton;
    projectTab.onmouseleave = removeDeleteProjectButton;
}

//remove the x that appears on a project tab when a user moves the mouse off the project
function removeDeleteProjectButton() {
    this.firstElementChild.remove();
}

//add an x that appears on hover of a project tab
function makeDeleteProjectButton() {
    displayAdder.createButton(this, deleteProject, 'X', this.textContent + '-project');
}

//remove project tab and take the project object off of the window array
function deleteProject() {
    var projectButton = this.parentElement
    var projectTitle = projectButton.textContent.slice(0,-1);
    //search for the project by its name and remove it
    for (let i = 0; i<window.projectArray.length; i++) {
        if (window.projectArray[i].title == projectTitle) {
            window.projectArray.splice(i, 1);
        }
    }
    projectButton.remove();
}

//display all to-do objects in the project object
function browseToProject() {
    // this = project;
    const mainSpace = document.getElementById('main-space');
    mainSpace.innerHTML = '';
    const titleRow = displayAdder.createDiv(mainSpace, '', 'title-row');
    displayAdder.createDiv(titleRow, this.title, 'project-title', 'title-text');
    displayAdder.createButton(titleRow, reverseSort, 'Due Date Order', 'reverse-button');
    const toDoDisplay = displayAdder.createDiv(mainSpace, '', 'to-do-display');

    displayToDos(this);

    const addTaskButton = displayAdder.createDiv(toDoDisplay, '+ Add Task', 'add-task-button', 'to-do-row');
    addTaskButton.onclick = createToDoForm;
}

const displayToDos = (project) => {
    const toDoDisplay = document.getElementById('to-do-display');
    let toDos = project.toDoList;
    for(let i = 0; i < toDos.length; i++) {
        const toDo = toDos[i];
        const toDoContainer = displayAdder.createDiv(toDoDisplay, '', '', 'to-do-container,to-do-row');
        displayAdder.createInput(toDoContainer, 'checkbox', 'completed');
        displayAdder.createDiv(toDoContainer, toDo.title);
        displayAdder.createDiv(toDoContainer, format(toDo.date, 'MM/dd/yyyy'));
        displayAdder.createButton(toDoContainer, editToDo, 'Edit', 'edit-to-do-button');
        displayAdder.createButton(toDoContainer, deleteToDo, 'Delete', 'delete-to-do-button');
    }
}

const editToDo = () => {
    return;
}

const deleteToDo = () => {
    return;
}

//make to-do creation form
const createToDoForm = () => {
    document.getElementById('add-task-button').remove();
    const parentDiv = document.getElementById('to-do-display');
    const formContainer = displayAdder.createForm(parentDiv, '', 'to-do-form');
    formContainer.addEventListener('submit', makeToDo);

    const titleInput = displayAdder.createInput(formContainer, 'text', 'title', '', 'to-do-title-input', 'to-do-form-input');
    titleInput.placeholder = 'Title: Mow Lawn'

    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.id = 'to-do-description-input';
    descriptionInput.classList.add('to-do-form-input');
    descriptionInput.rows = '5';
    descriptionInput.cols = '35';
    descriptionInput.placeholder = 'Details: eg. mow in straight lines'
    formContainer.appendChild(descriptionInput);

    const dateInput = displayAdder.createInput(formContainer, 'date', 'date', '', 'to-do-date-input', 'to-do-form-input');
    const projectInput = displayAdder.createInput(formContainer, 'text', 'project', '', 'to-do-project-input', 'to-do-form-input');
    projectInput.placeholder = 'Project';
    const submitButton = displayAdder.createInput(formContainer, 'submit', 'submit', 'Submit', 'to-do-submit-button', 'project-button');
    const deleteButton = displayAdder.createButton(formContainer, deleteToDoForm, 'Cancel', 'to-do-form-delete-button', 'project-button');
}

//handle to-do form submit
const makeToDo = (e) => {
    e.preventDefault();

    var name = document.getElementById('to-do-title-input').value;
    var description = document.getElementById('to-do-description-input').value;
    var date = document.getElementById('to-do-date-input').value;
    var year = parseInt(date.slice(0,4));
    var month = parseInt(date.slice(5, 7));
    var day = parseInt(date.slice(8,10));
    var dateObject = new Date(year, month, day);
    var projectName = document.getElementById('to-do-project-input').value;
    const toDo = Todo(name, description, dateObject, projectName);

    deleteToDoForm();

    if (projectName) {
        addToProject(toDo, projectName);
    }
    else {
        const defaultProject = document.getElementById('project-title').textContent;
        addToProject(toDo, defaultProject);
    }
}

const addToProject = (toDo, projectName) => {
    let projectExists = false;
    for (let i = 0; i < window.projectArray.length; i++) {
        if (window.projectArray[i].title == projectName) {
            window.projectArray[i].addToDo(toDo);
            browseToProject.apply(window.projectArray[i]);
            projectExists = true;
        }
    }
    if (projectExists != true) {
        document.getElementById('new-project-button').remove();

        const newProject = Project(projectName);
        window.projectArray.push(newProject);
        newProject.addToDo(toDo);
        addProjectToDisplay(newProject);
        browseToProject.apply(newProject);

        makeProjectAddButton();
    }
}

//delete to do form and add back new to-do button
const deleteToDoForm = () => {
    const formContainer = document.getElementById('to-do-form');
    formContainer.innerHTML = '';
    formContainer.remove();

    const toDoDisplay = document.getElementById('to-do-display');
    const addTaskButton = displayAdder.createDiv(toDoDisplay, '+ Add Task', 'add-task-button', 'to-do-row');
    addTaskButton.onclick = createToDoForm;
}

//reverse order of to-do list
const reverseSort = () => {
    return;
}

export {makeProjectForm, browseToProject};