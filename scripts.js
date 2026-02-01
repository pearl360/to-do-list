let tasks = [];
let currentTab = 'active';

function addTask() {
  const input = document.getElementById('taskInput');
  if (!input.value) return;
  tasks.push({ id: Date.now(), text: input.value, completed: false });
  input.value = '';
  render();
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  render();
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function editTask(id) {
  const newText = prompt("Edit task:");
  if (newText) {
    tasks.find(t => t.id === id).text = newText;
    render();
  }
}

function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  const filtered = tasks.filter(t => currentTab === 'active' ? !t.completed : t.completed);
  
  filtered.forEach(t => {
    const li = document.createElement('li');
    li.className = `todo-item ${t.completed ? 'complete' : ''}`;
    li.innerHTML = `
      <div class="circle" onclick="toggleComplete(${t.id})"></div>
      <span class="text">${t.text}</span>
      <div class="actions">
        <button onclick="editTask(${t.id})">Edit</button>
        <button class="del-btn" onclick="deleteTask(${t.id})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}
