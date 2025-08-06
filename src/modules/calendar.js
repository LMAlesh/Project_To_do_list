import { getTodos } from './storage.js'; // Get stored tasks
import { formatDate } from './date_utils.js'; // Format date strings
import { home_page } from './home_page.js'; // Allow navigating to task view on day click

// Group task priorities by date
function getTaskDataByDate() {
    const todos = getTodos(); // Get all tasks
    const taskMap = {}; // Grouped by date

    todos.forEach(todo => {
        const date = todo.dueDate; // Task date in YYYY-MM-DD format
        const priority = todo.priority; // "low", "moderate", or "high"

        if (!taskMap[date]) taskMap[date] = []; // Initialize array if needed
        taskMap[date].push(priority); // Add priority to that date
    });

    return taskMap; // Example: { "2025-08-06": ["low", "moderate"], "2025-08-07": ["high"] }
}

// Display calendar with priority-based highlighting
function showCalendarWithTasks(container) {
    const taskData = getTaskDataByDate(); // Get task priorities grouped by date
    const currentDate = new Date(); // Start from today
    const year = currentDate.getFullYear(); // Current year
    const month = currentDate.getMonth(); // Current month

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
    const firstDay = new Date(year, month, 1).getDay(); // Day of week the month starts on

    const calendarContainer = document.createElement('div'); // Main calendar container
    calendarContainer.classList.add('calendar'); // Add class for styling

    const calendarGrid = document.createElement('div'); // Grid layout
    calendarGrid.classList.add('calendar-grid'); // Grid styling class

    // Fill initial empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.classList.add('calendar-day', 'empty');
        calendarGrid.appendChild(empty);
    }

    // Create a day cell for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayBox = document.createElement('div');
        dayBox.textContent = day;
        dayBox.classList.add('calendar-day');

        const priorities = taskData[dateStr]; // Get tasks for this date

        if (priorities && priorities.length > 0) {
            if (priorities.length > 1) {
                dayBox.classList.add('multiple-tasks'); // Blue if multiple
            } else {
                const priority = priorities[0]; // One task, color by priority
                if (priority === 'low') dayBox.classList.add('priority-low');
                if (priority === 'moderate') dayBox.classList.add('priority-moderate');
                if (priority === 'high') dayBox.classList.add('priority-high');
            }

            dayBox.style.cursor = 'pointer'; // Make clickable
            dayBox.addEventListener('click', () => {
                home_page(dateStr); // Navigate to home_page with that date
            });
        }

        calendarGrid.appendChild(dayBox); // Add day to grid
    }

    calendarContainer.appendChild(calendarGrid); // Add grid to container
    container.innerHTML = ''; // Clear previous content
    container.appendChild(calendarContainer); // Show calendar in target container
}

export { showCalendarWithTasks };
