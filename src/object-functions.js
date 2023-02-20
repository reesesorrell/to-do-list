import { compareAsc } from "date-fns"

//make basic todo object that holds objects
const Todo = (title, description, date, project, completed=false) => {
    return {title, date, description, project, completed}
}

//make project object which holds a todolist and allows adding and removing the objects
const Project = (title) => {
    var toDoList = []
    const addToDo = (toDo) => {
        toDoList.push(toDo);
    }
    const removeToDo = (toDoName) => {
        for (let i = 0; i<toDoList.length; i++) {
            if (toDoList[i].title == toDoName) {
                console.log('working');
                toDoList.splice(i, 1);
            }
        }
    }
    const _sortToDo = (toDoArray) => {
        //FIXME: sort todo list by date
    }
    return {title, toDoList, addToDo, removeToDo};
}

//copy the window project array into the local storage
const updateLocalStorage = () => {

    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }

    try{
        var openProjectName = document.getElementById('project-title').textContent;
    }
    catch{
        var openProjectName = undefined;
    }

    var projectNum = window.projectArray.length;
    localStorage.setItem('projectNum', projectNum); 

    //save the projects by number into local storage
    for (let i = 0; i < projectNum; i++) {
        localStorage.setObj('project' + i, window.projectArray[i]);
        if (window.projectArray[i].title == openProjectName) {
            localStorage.setItem('openTabNumber', i);
        }
    }
}

//loop through the storage project array and create real window todos and projects with it
const getLocalStorage = () => {

    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }

    var projectArray = []


    var projectNum = localStorage.getItem('projectNum');
    for (let i = 0; i < projectNum; i++) {
        var tempProject = localStorage.getObj('project' + i);
        var realProject = Project(tempProject.title);
        var tempToDoList = tempProject.toDoList;
        for (let i = 0; i < tempToDoList.length; i++) {
            var tempToDo = tempToDoList[i];
            var toDoName = tempToDo.title;
            var toDoDescription = tempToDo.description;
            var tempDate = tempToDo.date;
            var year = parseInt(tempDate.slice(0,4));
            var month = parseInt(tempDate.slice(5, 7))-1;
            var day = parseInt(tempDate.slice(8,10));
            var toDoDate = new Date(year, month, day);
            var toDoProject = tempToDo.project;
            var toDoCompleted = tempToDo.completed;
            var realTodo = Todo(toDoName, toDoDescription, toDoDate, toDoProject, toDoCompleted);
            realProject.addToDo(realTodo);
        }
        projectArray.push(realProject);
    }
    window.projectArray = projectArray;

    try {
        return localStorage.getItem('openTabNumber');
    }
    catch {
        return 0;
    }
}

export {Todo, Project, updateLocalStorage, getLocalStorage};