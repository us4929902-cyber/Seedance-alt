/* Simple To-Do with localStorage */
const STORAGE_KEY = 'simple-todos:v1';

const $ = id => document.getElementById(id);
const newTaskForm = $('new-task-form');
const newTaskInput = $('new-task-input');
const tasksList = $('tasks-list');
const clearCompletedBtn = $('clear-completed');
const filters = Array.from(document.querySelectorAll('.filter-btn'));
const itemsCount = $('items-count');

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let currentFilter = 'all';

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  render();
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

function addTask(text) {
  if (!text || !text.trim()) return;
  todos.unshift({ id: uid(), text: text.trim(), completed: false, createdAt: Date.now() });
  save();
}

function updateTask(id, patch) {
  todos = todos.map(t => t.id === id ? { ...t, ...patch } : t);
  save();
}

function removeTask(id) {
  todos = todos.filter(t => t.id !== id);
  save();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  save();
}

function filteredTodos() {
  if (currentFilter === 'active') return todos.filter(t => !t.completed);
  if (currentFilter === 'completed') return todos.filter(t => t.completed);
  return todos;
}

function render() {
  tasksList.innerHTML = '';
  const list = filteredTodos();
  if (list.length === 0) {
    tasksList.innerHTML = '<li class="muted">No tasks</li>';
  } else {
    list.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task' + (task.completed ? ' completed' : '');
      li.setAttribute('data-id', task.id);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!task.completed;
      checkbox.setAttribute('aria-label', 'Mark task complete');

      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = task.text;

      const actions = document.createElement('div');
      actions.className = 'actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'icon-btn';
      editBtn.title = 'Edit';
      editBtn.textContent = '✏️';

      const delBtn = document.createElement('button');
      delBtn.className = 'icon-btn';
      delBtn.title = 'Delete';
      delBtn.textContent = '🗑️';

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(actions);

      // Events
      checkbox.addEventListener('change', () => updateTask(task.id, { completed: checkbox.checked }));
      delBtn.addEventListener('click', () => {
        if (confirm('Delete this task?')) removeTask(task.id);
      });

      editBtn.addEventListener('click', () => startEdit(li, task));

      tasksList.appendChild(li);
    });
  }

  itemsCount.textContent = todos.length;
  // update clear button state
  clearCompletedBtn.disabled = todos.every(t => !t.completed);
  // update active filter button visuals
  filters.forEach(f => f.classList.toggle('active', f.dataset.filter === currentFilter));
}

function startEdit(li, task) {
  const label = li.querySelector('.label');
  const prevText = task.text;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = prevText;
  input.className = 'edit-input';
  label.replaceWith(input);
  input.focus();
  input.select();

  function finish(saveEdit) {
    if (saveEdit) {
      const v = input.value.trim();
      if (v) updateTask(task.id, { text: v });
      else if (confirm('Empty text — delete task?')) removeTask(task.id);
    } else {
      render(); // cancel -> re-render to restore label
    }
  }

  input.addEventListener('blur', () => finish(true));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { finish(true); }
    else if (e.key === 'Escape') { finish(false); }
  });
}

// Add task
newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(newTaskInput.value);
  newTaskInput.value = '';
});

// Clear completed
clearCompletedBtn.addEventListener('click', () => {
  if (confirm('Remove all completed tasks?')) clearCompleted();
});

// Filters
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

// first render
render();
