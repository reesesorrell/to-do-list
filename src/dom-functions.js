import {Todo, Project} from "./object-functions";
import displayAdder from "./helper";

const makeProjectForm = () => {
    const newProjectButton = document.getElementById("new-project-button");
    newProjectButton.remove();

    const sideBar = document.getElementById("side-bar");
    const projectFormContainer = displayAdder.createDiv(sideBar, '', 'project-form-container');
    
    const projectForm = document.createElement('input');
    projectForm.id = 'project-form';
    projectForm.type = 'text';
    projectForm.name = 'project-form';
    projectForm.required = true;
    projectFormContainer.appendChild(projectForm);

    displayAdder.createButton(projectFormContainer, makeProject, 'Add', 'add-project-button', 'project-button');
    displayAdder.createButton(projectFormContainer, deleteProjectForm, 'Cancel', 'remove-project-form-button', 'project-button');
}

const deleteProjectForm = () => {
    const container = document.getElementById('project-form-container');
    container.innerHTML = '';
    container.remove();
    makeProjectAddButton();
}

const makeProject = () => {
    return;
}

const makeProjectAddButton = () => {
    const sideBar = document.getElementById('side-bar');
    displayAdder.createButton(sideBar, makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');
}

export {makeProjectForm};