import { getTodos, saveTodos, getCategories, saveCategories } from './storage.js';

// Helper to create an input
const createInput = (type, name, placeholder = '') => {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    if (placeholder) input.placeholder = placeholder;
    return input;
};

// Helper to create a radio group
const createRadioGroup = (name, options) => {
    const wrapper = document.createElement('div');
    options.forEach(({ value, label }) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = name;
        radio.value = value;
        radio.id = `${name}-${value}`;

        const radioLabel = document.createElement('label');
        radioLabel.setAttribute('for', radio.id);
        radioLabel.textContent = label;

        wrapper.appendChild(radio);
        wrapper.appendChild(radioLabel);
    });
    return wrapper;
};

// Optional: helper to wrap form elements (for styling)
const wrapField = (...elements) => {
    const wrapper = document.createElement('div');
    elements.forEach(el => wrapper.appendChild(el));
    return wrapper;
};

const add_todo_page = () => {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const form = document.createElement('form');
    form.method = 'POST';

    // Form fields
    const titleInput = createInput('text', 'title', 'Enter task');
    const descInput = createInput('text', 'description', 'Enter description');
    const dateInput = createInput('date', 'due_date');
    const categoryInput = createInput('text', 'category', 'Enter category');

    const priorityLabel = document.createElement('p');
    priorityLabel.textContent = 'Priority:';
    const priorityWrapper = createRadioGroup('priority', [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' }
    ]);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';

    // Append fields to form
    form.appendChild(wrapField(titleInput));
    form.appendChild(wrapField(descInput));
    form.appendChild(wrapField(dateInput));
    form.appendChild(wrapField(priorityLabel, priorityWrapper));
    form.appendChild(wrapField(categoryInput));
    form.appendChild(wrapField(submitButton));

    content.appendChild(form);

    // Form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const title = formData.get('title').trim();
        const category = formData.get('category').trim();

        if (!title) {
            alert('Title is required!');
            return;
        }
        if (!category) {
            alert('Category is required!');
            return;
        }

        const todo = {
            title,
            description: formData.get('description'),
            dueDate: formData.get('due_date'),
            priority: formData.get('priority'),
            category
        };

        // Save todo
        const todos = getTodos();
        todos.push(todo);
        saveTodos(todos);

        // Save new category if not already included
        const categories = getCategories();
        const lowerCategories = categories.map(c => c.toLowerCase());
        if (!lowerCategories.includes(category.toLowerCase())) {
            categories.push(category);
            saveCategories(categories);
        }

        form.reset();
        alert('Todo saved locally!');
    });
};

export { add_todo_page };
