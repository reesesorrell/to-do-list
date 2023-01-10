import displayAdder from "./helper";
import checkPic from "./img/check.png";
import Todo from "./object-functions";

const populateHomePage = () => {
    const parent = document.getElementById('content');
    
    const header = displayAdder.createDiv(parent, '', 'header');
    
    const titleHolder = displayAdder.createDiv(header, '', 'title-holder');

    displayAdder.createImage(titleHolder, checkPic, 'check-pic');

    displayAdder.createDiv(titleHolder, 'To Do List', 'title-text');
    
    const sideBar = displayAdder.createDiv(parent, '', 'side-bar');

    const tabNames = ['Home', 'Today', 'Week', 'Projects'];
    for (let i = 0; i<4; i++) {
        let thisTab = tabNames[i];
        displayAdder.createDiv(sideBar, thisTab, thisTab + '-tab', 'side-bar-text,title-text');
    }

    const mainSpace = displayAdder.createDiv(parent, '', 'main-space');
}

populateHomePage();