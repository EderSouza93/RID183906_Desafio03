const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
    return localTasks;
};

const setTasksInLocalStorage = (tasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const renderTasksProgressData = (tasks) => {
    const tasksProgress = document.getElementById("tasks-progress");
    const doneTasks = tasks.filter(({ checked }) => checked).length;
    const totalTasks = tasks.length;
    tasksProgress.textContent = `${doneTasks}/${totalTasks} tarefas concluídas`;
};

const removeDoneTasks = () => {
    const tasks = getTasksFromLocalStorage()
    const tasksToRemove = tasks
        .filter(({ checked }) => checked)
        .map(({ id }) => id)
    
    const updatedTasks = tasks.filter(({ checked }) => !checked);
    setTasksInLocalStorage(updatedTasks)
    renderTasksProgressData(updatedTasks)

    const tasksContainer = document.querySelector('.tasks');
    if (tasksContainer) {
        tasksToRemove.forEach((taskToRemove) => {
            const taskElement = document.getElementById(taskToRemove);
            if (taskToRemove) {
                tasksContainer.removeChild(taskElement);
            }    
        });
    }
}

const createTaskElement = (task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.id = task.id;

    const taskGroupDiv = document.createElement("div");
    taskGroupDiv.className = "task-group";

    const contentContainer = document.createElement("div");

    const taskTitleDiv = document.createElement("div");
    taskTitleDiv.className = task.checked ? "task-title-conclude" : "task-title";
    taskTitleDiv.textContent = task.description;

    const taskMetaDiv = document.createElement("div");
    taskMetaDiv.className = "task-meta";

    const taskTagsDiv = document.createElement("div");
    taskTagsDiv.className = "task-tags";

    if (task.tag) {
        const tagSpan = document.createElement("span");
        tagSpan.className = "tag";
        tagSpan.textContent = task.tag;
        taskTagsDiv.appendChild(tagSpan);
    }

    const taskDateSpan = document.createElement("span");
    taskDateSpan.className = "task-date";
    taskDateSpan.textContent = `Criado em: ${formatDate(task.createdAt)}`;

    taskMetaDiv.appendChild(taskTagsDiv);
    taskMetaDiv.appendChild(taskDateSpan);

    contentContainer.appendChild(taskTitleDiv);
    contentContainer.appendChild(taskMetaDiv);

    taskGroupDiv.appendChild(contentContainer);

    const completionContainer = document.createElement("div");
    completionContainer.className = "completion-container";

    const updateCompletionElement = () => {
        completionContainer.innerHTML = "";

        if (task.checked) {
            const img = document.createElement("img");
            img.src = "./assets/check.svg";
            img.alt = "Tarefa concluída";
            img.className = "complete-icon";
            img.width = 24;
            img.height = 24;
            completionContainer.appendChild(img);
        } else {
            const button = document.createElement("button");
            button.className = "conclude-button";
            button.textContent = "Concluir";
            button.onclick = async () => {
                await toggleTaskComplete(task.id);
                task.checked = !task.checked;
                updateCompletionElement();
            };
            completionContainer.appendChild(button);
        }
    };

    updateCompletionElement();
    taskGroupDiv.appendChild(completionContainer);

    taskDiv.appendChild(taskGroupDiv);

    return taskDiv;
};

const toggleTaskComplete = (taskId) => {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
    );

    setTasksInLocalStorage(updatedTasks);
    renderTasks();
};

const renderTasks = () => {
    const tasks = getTasksFromLocalStorage();
    const tasksContainer = document.querySelector(".tasks");
    
    if (!tasksContainer) {
        const newTasksContainer = document.createElement("div");
        newTasksContainer.className = "tasks";
        document.querySelector(".board").appendChild(newTasksContainer);
    }
    
    tasksContainer.innerHTML = "";

    tasks.forEach((task) => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });

    renderTasksProgressData(tasks);
};

const createTask = async (event) => {
    event.preventDefault();
    const inputs = document.querySelectorAll('.input-group input');
    const description = inputs[0].value;
    const tag = inputs[1].value;

    if (!description) return;

    const tasks = getTasksFromLocalStorage();
    const newTask = {
        id: Date.now(),
        description,
        tag,
        checked: false,
        createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasksInLocalStorage(updatedTasks);

    inputs[0].value = "";
    inputs[1].value = "";

    renderTasks();
};

window.onload = function () {
    const addButton = document.querySelector('.add-button');
    addButton.addEventListener("click", createTask);
    renderTasks();
};