
const Todo = (title, date, description, completed=false) => {
    return {title, date, description, completed}
}

const Project = (title) => {
    var toDoList = []
    const addToDo = (toDo) => {
        toDoList.push(toDo);
    }
    return {title, toDoList, addToDo};
}

export {Todo, Project};