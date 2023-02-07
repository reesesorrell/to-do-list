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
}

export {makeProjectForm};