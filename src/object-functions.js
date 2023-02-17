
const Todo = (title, description, date, project, completed=false) => {
    return {title, date, description, project, completed}
}

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
    return {title, toDoList, addToDo, removeToDo};
}

export {Todo, Project};