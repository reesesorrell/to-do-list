
const Todo = (title, date, description, project, completed=false) => {
    return {title, date, description, project, completed}
}

const Project = (title) => {
    var toDoList = []
    const addToDo = (toDo) => {
        toDoList.push(toDo);
    }
    return {title, toDoList, addToDo};
}

export {Todo, Project};