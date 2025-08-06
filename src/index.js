import "./styles.css";
import { home_page } from "./modules/home_page.js";
import { add_todo_page } from "./modules/add_todo_page.js";
import { category_page } from "./modules/category_page.js";
import { showCalendarWithTasks } from "./modules/calendar.js"; // ✅ Add this

home_page(); // Load home page by default

const content = document.getElementById('content'); // ✅ You'll need this to render the calendar into

const homeBtn = document.querySelector('#homeBtn'); // Home page button
const addBtn = document.querySelector('#addBtn'); // Add task page button
const calBtn = document.querySelector('#calBtn'); // ✅ Calendar button (from HTML)
const categoryBtn = document.querySelector('#categoryBtn'); // Category page button

homeBtn.addEventListener('click', () => home_page());
addBtn.addEventListener('click', add_todo_page); // Go to add-todo page
categoryBtn.addEventListener('click', category_page); // Go to category page
calBtn.addEventListener('click', () => showCalendarWithTasks(content)); // ✅ Show calendar in main content
