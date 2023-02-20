import displayAdder from "./helper";
import checkPic from "./img/check.png";
import { makeProjectForm, addProjectToDisplay, browseToProject, browseHome, browseToday, browseWeek } from "./dom-functions";
import { getLocalStorage, Project } from "./object-functions";

const populateHomePage = () => {
    //gets local storage and sets open tab number
    try {
        var openTabNumber = getLocalStorage();
    }
    //creates a default project if local storage fails
    catch {
        const defaultProject = Project('Work');
        window.projectArray = [defaultProject]; 
    }

    //make html skeleton
    const parent = document.getElementById('content');
    const header = displayAdder.createDiv(parent, '', 'header');
    const titleHolder = displayAdder.createDiv(header, '', 'title-holder');
    displayAdder.createImage(titleHolder, checkPic, 'check-pic');
    displayAdder.createDiv(titleHolder, 'To Do List', 'title-text');
    const sideBar = displayAdder.createDiv(parent, '', 'side-bar');
    displayAdder.createDiv(parent, '', 'main-space');

    //create sidebar tabs
    const tabNames = ['Home', 'Today', 'Week', 'Projects'];
    for (let i = 0; i<tabNames.length; i++) {
        let thisTab = tabNames[i];
        displayAdder.createDiv(sideBar, thisTab, thisTab.toLowerCase() + '-tab', 'side-bar-text,title-text');
    }

    //set tabs onclick function
    const homeTab = document.getElementById('home-tab');
    homeTab.onclick = browseHome;

    const todayTab = document.getElementById('today-tab');
    todayTab.onclick = browseToday;

    const weekTab = document.getElementById('week-tab');
    weekTab.onclick = browseWeek;

    //add all projects to the proejct sidebar
    for (let i = 0; i<window.projectArray.length; i++) {
        let thisProject = window.projectArray[i];
        addProjectToDisplay(thisProject);
    }

    displayAdder.createButton(sideBar, makeProjectForm, '+ Add Project', 'new-project-button', 'sidebar-button');

    //browses to the saved open tab if there is a project (open tab number is 0 by default)
    if (window.projectArray[0]){
        browseToProject.apply(window.projectArray[openTabNumber]);
    }
}

populateHomePage();