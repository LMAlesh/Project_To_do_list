// taskRenderer.js
import { getTodos } from './storage.js'; // Import the function to get todos from local storage

function displayTasksFor(dateStr, taskContainer) { // Function to display tasks for a specific date
    const todos = getTodos(); // Get all saved tasks
    const filtered = todos.filter(todo => todo.dueDate === dateStr); // Filter tasks that match the selected date

    taskContainer.innerHTML = ''; // Clear the task container

    if (filtered.length === 0) { // If no tasks for the date
        taskContainer.textContent = 'No tasks for this day.'; // Show a default message
    } else {
        const ul = document.createElement('ul'); // Create an unordered list to hold task items
        filtered.forEach(todo => {
            const li = document.createElement('li'); // Create a list item for each task
            li.textContent = todo.title; // Set the list item text to the task title
            ul.appendChild(li); // Add the list item to the list
        });
        taskContainer.appendChild(ul); // Add the full list to the task container
    }
}

export { displayTasksFor }; // Export the function to be used in other modules
