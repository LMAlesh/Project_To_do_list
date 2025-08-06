import "./styles.css";
import { home_page } from "./modules/home_page.js";
import { add_todo_page } from "./modules/add_todo_page.js";
import { category_page } from "./modules/category_page.js";
import { showCalendarWithTasks } from "./modules/calendar.js";

home_page(); // Load home page by default

const content = document.getElementById('content'); 

const homeBtn = document.querySelector('#homeBtn'); 
const addBtn = document.querySelector('#addBtn'); 
const calBtn = document.querySelector('#calBtn'); 
const categoryBtn = document.querySelector('#categoryBtn'); 

homeBtn.addEventListener('click', () => home_page());
addBtn.addEventListener('click', add_todo_page); // Go to add-todo page
categoryBtn.addEventListener('click', category_page); // Go to category page
calBtn.addEventListener('click', () => showCalendarWithTasks(content)); 
