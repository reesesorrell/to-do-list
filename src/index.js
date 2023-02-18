import displayAdder from "./helper";
import checkPic from "./img/check.png";
import { makeProjectForm, addProjectToDisplay, browseToProject } from "./dom-functions";
import { getLocalStorage, Project } from "./object-functions";

const populateHomePage = () => {

    try {
        var openTabNumber = getLocalStorage();
        console.log(openTabNumber);
    }
    catch {
        const defaultProject = Project('General');
        window.projectArray = [defaultProject]; 
    }

    const parent = document.getElementById('content');
    
    const header = displayAdder.createDiv(parent, '', 'header');
    
    const titleHolder = displayAdder.createDiv(header, '', 'title-holder');

    displayAdder.createImage(titleHolder, checkPic, 'check-pic');

    displayAdder.createDiv(titleHolder, 'To Do List', 'title-text');
    
    const sideBar = displayAdder.createDiv(parent, '', 'side-bar');

    displayAdder.createDiv(parent, '', 'main-space');

    const tabNames = ['Home', 'Today', 'Week', 'Projects'];
    for (let i = 0; i<tabNames.length; i++) {
        let thisTab = tabNames[i];
        displayAdder.createDiv(sideBar, thisTab, thisTab.toLowerCase() + '-tab', 'side-bar-text,title-text');
    }

    for (let i = 0; i<window.projectArray.length; i++) {
        let thisProject = window.projectArray[i];
        addProjectToDisplay(thisProject);
    }

    if (window.projectArray[0]){
        browseToProject.apply(window.projectArray[openTabNumber]);
    }
    
    displayAdder.createButton(sideBar, makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');

}

populateHomePage();