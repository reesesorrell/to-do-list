import {Todo, Project, updateLocalStorage} from "./object-functions";
import { format } from 'date-fns';
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
    updateLocalStorage();
    addProjectToDisplay(newProject);
    deleteProjectForm();
    browseToProject.apply(newProject);
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
            updateLocalStorage();
        }
    }
    projectButton.remove();
    document.getElementById('home-tab').click();
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
    updateLocalStorage();
}

const displayToDos = (project) => {
    const toDoDisplay = document.getElementById('to-do-display');
    let toDos = project.toDoList;
    for(let i = 0; i < toDos.length; i++) {
        const toDo = toDos[i];
        const toDoContainer = displayAdder.createDiv(toDoDisplay, '', toDo.title + '-row', 'to-do-container,to-do-row');
        const toDoCheckbox = displayAdder.createInput(toDoContainer, 'checkbox', 'completed');
        if (toDo.completed) {
            toDoCheckbox.checked = true;
        }
        toDoCheckbox.addEventListener('change', changeToDoComplete.bind(toDo));
        displayAdder.createDiv(toDoContainer, toDo.title);
        displayAdder.createDiv(toDoContainer, format(toDo.date, 'MM/dd/yyyy'));
        displayAdder.createButton(toDoContainer, editToDo, 'Edit', 'edit-to-do-button');
        displayAdder.createButton(toDoContainer, deleteToDo, 'Delete', 'delete-to-do-button');
    }
}

function changeToDoComplete() {
    if(this.completed) {
        this.completed = false;
    }
    else {
        this.completed = true;
    }
    updateLocalStorage();
}

function editToDo() {
    closeOpenToDoForm();
    const mainSpace = document.getElementById('main-space');
    var projectName = mainSpace.children[0].children[0].textContent;
    var toDoName = this.parentElement.children[1].textContent;

    if(projectName != 'Home' && projectName != 'Today' && projectName != 'This Week') {
        for (let i = 0; i<window.projectArray.length; i++) {
            if (window.projectArray[i].title == projectName) {
                var currentProject = window.projectArray[i];
                var toDoList = currentProject.toDoList;
                for (let j = 0; j < toDoList.length; j++) {
                    if (toDoList[j].title == toDoName) {
                        var currentToDo = toDoList[j];
                        var toDoDescription = currentToDo.description;
                        var toDoDate = currentToDo.date;
                        var toDoProject = currentToDo.project;
                        currentProject.toDoList.splice(j, 1);
                        updateLocalStorage();
                    }
                }
            }
        }
    }
    else {
        for (let i = 0; i<window.projectArray.length; i++) {
            var currentProject = window.projectArray[i];
            var toDoList = currentProject.toDoList;
            for (let j = 0; j < toDoList.length; j++) {
                if (toDoList[j].title == toDoName) {
                    var currentToDo = toDoList[j];
                    var toDoDescription = currentToDo.description;
                    var toDoDate = currentToDo.date;
                    var toDoProject = currentToDo.project;
                    currentProject.toDoList.splice(j, 1);
                    updateLocalStorage();
                }
            }
        }
    }

    var toDoRow = document.getElementById(toDoName + '-row');

    const toDoDisplay = document.getElementById('to-do-display');
    const formContainer = document.createElement('form');
    formContainer.id = 'to-do-form';
    toDoDisplay.insertBefore(formContainer, toDoRow);    
    formContainer.addEventListener('submit', makeToDo);

    populateToDoForm(formContainer);
    document.getElementById('to-do-title-input').value = toDoName;
    document.getElementById('to-do-description-input').value = toDoDescription;
    var formattedDate = format(toDoDate, 'yyyy-MM-dd');
    document.getElementById('to-do-date-input').value = formattedDate;
    document.getElementById('to-do-project-input').value = toDoProject;

    toDoRow.innerHTML = '';
    toDoRow.remove();
}


function deleteToDo() {
    var projectName = this.parentElement.parentElement.parentElement.children[0].children[0].textContent;
    var toDoName = this.parentElement.children[1].textContent;

    for (let i = 0; i<window.projectArray.length; i++) {
        if (window.projectArray[i].title == projectName) {
            window.projectArray[i].removeToDo(toDoName);
            updateLocalStorage();
        }
    }

    var toDoRow = this.parentElement
    toDoRow.innerHTML='';
    toDoRow.remove();
}

