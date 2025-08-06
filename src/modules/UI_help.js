// uiHelpers.js
function createButton(label, className, onClick) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.classList.add(className);
    if (onClick) btn.addEventListener('click', onClick);
    return btn;
}

export { createButton };
