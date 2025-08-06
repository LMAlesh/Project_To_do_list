import { getTodos } from './storage.js'; // Import the function to get todos from local storage

function displayTasksFor(dateStr, taskContainer) { // Function to display tasks for a specific date
    const todos = getTodos(); // Get all saved tasks
    const filtered = todos.filter(todo => todo.dueDate === dateStr); // Filter tasks that match the selected date

    taskContainer.innerHTML = ''; // Clear the task container

    if (filtered.length === 0) { // If no tasks for the date
        const noTasksMsg = document.createElement('div');
        noTasksMsg.classList.add('no-tasks');
        noTasksMsg.textContent = 'No tasks for this day.';
        taskContainer.appendChild(noTasksMsg);
    } else {
        // Create cards for each task
        filtered.forEach(todo => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            
            // Add priority class for border color
            if (todo.priority) {
                taskCard.classList.add(`priority-${todo.priority}`);
            }

            // Task title
            const taskTitle = document.createElement('div');
            taskTitle.classList.add('task-title');
            taskTitle.textContent = todo.title;

            // Task description (if exists)
            const taskDescription = document.createElement('div');
            taskDescription.classList.add('task-description');
            taskDescription.textContent = todo.description || 'No description provided';

            // Task meta information container
            const taskMeta = document.createElement('div');
            taskMeta.classList.add('task-meta');

            // Due date
            const taskDate = document.createElement('span');
            taskDate.classList.add('task-date');
            taskDate.textContent = formatDateForDisplay(todo.dueDate);

            // Priority badge
            const taskPriority = document.createElement('span');
            taskPriority.classList.add('task-priority', todo.priority || 'low');
            taskPriority.textContent = todo.priority || 'Low';

            // Category badge
            const taskCategory = document.createElement('span');
            taskCategory.classList.add('task-category');
            taskCategory.textContent = todo.category || 'General';

            // Append meta elements
            taskMeta.appendChild(taskDate);
            taskMeta.appendChild(taskPriority);
            taskMeta.appendChild(taskCategory);

            // Append all elements to card
            taskCard.appendChild(taskTitle);
            if (todo.description && todo.description.trim()) {
                taskCard.appendChild(taskDescription);
            }
            taskCard.appendChild(taskMeta);

            // Add card to container
            taskContainer.appendChild(taskCard);
        });
    }
}

// Helper function to format date for better display
function formatDateForDisplay(dateStr) {
    const date = new Date(dateStr);
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

export { displayTasksFor }; // Export the function to be used in other modules