//make to-do creation form
const createToDoForm = () => {
    closeOpenToDoForm();
    document.getElementById('add-task-button').remove();
    const parentDiv = document.getElementById('to-do-display');
    const formContainer = displayAdder.createForm(parentDiv, '', 'to-do-form');
    formContainer.addEventListener('submit', makeToDo);

    populateToDoForm(formContainer);
}

const populateToDoForm = (formContainer) => {
    const titleInput = displayAdder.createInput(formContainer, 'text', 'title', '', 'to-do-title-input', 'to-do-form-input');
    titleInput.placeholder = 'Title: Mow Lawn'
    titleInput.required = true;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.id = 'to-do-description-input';
    descriptionInput.classList.add('to-do-form-input');
    descriptionInput.rows = '5';
    descriptionInput.cols = '35';
    descriptionInput.placeholder = 'Details: eg. mow in straight lines'
    formContainer.appendChild(descriptionInput);

    const dateInput = displayAdder.createInput(formContainer, 'date', 'date', '', 'to-do-date-input', 'to-do-form-input');
    dateInput.required = true;
    const projectInput = displayAdder.createInput(formContainer, 'text', 'project', '', 'to-do-project-input', 'to-do-form-input');
    projectInput.placeholder = 'Project';
    if (document.getElementById('project-title').textContent == 'Home') {
        projectInput.required = true;
    }
    displayAdder.createInput(formContainer, 'submit', 'submit', 'Submit', 'to-do-submit-button', 'project-button');
    displayAdder.createButton(formContainer, deleteToDoForm, 'Cancel', 'to-do-form-delete-button', 'project-button');
}

//handle to-do form submit
const makeToDo = (e, toDoComplete = false) => {
    e.preventDefault();

    var name = document.getElementById('to-do-title-input').value;
    var description = document.getElementById('to-do-description-input').value;
    var date = document.getElementById('to-do-date-input').value;
    var year = parseInt(date.slice(0,4));
    var month = parseInt(date.slice(5, 7))-1;
    var day = parseInt(date.slice(8,10));
    var dateObject = new Date(year, month, day);
    var projectName = document.getElementById('to-do-project-input').value;
    const defaultProject = document.getElementById('project-title').textContent;
    if(projectName){
        var toDo = Todo(name, description, dateObject, projectName, toDoComplete);
    }
    else {
        var toDo = Todo(name, description, dateObject, defaultProject, toDoComplete);
    }

    deleteToDoForm();

    if (projectName) {
        addToProject(toDo, projectName);
    }
    else {
        addToProject(toDo, defaultProject);
    }
}

const addToProject = (toDo, projectName) => {
    let projectExists = false;
    for (let i = 0; i < window.projectArray.length; i++) {
        if (window.projectArray[i].title == projectName) {
            window.projectArray[i].addToDo(toDo);
            updateLocalStorage();
            browseToProject.apply(window.projectArray[i]);
            projectExists = true;
        }
    }
    if (projectExists != true) {
        document.getElementById('new-project-button').remove();

        const newProject = Project(projectName);
        window.projectArray.push(newProject);
        newProject.addToDo(toDo);
        updateLocalStorage();
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

    if(!document.getElementById('add-task-button')){
        const toDoDisplay = document.getElementById('to-do-display');
        const addTaskButton = displayAdder.createDiv(toDoDisplay, '+ Add Task', 'add-task-button', 'to-do-row');
        addTaskButton.onclick = createToDoForm;
    }
}

const closeOpenToDoForm = () => {
    try {
        if (document.getElementById('to-do-title-input').value && document.getElementById('to-do-date-input').value) {
            const submitButton = document.getElementById('to-do-submit-button');
            submitButton.click();
        }
        else {
            const deleteButton = document.getElementById('to-do-form-delete-button');
            deleteButton.click();
        }
    }
    catch {
    }
}

//reverse order of to-do list
const reverseSort = () => {
    return;
}

const browseHome = () => {
    closeOpenToDoForm();
    const homeProject = Project('Home');
    var projectArray = window.projectArray;
    for (var i = 0; i<projectArray.length; i++) {
        var currentToDoList = projectArray[i].toDoList;
        for (var j = 0; j<currentToDoList.length; j++) {
            homeProject.addToDo(currentToDoList[j]);
        }

    }
    browseToProject.apply(homeProject);
}

const browseToday = () => {

}

const browseWeek = () => {

}

export {makeProjectForm, browseToProject, addProjectToDisplay, browseHome, browseToday, browseWeek};