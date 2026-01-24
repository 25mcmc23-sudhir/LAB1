let tasks = [];
let currentFilter = "all";

function addTask() {
    const text = document.getElementById("taskInput").value;
    const due = document.getElementById("dueDate").value;

    if (text === "" || due === "") return alert("Enter task and due date");

    tasks.push({
        id: Date.now(),
        text: text,
        dueDate: new Date(due),
        completed: false,
    });

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";

    sortTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
    );
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

function sortTasks() {
    tasks.sort((a, b) => a.dueDate - b.dueDate);
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "completed")
        filteredTasks = tasks.filter((t) => t.completed);

    if (currentFilter === "pending")
        filteredTasks = tasks.filter((t) => !t.completed);

    filteredTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span onclick="toggleTask(${task.id})">
                ${task.text} (Due: ${task.dueDate.toLocaleDateString()})
            </span>
            <button onclick="deleteTask(${task.id})">❌</button>
        `;

        list.appendChild(li);
    });
}
