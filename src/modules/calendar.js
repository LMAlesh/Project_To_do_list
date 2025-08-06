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

// Display calendar with proper month layout
function showCalendarWithTasks(container) {
    const taskData = getTaskDataByDate(); // Get task priorities grouped by date
    const currentDate = new Date(); // Start from today
    const year = currentDate.getFullYear(); // Current year
    const month = currentDate.getMonth(); // Current month (0-11)

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
    const firstDay = new Date(year, month, 1).getDay(); // Day of week the month starts on (0=Sunday)

    // Create main calendar container
    const calendarContainer = document.createElement('div');
    calendarContainer.classList.add('calendar-container');

    // Create calendar header with month/year and navigation
    const calendarHeader = document.createElement('div');
    calendarHeader.classList.add('calendar-header');

    const prevButton = document.createElement('button');
    prevButton.classList.add('calendar-nav', 'prev');
    prevButton.innerHTML = '←';
    prevButton.title = 'Previous Month';

    const monthYearDisplay = document.createElement('h2');
    monthYearDisplay.classList.add('month-year');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    const nextButton = document.createElement('button');
    nextButton.classList.add('calendar-nav', 'next');
    nextButton.innerHTML = '→';
    nextButton.title = 'Next Month';

    // Add header elements
    calendarHeader.appendChild(prevButton);
    calendarHeader.appendChild(monthYearDisplay);
    calendarHeader.appendChild(nextButton);

    // Create day-of-week headers
    const dayHeaders = document.createElement('div');
    dayHeaders.classList.add('calendar-day-headers');
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(dayName => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.textContent = dayName;
        dayHeaders.appendChild(dayHeader);
    });

    // Create calendar grid
    const calendarGrid = document.createElement('div');
    calendarGrid.classList.add('calendar-grid');

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
        dayBox.classList.add('calendar-day');

        // Create day number
        const dayNumber = document.createElement('span');
        dayNumber.classList.add('day-number');
        dayNumber.textContent = day;

        // Check if this is today
        const today = new Date();
        const isToday = day === today.getDate() && 
                       month === today.getMonth() && 
                       year === today.getFullYear();
        
        if (isToday) {
            dayBox.classList.add('today');
        }

        const priorities = taskData[dateStr]; // Get tasks for this date

        if (priorities && priorities.length > 0) {
            // Create task indicators container
            const taskIndicators = document.createElement('div');
            taskIndicators.classList.add('task-indicators');

            if (priorities.length === 1) {
                // Single task - show priority color
                const indicator = document.createElement('div');
                indicator.classList.add('task-indicator', `priority-${priorities[0]}`);
                taskIndicators.appendChild(indicator);
                dayBox.classList.add(`has-task-${priorities[0]}`);
            } else {
                // Multiple tasks - show multiple dots
                const uniquePriorities = [...new Set(priorities)];
                uniquePriorities.slice(0, 3).forEach(priority => {
                    const indicator = document.createElement('div');
                    indicator.classList.add('task-indicator', 'small', `priority-${priority}`);
                    taskIndicators.appendChild(indicator);
                });
                
                if (priorities.length > 3) {
                    const moreIndicator = document.createElement('div');
                    moreIndicator.classList.add('task-indicator', 'small', 'more');
                    moreIndicator.textContent = '+';
                    taskIndicators.appendChild(moreIndicator);
                }
                dayBox.classList.add('has-multiple-tasks');
            }

            dayBox.appendChild(taskIndicators);
            dayBox.style.cursor = 'pointer';
            dayBox.addEventListener('click', () => {
                home_page(dateStr); // Navigate to home_page with that date
            });
        }

        dayBox.appendChild(dayNumber);
        calendarGrid.appendChild(dayBox);
    }

    // Assemble the complete calendar
    calendarContainer.appendChild(calendarHeader);
    calendarContainer.appendChild(dayHeaders);
    calendarContainer.appendChild(calendarGrid);

    // Clear previous content and show calendar
    container.innerHTML = '';
    container.appendChild(calendarContainer);

    // Add navigation functionality (for future enhancement)
    prevButton.addEventListener('click', () => {
        // Future: Navigate to previous month
        console.log('Previous month clicked');
    });

    nextButton.addEventListener('click', () => {
        // Future: Navigate to next month  
        console.log('Next month clicked');
    });
}

export { showCalendarWithTasks };