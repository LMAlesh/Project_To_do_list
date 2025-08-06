import { getTodos } from './storage.js'; // Import function to get all saved todos from localStorage

function showTasksByCategory(category) {
    const content = document.getElementById('content'); // Get the main content container
    content.innerHTML = ''; // Clear any existing content inside it

    const todos = getTodos(); // Retrieve the full list of todos
    const filtered = todos.filter(todo => todo.category === category); // Filter todos to only include those in the selected category

    if (filtered.length === 0) {
        const msg = document.createElement('p'); // Create a paragraph element for the message
        msg.textContent = `No tasks found for "${category}".`; // Set the message text
        content.appendChild(msg); // Add the message to the page
    } else {
        const ul = document.createElement('ul'); // Create an unordered list element
        filtered.forEach(todo => {
            const li = document.createElement('li'); // Create a list item for each filtered task
            li.textContent = todo.title; // Set the list item's text to the task title
            ul.appendChild(li); // Add the list item to the unordered list
        });
        content.appendChild(ul); // Add the full list to the content container
    }
}

export { showTasksByCategory }; // Export the function so it can be used elsewhere
