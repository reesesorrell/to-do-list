import {Todo, Project} from "./object-functions";
import displayAdder from "./helper";

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

const deleteProjectForm = () => {
    const container = document.getElementById('project-form-container');
    container.innerHTML = '';
    container.remove();
    makeProjectAddButton();
}

const makeProjectAddButton = () => {
    const sideBar = document.getElementById('side-bar');
    displayAdder.createButton(sideBar, makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');
}

const makeProject = (e) => {
    e.preventDefault();
    const inputField = document.getElementById('project-form');
    const newProject = Project(inputField.value);
    window.projectArray.push(newProject);
    addProjectToDisplay(newProject);
    deleteProjectForm();
}

const addProjectToDisplay = (projectObject) => {
    const sideBar = document.getElementById('side-bar');
    var projectName = projectObject.title;
    const projectTab = displayAdder.createButton(sideBar, browseToProject.bind(projectObject), projectName, projectName + '-project-tab', 'sidebar-button,current-project-button');
    projectTab.onmouseenter = makeDeleteProjectButton;
    projectTab.onmouseleave = removeDeleteProjectButton;
}

function makeDeleteProjectButton() {
    const removeProjectButton = displayAdder.createButton(this, deleteProject, 'X', this.textContent + '-project');
}

function deleteProject() {
    var projectButton = this.parentElement
    for (let i = 0; i<window.projectArray.length; i++) {
        if (window.projectArray[i].title == projectButton.textContent) {
            delete window.projectArray[i];
        }
    }
    projectButton.remove();
}

function removeDeleteProjectButton() {
    this.firstElementChild.remove();
}

function browseToProject() {
    // this = project;
    return;
}

export {makeProjectForm};