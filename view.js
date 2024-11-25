class View {
    constructor(taskListContainer) {
        this.taskListContainer = taskListContainer;
    }

    renderTask(tasks) {
        this.taskListContainer.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.taskListContainer.appendChild(taskElement);
        });
    }

    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;

        // Если задача завершена, добавляем класс 'completed' для зачеркнутого текста
        const taskTextClass = task.completed ? 'completed' : '';

        li.innerHTML = `
        <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="${taskTextClass}">${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;

        return li;
    }
}
