function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dateTimeInput = document.getElementById('taskDateTime');
  const priorityInput = document.getElementById('priority');
  const taskList = document.getElementById('taskList');

  const taskText = taskInput.value.trim();
  const dueDateTime = dateTimeInput.value;
  const priority = priorityInput.value;

  if (taskText === '') return;

  const li = document.createElement('li');
  li.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onchange = () => li.classList.toggle('completed');

  const taskContent = document.createElement('div');
  taskContent.className = 'task-text';

  const now = new Date();
  const due = new Date(dueDateTime);
  const isOverdue = dueDateTime && due < now;

  const span = document.createElement('span');
  span.innerHTML = `${taskText}<br><small class="${isOverdue ? 'overdue' : ''}">${dueDateTime ? 'Due: ' + due.toLocaleString() : ''}</small>`;

  const priorityTag = document.createElement('span');
  priorityTag.className = `priority ${priority}`;
  priorityTag.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

  taskContent.appendChild(span);
  taskContent.appendChild(priorityTag);

  const controls = document.createElement('div');
  controls.className = 'task-controls';

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.onclick = () => {
    const newTask = prompt('Edit task:', taskText);
    const newDue = prompt('Edit date & time:', dueDateTime);
    if (newTask) {
      span.innerHTML = `${newTask}<br><small>${newDue ? 'Due: ' + new Date(newDue).toLocaleString() : ''}</small>`;
    }
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.onclick = () => li.remove();

  controls.appendChild(editBtn);
  controls.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(taskContent);
  li.appendChild(controls);

  taskList.appendChild(li);

  taskInput.value = '';
  dateTimeInput.value = '';
  priorityInput.value = 'medium';
}

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('#taskList .task-item').forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(query) ? '' : 'none';
  });
});
