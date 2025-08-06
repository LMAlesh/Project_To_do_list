import { getTodos } from './storage.js';
import { formatDate } from './date_utils.js';
import { home_page } from './home_page.js';

function getTaskDataByDate() {
    const todos = getTodos();
    const taskMap = {};

    todos.forEach(todo => {
        const date = todo.dueDate;
        if (!taskMap[date]) taskMap[date] = [];
        taskMap[date].push(todo.priority);
    });

    return taskMap;
}

// Helper: Create calendar header with navigation
function createCalendarHeader(month, year, onPrev, onNext) {
    const header = document.createElement('div');
    header.classList.add('calendar-header');

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const prevButton = document.createElement('button');
    prevButton.classList.add('calendar-nav', 'prev');
    prevButton.textContent = '←';
    prevButton.title = 'Previous Month';
    prevButton.addEventListener('click', onPrev);

    const nextButton = document.createElement('button');
    nextButton.classList.add('calendar-nav', 'next');
    nextButton.textContent = '→';
    nextButton.title = 'Next Month';
    nextButton.addEventListener('click', onNext);

    const title = document.createElement('h2');
    title.classList.add('month-year');
    title.textContent = `${monthNames[month]} ${year}`;

    header.appendChild(prevButton);
    header.appendChild(title);
    header.appendChild(nextButton);

    return header;
}

// Helper: Create day-of-week headers
function createDayHeaders() {
    const dayHeaders = document.createElement('div');
    dayHeaders.classList.add('calendar-day-headers');

    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day-header');
        dayEl.textContent = day;
        dayHeaders.appendChild(dayEl);
    });

    return dayHeaders;
}

// Helper: Create task indicators
function createTaskIndicators(priorities) {
    const container = document.createElement('div');
    container.classList.add('task-indicators');

    const uniquePriorities = [...new Set(priorities)];
    uniquePriorities.slice(0, 3).forEach(priority => {
        const dot = document.createElement('div');
        dot.classList.add('task-indicator', 'small', `priority-${priority}`);
        container.appendChild(dot);
    });

    if (priorities.length > 3) {
        const more = document.createElement('div');
        more.classList.add('task-indicator', 'small', 'more');
        more.textContent = '+';
        container.appendChild(more);
    }

    return container;
}

// Helper: Create a day cell
function createDayCell(day, month, year, taskData) {
    const cell = document.createElement('div');
    cell.classList.add('calendar-day');

    const dayNumber = document.createElement('span');
    dayNumber.classList.add('day-number');
    dayNumber.textContent = day;

    const dateStr = formatDate(new Date(year, month, day)); // Use formatted date
    const priorities = taskData[dateStr];

    const today = new Date();
    if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
    ) {
        cell.classList.add('today');
    }

    if (priorities && priorities.length) {
        const indicators = createTaskIndicators(priorities);
        cell.appendChild(indicators);
        cell.classList.add('has-tasks');
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', () => home_page(dateStr));
    }

    cell.appendChild(dayNumber);
    return cell;
}

function showCalendarWithTasks(container) {
    let currentDate = new Date();
    const taskData = getTaskDataByDate();

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        container.innerHTML = '';

        const calendarContainer = document.createElement('div');
        calendarContainer.classList.add('calendar-container');

        // Header
        const header = createCalendarHeader(
            month,
            year,
            () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            },
            () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            }
        );

        // Grid
        const grid = document.createElement('div');
        grid.classList.add('calendar-grid');

        // Fill in empty days before start
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.classList.add('calendar-day', 'empty');
            grid.appendChild(empty);
        }

        // Fill in actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = createDayCell(day, month, year, taskData);
            grid.appendChild(dayCell);
        }

        calendarContainer.appendChild(header);
        calendarContainer.appendChild(createDayHeaders());
        calendarContainer.appendChild(grid);
        container.appendChild(calendarContainer);
    };

    renderCalendar(); // Initial render
}

export { showCalendarWithTasks };
