// Define UI vars;
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

// Load all Event listeners
loadEventListeners();
function loadEventListeners() {
    // Dom load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', deleteItem);
    // Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        // Create li element and add class name, text node
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        // Create anchor tag and add class name, innerText
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Add anchor tag to li element
        li.appendChild(link);
        // Add li element to ul element
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add task');
    } else {
    // Create li element and add class name, text node
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        // Create anchor tag and add class name, innerText
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Add anchor tag to li element
        li.appendChild(link);
        // Add li element to ul element
        taskList.appendChild(li);
        // Store in LS 
        storeTaskInLocalStorage(taskInput.value);
        // Clear input after 
        taskInput.value = '';
        e.preventDefault();
    }
}

// Store task in LS
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove one task
function deleteItem(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            // Remove from LS
            removeTaskFromStorage(e.target.parentElement.parentElement)
        } 
    };
}

// Remove from LS
function removeTaskFromStorage(taskInput) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskInput.textContent === task) {
        tasks.splice(index, 1 );
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks() {

// First way to clear all tasks
    taskList.innerHTML = '';

// Second way to clear all tasks
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
// Clear all task from LS
    localStorage.clear();
}

// Filter tasks 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    // We can you forEach becouse querySlector make NODELIST, becouse get element by id make HTMLlist.
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
};
