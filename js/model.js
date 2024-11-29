class Model {
    constructor() {
        this.tasks = [];
    }

    addTask(taskText, deadline) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString(),
            deadline: deadline, // сохраняем дедлайн
            isOverdue: false
        };
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }

    getTasks() {
        // Обновляем статус просроченности для каждой задачи
        this.tasks.forEach(task => {
            if (task.deadline) {
                task.isOverdue = new Date(task.deadline) < new Date() && !task.completed;
            }
        });
        return this.tasks;
    }

    updateTaskText(taskId, newText) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.text = newText;
        }
    }

    deleteAllTasks() {
        this.tasks = [];
    }
}



