class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Обработчики событий
        this.view.addAddTaskListener(this.addTask.bind(this));
        this.view.addDeleteTaskListener(this.removeTask.bind(this));
        this.view.addToggleCompletionListener(this.toggleTaskCompletion.bind(this));
        this.view.addEditTaskListener(this.editTask.bind(this)); // Обработчик редактирования

        this.view.addShowAllTasksListener(this.showAllTasks.bind(this));
        this.view.addShowCheckedTasksListener(this.showUncheckedTasks.bind(this));
        this.view.addDeleteAllTasksListener(this.deleteAllTasks.bind(this));

        // Изначальное обновление представления
        this.updateView();
    }

    // Обновление всего представления
    updateView() {
        const tasks = this.model.getTasks();
        this.view.render(tasks);
    }

    // Добавление новой задачи
    addTask(taskText, deadline) {
        console.log('Adding task:', taskText, deadline); // Debugging
        this.model.addTask(taskText, deadline);
        this.updateView();
    }

    // Удаление задачи
    removeTask(taskId) {
        this.model.removeTask(taskId);
        this.updateView();
    }

    // Переключение состояния задачи
    toggleTaskCompletion(taskId) {
        this.model.toggleTaskCompletion(taskId);
        this.updateView();
    }

    // Редактирование задачи
    editTask(taskId) {
        const task = this.model.getTasks().find(t => t.id === taskId);
        if (task) {
            const newText = prompt("Edit task text:", task.text);
            if (newText && newText.trim() !== "") {
                this.model.updateTaskText(taskId, newText);
                this.updateView();
            }
        }
    }

    // Показ всех задач
    showAllTasks() {
        const tasks = this.model.getTasks();
        this.view.render(tasks);
    }

    showUncheckedTasks() {
        const tasks = this.model.getTasks().filter(task => !task.completed);
        this.view.render(tasks);
    }

    deleteAllTasks() {
        this.model.deleteAllTasks();
        this.updateView();
    }


}


// Инициализация
const model = new Model();
const view = new View();
const controller = new Controller(model, view);

function updateCurrentTime() {
    const timeContainer = document.getElementById('current-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeContainer.textContent = `${hours}:${minutes}`;
}

// Запускаем обновление времени каждую секунду
setInterval(updateCurrentTime, 1000);

// И вызываем функцию сразу, чтобы время отобразилось при загрузке
updateCurrentTime();

































// document.addEventListener('DOMContentLoaded', () => {
//     const taskListContainer = document.querySelector('#task-list');
//     const addTaskBtn = document.querySelector('#add-task-btn');
//     const newTaskInput = document.querySelector('#new-task-input');
//     const model = new Model();  // Создаем модель
//     const view = new View(taskListContainer);  // Создаем вид
//
//     // Отображаем задачи на странице
//     view.renderTask(model.getTasks());
//
//     // Добавление задачи
//     addTaskBtn.addEventListener('click', () => {
//         const taskText = newTaskInput.value;
//         if (taskText.trim() === "") return;  // Если текст пустой, не добавляем задачу
//
//         model.addTask(taskText);
//         view.renderTask(model.getTasks());  // Обновляем отображение
//         newTaskInput.value = '';  // Очищаем поле ввода
//     });
//
//     // Обработка клавиши Enter для добавления задачи
//     newTaskInput.addEventListener('keydown', (event) => {
//         if (event.key === 'Enter') {
//             const taskText = newTaskInput.value;
//             if (taskText.trim() === "") return;
//
//             model.addTask(taskText);
//             view.renderTask(model.getTasks());
//             newTaskInput.value = '';
//         }
//     });
//
//     // Удаление задачи по клику на кнопку "Delete"
//     taskListContainer.addEventListener('click', (event) => {
//         if (event.target.classList.contains('delete-btn')) {
//             const taskId = event.target.closest('li').dataset.id;
//             model.removeTask(Number(taskId));
//             view.renderTask(model.getTasks());
//         }
//     });
//
//     // Завершение задачи по клику на кнопку "Complete"
//     taskListContainer.addEventListener('change', (event) => {
//         if (event.target.classList.contains('complete-checkbox')) {
//             const taskId = event.target.closest('li').dataset.id;
//             model.toggleTaskCompletion(Number(taskId)); // Переключаем состояние задачи
//             view.renderTask(model.getTasks());  // Обновляем отображение задач
//         }
//     });
// });
