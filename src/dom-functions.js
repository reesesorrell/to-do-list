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

const makeProject = (e) => {
    e.preventDefault();
    const inputField = document.getElementById('project-form');
    const newProject = Project(inputField.value);
    addProjectToDisplay(newProject);
    deleteProjectForm();
}

const addProjectToDisplay = (projectObject) => {
    const sideBar = document.getElementById('side-bar');
    var projecName = projectObject.title;
    displayAdder.createButton(sideBar, browseToProject, projecName, projecName + '-project-tab', 'sidebar-button,current-project-button');
}

const browseToProject = () => {
    return;
}

const makeProjectAddButton = () => {
    const sideBar = document.getElementById('side-bar');
    displayAdder.createButton(sideBar, makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');
}

export {makeProjectForm};