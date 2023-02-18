import displayAdder from "./helper";
import checkPic from "./img/check.png";
import { makeProjectForm, addProjectToDisplay, browseToProject, browseHome, browseToday, browseWeek } from "./dom-functions";
import { getLocalStorage, Project } from "./object-functions";

const populateHomePage = () => {

    try {
        var openTabNumber = getLocalStorage();
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

    const homeTab = document.getElementById('home-tab');
    homeTab.onclick = browseHome;

    const todayTab = document.getElementById('today-tab');
    todayTab.onclick = browseToday;

    const weekTab = document.getElementById('week-tab');
    weekTab.onclick = browseWeek;

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