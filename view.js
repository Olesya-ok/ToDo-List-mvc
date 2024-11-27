class View {
    constructor() {
        this.addTaskButton = document.getElementById('add-task-btn');
        this.newTaskInput = document.getElementById('new-task-input');
        this.taskList = document.getElementById('task-list');
    }

    addAddTaskListener(callback) {
        this.newTaskInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const taskText = this.newTaskInput.value.trim();
                if (taskText) {
                    callback(taskText);
                    this.newTaskInput.value = '';
                }
            }
        });

        // Для кнопки "Add Task"
        this.addTaskButton.addEventListener('click', () => {
            const taskText = this.newTaskInput.value.trim();
            if (taskText) {
                callback(taskText);
                this.newTaskInput.value = '';
            }
        });
    }

    addDeleteTaskListener(callback) {
        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const taskId = parseInt(event.target.dataset.id); // Преобразуем ID в число
                callback(taskId);
            }
        });
    }

    addToggleCompletionListener(callback) {
        this.taskList.addEventListener('click', (event) => {
            if (event.target.classList.contains('task-checkbox')) {
                const taskId = parseInt(event.target.dataset.id); // Преобразуем ID в число
                callback(taskId);
            }
        });
    }

    render(tasks) {
        this.taskList.innerHTML = ''; // Очищаем список
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task');

            const taskClass = task.completed ? 'completed' : '';
            li.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                data-id="${task.id}" 
                ${task.completed ? 'checked' : ''}
            >
            <span class="task-text ${taskClass}">${task.text}</span>
            <span class="task-date">${task.createdAt}</span>
            <button 
                class="delete-btn" 
                data-id="${task.id}"
            >
                Delete
            </button>
        `;
            this.taskList.appendChild(li);
        });
    }

    addShowAllTasksListener(callback) {
        document.getElementById('show-all').addEventListener('click', () => {
            callback();
        });
    }

    addShowCheckedTasksListener(callback) {
        document.getElementById('show-checked').addEventListener('click', () => {
            callback();
        });
    }

    addDeleteAllTasksListener(callback) {
        document.getElementById('delete-all').addEventListener('click', () => {
            callback();
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
