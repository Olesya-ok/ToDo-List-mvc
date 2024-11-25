class Model {
    constructor() {
        this.tasks = [];
    }

    addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        this.tasks.push(task);
    }

    getTasks() {
        return this.tasks;
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
}
