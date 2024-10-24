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

// Allow adding todos with Enter key
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = 'translateY(-5px)';
        }, 200);
    });
});