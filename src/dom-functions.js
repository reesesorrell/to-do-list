import {Todo, Project} from "./object-functions";
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
        console.log(window.projectArray[i].title);
        if (window.projectArray[i].title == projectTitle) {
            window.projectArray.splice(i, 1);
        }
    }
    projectButton.remove();
}

//display all to-do objects in the project object
function browseToProject() {
    // this = project;
    return;
}

export {makeProjectForm};