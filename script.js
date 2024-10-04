// Login Page Logic
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('game-page').style.display = 'flex';
    } else {
        alert('Please enter valid username and password.');
    }
});

// Drag and Drop Logic
const correctOrder = ['windBlades', 'hub', 'gearBox', 'brake', 'generator', 'transformer', 'grid'];
let currentOrder = [];
let score = 0;

const draggables = document.querySelectorAll('.draggable');
const dropArea = document.getElementById('drop-area');
const scoreElement = document.getElementById('score');
const resultElement = document.getElementById('result');
const undoButton = document.getElementById('undo-btn');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
});

dropArea.addEventListener('dragover', dragOver);
dropArea.addEventListener('drop', dropElement);

undoButton.addEventListener('click', undoAction);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dropElement(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(id);

    if (currentOrder.length < correctOrder.length) {
        dropArea.appendChild(draggedElement);
        currentOrder.push(id);

        // Add horizontal arrow between blocks
        if (currentOrder.length > 1) {
            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            dropArea.insertBefore(arrow, draggedElement);
        }
    }
}

function undoAction() {
    if (currentOrder.length > 0) {
        const lastElementId = currentOrder.pop();
        const lastElement = document.getElementById(lastElementId);

        // Remove last element from panel 2
        dropArea.removeChild(lastElement);

        // Remove the horizontal arrow
        if (currentOrder.length > 0) {
            const arrows = document.querySelectorAll('.arrow');
            dropArea.removeChild(arrows[arrows.length - 1]);
        }

        // Move last element back to panel 3
        document.getElementById('blocks').appendChild(lastElement);
    }
}

// Submit Logic
document.getElementById('submit-btn').addEventListener('click', checkOrder);

function checkOrder() {
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);

    if (isCorrect) {
        resultElement.textContent = '✔';
        resultElement.classList.add('correct');
        resultElement.classList.remove('wrong');
        score += 10;
    } else {
        resultElement.textContent = '✖';
        resultElement.classList.add('wrong');
        resultElement.classList.remove('correct');
    }

    scoreElement.textContent = score;
}
