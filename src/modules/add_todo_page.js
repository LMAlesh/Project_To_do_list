import { getTodos, saveTodos, getCategories, saveCategories } from './storage.js';

const add_todo_page = () => {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const form = document.createElement('form');
    form.method = 'POST';

    // Title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.placeholder = 'Enter task';

    // Description input
    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.name = 'description';
    descInput.placeholder = 'Enter description';

    // Date input
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'due_date';

    // Priority label group
    const priorityLabel = document.createElement('p');
    priorityLabel.textContent = 'Priority:';

    // Priority radios and labels
    const priorities = [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' }
    ];

    // Create a <div> element to hold all the priority radio buttons and their labels
    const priorityWrapper = document.createElement('div');

    // Iterate over the priorities array (e.g., [{ value: 'low', label: 'Low' }, ...])
    priorities.forEach(({ value, label }) => {
    
    // Create a radio button input for this priority option
    const radio = document.createElement('input');
    radio.type = 'radio';          // Set type to 'radio' so only one can be selected
    radio.name = 'priority';       // Group all radios under the same name
    radio.value = value;           // Set the value (e.g., 'low', 'moderate', 'high')
    radio.id = `priority-${value}`;// Assign a unique id (e.g., 'priority-low')

    // Create a label element that corresponds to this radio input
    const radioLabel = document.createElement('label');
    radioLabel.setAttribute('for', `priority-${value}`); // Link label to radio by id
    radioLabel.textContent = label;                      // Set visible label text

    // Append both the radio input and its label to the priority wrapper <div>
    priorityWrapper.appendChild(radio);
    priorityWrapper.appendChild(radioLabel);
});

    // Category input
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.name = 'category';
    categoryInput.placeholder = 'Enter category';

    // Submit button 
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Submit';

    // Append everything to the form
    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(dateInput);
    form.appendChild(priorityLabel);
    form.appendChild(priorityWrapper);
    form.appendChild(categoryInput);
    form.appendChild(submit);

    // Add form to the page
    content.appendChild(form);
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!titleInput.value.trim()) {
            alert('Title is required!');
            return;
        }
        if (!categoryInput.value.trim()) {
            alert('Category is required!');
            return;
        }

        const todo = {
            title: titleInput.value,
            description: descInput.value,
            dueDate: dateInput.value,
            priority: form.priority.value,
            category: categoryInput.value
        };

        // Save todo
        const existingTodos = getTodos();
        existingTodos.push(todo);
        saveTodos(existingTodos);

        // Save category if not already present
        const categories = getCategories();
        const newCategory = categoryInput.value.trim().toLowerCase();
        if (newCategory && !categories.map(c => c.toLowerCase()).includes(newCategory)) {
            categories.push(newCategory);
            saveCategories(categories);
        }

        form.reset();
        alert('Todo saved locally!');
    });
};


export { add_todo_page };
