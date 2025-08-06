export function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

export function saveCategories(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
}