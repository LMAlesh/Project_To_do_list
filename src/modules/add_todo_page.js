const add_todo_page = () => {
    const content = document.getElementById('content');
    content.innerHTML='';

    const form = document.createElement('form');
    form.method = 'POST';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.placeholder = "Enter task";

    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.name = 'description';
    descInput.placeholder = "Enter description";

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'Due date';

    const priorityInput1 = document.createElement('input');
    priorityInput1.type = 'radio';
    priorityInput1.name = 'priority';
    priorityInput1.value = 'low';

    const priorityInput2 = document.createElement('input');
    priorityInput2.type = 'radio';
    priorityInput2.name = 'priority';
    priorityInput2.value = 'moderate';
    
    const priorityInput3 = document.createElement('input');
    priorityInput3.type = 'radio';
    priorityInput3.name = 'priority';
    priorityInput3.value = 'high';

    const categoryInput = document.createElement('input');           
    categoryInput.type = 'text';
    categoryInput.name = 'category';

    const submit = document.createElement('button');
    submit.type = submit;
    submit.textContent = 'Submit';

    content.appendChild(form);
    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(dateInput);
    form.appendChild(priorityInput1);
    form.appendChild(priorityInput2);
    form.appendChild(priorityInput3);
    form.appendChild(categoryInput);
    form.appendChild(submit);
    
    // document.getElementById("form-container").appendChild(form);
    
}

export { add_todo_page };