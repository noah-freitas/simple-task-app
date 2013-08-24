/**
  * Simple task app.
  *
  * Run in the browser console: copy and paste the source direcly into the console and press enter.
  *
  **/

// Declare a constant to hold the container for the app.
const CONTAINER = document.body;

// Create the model for our tasks. 
var tasks = [];

// If the application has previously saved data.
if (localStorage.tasks) {
	// Load the saved data into our tasks model.
	tasks = JSON.parse(localStorage.tasks);
}

// Declare a function to produce the UI (HTML markup) for a single task.
var showTask = function showTask(task, i) {
	// Return an HTML string for the task.
	return 	'<li data-id="' + i + '">' + 
				'<input type="checkbox"' + (task.complete ? ' checked' : '') + '>' +
	       		'<span class="task-name">' + task.name + '</span>' +
	       	'</li>';
};

// Declare a function to return the rendered the UI.
var render = function render() {
	// Return an HTML string for the app.
	return 	'<div class="task-app">' +
				'<h1>Simple Task App</h1>' +
				'<ul>' +
					tasks.map(showTask) +
				'</ul>' +
				'<input type=text id="new-task">' +
				'<button id="add-task">Add Task</button>' +
			'</div>';
};

// Declare a function to toggle the complete value of a task.
var toggleComplete = function toggleComplete(e) {
	// This handler only cares about the checkboxes.
	if (e.target.type !== 'checkbox') return;

	// Get the appropriate task model.
	var task = tasks[e.target.parentNode.getAttribute('data-id')];

	// Toggle the model complete value.
	task.complete = !task.complete;

	// Save the updated state.
	save();

	// Update the UI.
	updateUI();
};

// Declare a function to add new tasks.
var addTask = function addTask(e) {
	// This handler only cares about the add task button.
	if (e.target.tagName.toLowerCase() !== 'button') return;

	// Add the new task model.
	tasks.push({
		// Get the name from the input element.
		name: document.getElementById('new-task').value,
		// Tasks are incomplete by default.
		complete: false
	});

	// Save the tasks model.
	save();

	// Update the UI.
	updateUI();
};

var listeners = [
	{ name: 'change', handler: toggleComplete },
	{ name: 'click', handler: addTask }
];

var listen = function listen(listener) {
	document.body.addEventListener(listener.name, listener.handler);
};

var unlisten = function unlisten(listener) {
	document.body.removeEventListener(listener.name, listener.handler);
};

var updateUI = function updateUI() {
	// Remove any event listeners.
	listeners.forEach(unlisten);

	// Render the app in the DOM.
	CONTAINER.innerHTML = render();

	// Add event handlers.
	listeners.forEach(listen);
};

// Declare a function to save the tasks to local storage.
var save = function save() {
	localStorage.tasks = JSON.stringify(tasks);
};

// Start the app.
updateUI();
