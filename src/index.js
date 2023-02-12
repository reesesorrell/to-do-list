import displayAdder from "./helper";
import checkPic from "./img/check.png";
import { makeProjectForm } from "./dom-functions";

window.projectArray = [];

const populateHomePage = () => {
    const parent = document.getElementById('content');
    
    const header = displayAdder.createDiv(parent, '', 'header');
    
    const titleHolder = displayAdder.createDiv(header, '', 'title-holder');

    displayAdder.createImage(titleHolder, checkPic, 'check-pic');

    displayAdder.createDiv(titleHolder, 'To Do List', 'title-text');
    
    const sideBar = displayAdder.createDiv(parent, '', 'side-bar');

    const tabNames = ['Home', 'Today', 'Week', 'Projects'];
    for (let i = 0; i<tabNames.length; i++) {
        let thisTab = tabNames[i];
        displayAdder.createDiv(sideBar, thisTab, thisTab.toLowerCase() + '-tab', 'side-bar-text,title-text');
    }
    
    displayAdder.createButton(sideBar, makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');

    const mainSpace = displayAdder.createDiv(parent, '', 'main-space');
}

populateHomePage();