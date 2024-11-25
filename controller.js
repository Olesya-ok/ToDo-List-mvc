document.addEventListener('DOMContentLoaded', () => {
    const taskListContainer = document.querySelector('#task-list');
    const addTaskBtn = document.querySelector('#add-task-btn');
    const newTaskInput = document.querySelector('#new-task-input');
    const model = new Model();  // Создаем модель
    const view = new View(taskListContainer);  // Создаем вид

    // Отображаем задачи на странице
    view.renderTask(model.getTasks());

    // Добавление задачи
    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value;
        if (taskText.trim() === "") return;  // Если текст пустой, не добавляем задачу

        model.addTask(taskText);
        view.renderTask(model.getTasks());  // Обновляем отображение
        newTaskInput.value = '';  // Очищаем поле ввода
    });

    // Обработка клавиши Enter для добавления задачи
    newTaskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const taskText = newTaskInput.value;
            if (taskText.trim() === "") return;

            model.addTask(taskText);
            view.renderTask(model.getTasks());
            newTaskInput.value = '';
        }
    });

    // Удаление задачи по клику на кнопку "Delete"
    taskListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const taskId = event.target.closest('li').dataset.id;
            model.removeTask(Number(taskId));
            view.renderTask(model.getTasks());
        }
    });

    // Завершение задачи по клику на кнопку "Complete"
    taskListContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('complete-checkbox')) {
            const taskId = event.target.closest('li').dataset.id;
            model.toggleTaskCompletion(Number(taskId)); // Переключаем состояние задачи
            view.renderTask(model.getTasks());  // Обновляем отображение задач
        }
    });
});
