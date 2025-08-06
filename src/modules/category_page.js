import { getCategories } from './storage.js';
import { showTasksByCategory } from './show_category.js'; // make sure you export it from the right place

const category_page = () => {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const categories = getCategories();

    if (categories.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'No categories, please create a todo list';
        content.appendChild(msg);
    } else {
        const list = document.createElement('ul');
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category;
            li.classList.add('classLi');

            // 👇 Add this
            li.addEventListener('click', () => {
                showTasksByCategory(category);
            });

            list.appendChild(li);
        });
        content.appendChild(list);
    }
};

export { category_page };
 