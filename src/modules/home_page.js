import { createButton } from './UI_help.js'; // Import the helper
import { displayTasksFor } from './task_renderer.js';
import { formatDate } from './date_utils.js';
import { showCalendarWithTasks } from './calendar.js'; // Import your calendar function

const home_page = (initialDateStr) => {
    // Check if it's a string, not an event object
    const isValidDateStr = typeof initialDateStr === 'string';
    let currentDate = isValidDateStr ? new Date(initialDateStr) : new Date();

    const content = document.getElementById('content'); // Get the main content container
    content.innerHTML = ''; // Clear existing content

    const homeDiv = document.createElement('div'); // Create home layout container
    homeDiv.classList.add('home'); // Add styling class

    const todayBtn = createButton('Today', 'todayButton', () => {
    currentDate = new Date(); // Reset the date to today
    dateLabel.textContent = formatDate(currentDate); // Update label
    displayTasksFor(formatDate(currentDate), currentTasks); // Refresh task view
});
    const currentTasks = document.createElement('div'); // Task display area
    currentTasks.classList.add('currentTask'); // Add class

    const dateLabel = document.createElement('span'); // Label showing the selected date
    dateLabel.textContent = formatDate(currentDate); // Initial label text

    // Create "<" button using the helper
    const yesterdayBtn = createButton('<', 'yButton', () => {
        currentDate.setDate(currentDate.getDate() - 1); // Go back a day
        dateLabel.textContent = formatDate(currentDate); // Update label
        displayTasksFor(formatDate(currentDate), currentTasks); // Refresh tasks
    });

    // Create ">" button using the helper
    const tommorowBtn = createButton('>', 'tButton', () => {
        currentDate.setDate(currentDate.getDate() + 1); // Go forward a day
        dateLabel.textContent = formatDate(currentDate); // Update label
        displayTasksFor(formatDate(currentDate), currentTasks); // Refresh tasks
    });

    const buttonDiv = document.createElement('div'); // Container for date nav
    buttonDiv.classList.add('buttonDiv'); // Add styling
    buttonDiv.appendChild(yesterdayBtn); // Add "<"
    buttonDiv.appendChild(dateLabel); // Add date label
    buttonDiv.appendChild(tommorowBtn); // Add ">"
    homeDiv.appendChild(todayBtn);

    displayTasksFor(formatDate(currentDate), currentTasks); // Initial task display

    content.appendChild(homeDiv); // Add layout to page
    homeDiv.appendChild(buttonDiv); // Add nav section
    homeDiv.appendChild(currentTasks); // Add tasks section
    const controlDiv = document.createElement('div'); // Create a new container for utility buttons
    controlDiv.classList.add('controlButtons'); // Add a CSS class if needed
    controlDiv.appendChild(todayBtn); // Add the "Today" button

    homeDiv.appendChild(controlDiv); // Add this container to the page

};

export { home_page };
