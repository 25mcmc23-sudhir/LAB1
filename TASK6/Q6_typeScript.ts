// Define the shape of a Task
interface Task {
    id: number;
    text: string;
    dueDate: Date;
    completed: boolean;
}

// Keep track of tasks and filter state
let tasks: Task[] = [];
let currentFilter: "all" | "completed" | "pending" = "all";

// Add a new task
function addTask(): void {
    const textInput = document.getElementById("taskInput") as HTMLInputElement;
    const dueInput = document.getElementById("dueDate") as HTMLInputElement;

    const text = textInput.value.trim();
    const due = dueInput.value;

    if (!text || !due) {
        alert("Enter task and due date");
        return;
    }

    const newTask: Task = {
        id: Date.now(),
        text,
        dueDate: new Date(due),
        completed: false,
    };

    tasks.push(newTask);

    textInput.value = "";
    dueInput.value = "";

    sortTasks();
    renderTasks();
}

// Toggle completion status
function toggleTask(id: number): void {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
    );
    renderTasks();
}

// Delete a task
function deleteTask(id: number): void {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
}

// Change filter
function setFilter(filter: "all" | "completed" | "pending"): void {
    currentFilter = filter;
    renderTasks();
}

// Sort tasks by due date
function sortTasks(): void {
    tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}

// Render tasks to the DOM
function renderTasks(): void {
    const list = document.getElementById("taskList") as HTMLUListElement;
    list.innerHTML = "";

    let filteredTasks: Task[] = tasks;

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter((t) => t.completed);
    } else if (currentFilter === "pending") {
        filteredTasks = tasks.filter((t) => !t.completed);
    }

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
