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

    const mainSpace = displayAdder.createDiv(parent, '', 'main-space');
}

populateHomePage();