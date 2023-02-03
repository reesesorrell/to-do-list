
const Todo = (title, date, description, completed=false) => {
    return {title, date, description, completed}
}

const Project = (title) => {
    return {title};
}

export {Todo, Project};