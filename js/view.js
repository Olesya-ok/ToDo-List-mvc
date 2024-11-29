class View {
    constructor() {
        this.addTaskButton = document.getElementById('add-task-btn');
        this.newTaskInput = document.getElementById('new-task-input');
        this.newTaskDeadline = document.getElementById('new-task-deadline'); // добавляем для дедлайна
        this.taskList = document.getElementById('task-list');
        this.showAllButton = document.getElementById('show-all');
        this.showCheckedButton = document.getElementById('show-checked');
        this.deleteAllButton = document.getElementById('delete-all'); // кнопка "Delete All Tasks"
    }

    addAddTaskListener(callback) {
        this.addTaskButton.addEventListener('click', () => {
            const taskText = this.newTaskInput.value.trim();
            const deadline = this.newTaskDeadline.value || null; // Если дедлайн пустой, передаем null
            console.log("Task Text:", taskText, "Deadline:", deadline); // Debugging
            if (taskText) {
                callback(taskText, deadline);
                this.newTaskInput.value = '';
                this.newTaskDeadline.value = '';
            }
        });

        this.newTaskInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const taskText = this.newTaskInput.value.trim();
                const deadline = this.newTaskDeadline.value || null;
                console.log("Task Text:", taskText, "Deadline:", deadline); // Debugging
                if (taskText) {
                    callback(taskText, deadline);
                    this.newTaskInput.value = '';
                    this.newTaskDeadline.value = '';
                }
            }
        });
    }

    addShowAllTasksListener(callback) {
        this.showAllButton.addEventListener('click', () => {
            callback();
        });
    }

    addShowCheckedTasksListener(callback) {
        this.showCheckedButton.addEventListener('click', () => {
            callback();
        });
    }

    addDeleteAllTasksListener(callback) {
        this.deleteAllButton.addEventListener('click', () => {
            callback();
        });
    }

    addDeleteTaskListener(callback) {
        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const taskId = parseInt(event.target.dataset.id);
                callback(taskId);
            }
        });
    }

    addToggleCompletionListener(callback) {
        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('task-checkbox')) {
                const taskId = parseInt(event.target.dataset.id);
                callback(taskId);
            }
        });
    }

    addEditTaskListener(callback) {
        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-btn')) {
                const taskId = parseInt(event.target.dataset.id);
                callback(taskId);
            }
        });
    }

    render(tasks) {
        this.taskList.innerHTML = ''; // очищаем список задач

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task');

            const firstRow = document.createElement('div');
            firstRow.classList.add('task-row');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.dataset.id = task.id;
            checkbox.checked = task.completed;

            const spanText = document.createElement('span');
            spanText.classList.add('task-text');
            spanText.textContent = task.text;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('task-buttons');

            const editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.dataset.id = task.id;
            editButton.textContent = 'Edit';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.dataset.id = task.id;
            deleteButton.textContent = 'Delete';

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            firstRow.appendChild(checkbox);
            firstRow.appendChild(spanText);
            firstRow.appendChild(buttonContainer);

            const secondRow = document.createElement('div');
            secondRow.classList.add('task-date');
            secondRow.textContent = `Created: ${task.createdAt} Deadline: ${task.deadline || 'No deadline'}`;

            if (task.isOverdue) {
                li.style.border = '2px solid red';
            }

            li.appendChild(firstRow);
            li.appendChild(secondRow);

            this.taskList.appendChild(li);
        });
    }
}






// class View {
//     constructor(taskListContainer) {
//         this.taskListContainer = taskListContainer;
//     }
//
//     renderTask(tasks) {
//         this.taskListContainer.innerHTML = '';
//         tasks.forEach(task => {
//             const taskElement = this.createTaskElement(task);
//             this.taskListContainer.appendChild(taskElement);
//         });
//     }
//
//     createTaskElement(task) {
//         const li = document.createElement('li');
//         li.className = 'task-item';
//         li.dataset.id = task.id;
//
//         // Если задача завершена, добавляем класс 'completed' для зачеркнутого текста
//         const taskTextClass = task.completed ? 'completed' : '';
//
//         li.innerHTML = `
//         <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
//         <span class="${taskTextClass}">${task.text}</span>
//         <button class="delete-btn">Delete</button>
//     `;
//
//         return li;
//     }
// }
