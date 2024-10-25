const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);

function addTodo() {
    if (todoInput.value.trim() === '') return;

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    
    const todoText = document.createElement('span');
    todoText.textContent = todoInput.value;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => todoItem.remove();

    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);

    todoInput.value = '';
}

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousedown', () => {
        card.style.transform = 'scale(0.98)';
    });
    card.addEventListener('mouseup', () => {
        card.style.transform = 'translateY(-5px)';
    });
});

