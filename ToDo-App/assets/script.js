const loadTasksFromStorage = () => {
	const storedTasks = localStorage.getItem("tasks");
	return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasksToStorage = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
	render("body");
};

const addTask = (newTaskText) => {
	const newTask = {
		text: newTaskText,
		done: false,
		timestamp: Date.now(),
	};
	tasks[tasks.length] = newTask;
	

	if (newTaskText.trim().length === 0) {
		return;
	}

	render("body");
	saveTasksToStorage();
};

const renderButton = (label, className) => {
	const button = document.createElement("button");
	button.textContent = label;
	button.className = className;

	return button;
};

const renderInput = (placeholder) => {
	const input = document.createElement("input");
	input.placeholder = placeholder;
	return input;
};

const renderTaskElement = (task) => {
	const li = document.createElement("li");
	li.innerText = task.text;
};

const renderTasks = () => {
	const taskContainer = document.createElement("div");
	const ul = document.createElement("ul");

	tasks && tasks.length > 0
		? tasks.forEach((task) => ul.appendChild(createTaskElement(task.text)))
		: ul.appendChild(createTaskElement(tasks));

	function createTaskElement(text) {
		const li = document.createElement("li");
		li.textContent = text;
		return li;
	}

	taskContainer.appendChild(ul);
	return taskContainer;
};

const renderForm = () => {
	const formContainer = document.createElement("div");

	const form = document.createElement("form");

	const inputElement = renderInput("Enter new task");
	const buttonElement = renderButton("Add task");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		addTask(inputElement.value);
	});

	form.appendChild(inputElement);
	form.appendChild(buttonElement);

	formContainer.append(form);
	return formContainer;
};

const render = (containerSelector) => {
	const container = document.querySelector(containerSelector);

	if (!container) {
		console.error(
			`Container with selector: ${containerSelector} does not exist`
		);
		return;
	}

	container.innerHTML = "";

	const form = renderForm();
	const taskContainer = renderTasks();
	container.appendChild(form);
	container.appendChild(taskContainer);
};

const tasks = loadTasksFromStorage();
render("body");
