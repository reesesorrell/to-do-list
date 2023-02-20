import {Todo, Project, updateLocalStorage} from "./object-functions";
import { format, isToday, isThisWeek } from 'date-fns';
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
    // add project to window array and then update local storage
    window.projectArray.push(newProject);
    updateLocalStorage();
    //upadte sidebar
    addProjectToDisplay(newProject);
    deleteProjectForm();
    //auto open a new project when created
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
function deleteProject(e) {
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
    browseHome();
    //stops parent button from naviagating back to the project
    e.stopPropagation();
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
    //update so that it grabs the tabbed project
    updateLocalStorage();
}

const displayToDos = (project) => {
    const toDoDisplay = document.getElementById('to-do-display');
    let toDos = project.toDoList;
    //for each to do in the project, create a row and add all info and buttons
    for(let i = 0; i < toDos.length; i++) {
        const toDo = toDos[i];
        const toDoContainer = displayAdder.createDiv(toDoDisplay, '', toDo.title + '-row', 'to-do-container,to-do-row');
        const toDoCheckbox = displayAdder.createInput(toDoContainer, 'checkbox', 'completed');
        //checks the todo if its completed, and adds a listener for it changing
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

//changes the complete status of a todo when its checked
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
    var toDoName = this.parentElement.children[1].textContent;

    //find the todo with the right name, get its info, then remove it from the project (assumes unique names)
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

    var toDoRow = document.getElementById(toDoName + '-row');

    createToDoEditForm(toDoRow);
    
    //fill in the todo submission with the old todo info
    document.getElementById('to-do-title-input').value = toDoName;
    document.getElementById('to-do-description-input').value = toDoDescription;
    var formattedDate = format(toDoDate, 'yyyy-MM-dd');
    document.getElementById('to-do-date-input').value = formattedDate;
    document.getElementById('to-do-project-input').value = toDoProject;

    //delete old todo display
    toDoRow.innerHTML = '';
    toDoRow.remove();
}

//creates a todo form above the row of the todo which is being editted
const createToDoEditForm = (toDoRow) => {

    const toDoDisplay = document.getElementById('to-do-display');
    const formContainer = document.createElement('form');
    formContainer.id = 'to-do-form';
    toDoDisplay.insertBefore(formContainer, toDoRow);    
    formContainer.addEventListener('submit', makeToDo);

    populateToDoForm(formContainer);
}



function deleteToDo() {
    var toDoName = this.parentElement.children[1].textContent;

    //search for todo by name and remove it from its project, then update storage
    for (let i = 0; i<window.projectArray.length; i++) {
        var currentProject = window.projectArray[i];
        var toDoList = currentProject.toDoList;
        for (let j = 0; j < toDoList.length; j++) {
            if (toDoList[j].title == toDoName) {
                window.projectArray[i].removeToDo(toDoName);
                updateLocalStorage();
            }
        }
    }

    //remove todo from display
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

//Add all elements to the to do form and set their requirments
const populateToDoForm = (formContainer) => {
    //title input section
    const titleInput = displayAdder.createInput(formContainer, 'text', 'title', '', 'to-do-title-input', 'to-do-form-input');
    titleInput.placeholder = 'Title: Mow Lawn'
    titleInput.required = true;

    //description input section
    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.id = 'to-do-description-input';
    descriptionInput.classList.add('to-do-form-input');
    descriptionInput.rows = '5';
    descriptionInput.cols = '35';
    descriptionInput.placeholder = 'Details: eg. mow in straight lines'
    formContainer.appendChild(descriptionInput);

    //date input section
    const dateInput = displayAdder.createInput(formContainer, 'date', 'date', '', 'to-do-date-input', 'to-do-form-input');
    dateInput.required = true;

    //project input section
    const projectInput = displayAdder.createInput(formContainer, 'text', 'project', '', 'to-do-project-input', 'to-do-form-input');
    projectInput.placeholder = 'Project';
    const pageName = document.getElementById('project-title').textContent;
        //requires a project if not inside a project tab already
    if (pageName == 'Home' || pageName == 'Today' || pageName == 'Week') {
        projectInput.required = true;
    }

    //submit and delete button section
    displayAdder.createInput(formContainer, 'submit', 'submit', 'Submit', 'to-do-submit-button', 'project-button');
    displayAdder.createButton(formContainer, deleteToDoForm, 'Cancel', 'to-do-form-delete-button', 'project-button');
}

//handle to-do form submit
const makeToDo = (e) => {
    e.preventDefault();

    //get the todo info from the submitted form input
    var name = document.getElementById('to-do-title-input').value;
    var description = document.getElementById('to-do-description-input').value;
    var date = document.getElementById('to-do-date-input').value;
    var year = parseInt(date.slice(0,4));
    var month = parseInt(date.slice(5, 7))-1;
    var day = parseInt(date.slice(8,10));
    var dateObject = new Date(year, month, day);
    var projectName = document.getElementById('to-do-project-input').value;

    //get page title as project name, if none is provided
    const defaultProject = document.getElementById('project-title').textContent;
    if(projectName){
        var toDo = Todo(name, description, dateObject, projectName);
    }
    else {
        var toDo = Todo(name, description, dateObject, defaultProject);
    }

    deleteToDoForm();

    if (projectName) {
        addToProject(toDo, projectName);
    }
    else {
        addToProject(toDo, defaultProject);
    }
}

//adds a to do to an existing project, if a project with that name doesnt exist it creates it
const addToProject = (toDo, projectName) => {
    let projectExists = false;

    //search for the project, when found, add the to do and then browse to that project tab
    for (let i = 0; i < window.projectArray.length; i++) {
        if (window.projectArray[i].title == projectName) {
            window.projectArray[i].addToDo(toDo);
            updateLocalStorage();
            browseToNewProject(window.projectArray[i]);
            projectExists = true;
        }
    }

    //creates new project, adds todo, adds it to display, then browses to that tab
    if (projectExists != true) {
        document.getElementById('new-project-button').remove();

        const newProject = Project(projectName);
        window.projectArray.push(newProject);
        newProject.addToDo(toDo);
        updateLocalStorage();
        addProjectToDisplay(newProject);
        browseToNewProject(newProject);

        makeProjectAddButton();
    }
}

//browses to the new projects tab unless its was created in the home tab, then it browses home
const browseToNewProject = (newProject) => {
    const currentProjectTab = document.getElementById('project-title').textContent;
    if (currentProjectTab == 'Home') {
        browseHome();
    }
    else {
        browseToProject.apply(newProject);
    }
}

//delete to do form and add back new to-do button
const deleteToDoForm = () => {
    const formContainer = document.getElementById('to-do-form');
    formContainer.innerHTML = '';
    formContainer.remove();

    //adds add task button if one doesn't exist
    if(!document.getElementById('add-task-button')){
        const toDoDisplay = document.getElementById('to-do-display');
        const addTaskButton = displayAdder.createDiv(toDoDisplay, '+ Add Task', 'add-task-button', 'to-do-row');
        addTaskButton.onclick = createToDoForm;
    }
}

//closes an open edit tab, called when two edit tabs are trying to be open at the same time
//if the title and date are filled out, its submitted, otherwise its deleted
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

//reverse the order of all project to do arrays and then redisplay
const reverseSort = () => {
    //FIXME
}

//create a temporary home project with all todos and then display it
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

//create a temporary today project with todos for today, then display it
const browseToday = () => {
    closeOpenToDoForm();
    const todayProject = Project('Today');
    var projectArray = window.projectArray;
    for (var i = 0; i<projectArray.length; i++) {
        var currentToDoList = projectArray[i].toDoList;
        for (var j = 0; j<currentToDoList.length; j++) {
            if (isToday(currentToDoList[j].date)) {
                todayProject.addToDo(currentToDoList[j]);
            }
        }

    }
    browseToProject.apply(todayProject);
}

//create a temporary week project with todos for this week, then display it
const browseWeek = () => {
    closeOpenToDoForm();
    const weekProject = Project('Week');
    var projectArray = window.projectArray;
    for (var i = 0; i<projectArray.length; i++) {
        var currentToDoList = projectArray[i].toDoList;
        for (var j = 0; j<currentToDoList.length; j++) {
            if (isThisWeek(currentToDoList[j].date)) {
                weekProject.addToDo(currentToDoList[j]);
            }
        }

    }
    browseToProject.apply(weekProject);
}

export {makeProjectForm, browseToProject, addProjectToDisplay, browseHome, browseToday, browseWeek};