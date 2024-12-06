class Model {
    constructor() {
        this.tasks = this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const tasksJSON = localStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }

    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
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
        this.saveToLocalStorage();
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveToLocalStorage();
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
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
            this.saveToLocalStorage();
        }
    }

    deleteAllTasks() {
        this.tasks = [];
        this.saveToLocalStorage();
    }
}



