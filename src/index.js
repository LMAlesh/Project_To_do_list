import "./styles.css";
import { home_page } from "./modules/home_page.js";
import { add_todo_page } from "./modules/add_todo_page.js";

home_page();

const homeBtn = document.querySelector('#homeBtn');
const addBtn = document.querySelector('#addBtn');
const calBtn = document.querySelector('#calBtn'); 
const categoryBtn = document.querySelector('#categoryBtn');

homeBtn.addEventListener('click', home_page);
addBtn.addEventListener('click', add_todo_page); 
// aboutBtn.addEventListener('click', about)