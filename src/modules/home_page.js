const home_page = () => {
    const content = document.getElementById('content');
    content.innerHTML='';

    const homeDiv = document.createElement('div');
    homeDiv.classList.add('home');

    const yesterdayBtn = document.createElement('button');
    yesterdayBtn.classList.add('button');
    yesterdayBtn.textContent = "<";

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');
    buttonDiv.textContent = "TODAY";

    const tommorowBtn = document.createElement('button');
    tommorowBtn.classList.add('button');
    tommorowBtn.textContent = '>';

    const currentTasks = document.createElement('div');
    currentTasks.classList.add('currentTask');
    currentTasks.textContent = "Tasks will be placed here";

    content.appendChild(homeDiv);
    homeDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(yesterdayBtn);
    buttonDiv.appendChild(tommorowBtn);
    homeDiv.appendChild(currentTasks);

}

export { home_page };