const list = document.querySelector('.todos');
const addTodo = document.querySelector('.add');
const search = document.querySelector('.search');
const searchInput = search.querySelector('input');

// Template para inserção de tarefa
const todoTemplate = (todo) => {
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <i class="fas fa-exclamation-triangle state" aria-hidden="true"></i>  
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
  `;

  list.innerHTML += html;
};

// Adiciona tarefa
addTodo.addEventListener('submit', (e) => {
  e.preventDefault();

  const todo = addTodo.add.value.trim();

  if (todo.length) {
    if (!list.children.length) {
      search.classList.remove('d-none');
      addTodo.classList.add('my-4');
    }
    todoTemplate(todo);
  }

  addTodo.reset();
});

list.addEventListener('click', (e) => {
  // Remove tarefa
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
    if (!list.children.length) {
      search.classList.add('d-none');
      addTodo.classList.remove('my-4');
    }
  }
  // Define estado da tarefa
  if (e.target.classList.contains('state')) {
    if (e.target.parentElement.classList.contains('done')) {
      e.target.parentElement.classList.remove('done');
      e.target.parentElement.classList.add('to-do');
    } else if (e.target.parentElement.classList.contains('in-progress')) {
      e.target.parentElement.classList.remove('in-progress');
      e.target.parentElement.classList.add('done');
    } else if (e.target.parentElement.classList.contains('to-do')) {
      e.target.parentElement.classList.remove('to-do');
      e.target.parentElement.classList.add('in-progress');
    } else {
      e.target.parentElement.classList.add('to-do');
    }
  }
});

// Previne página de dar reload ao apertar a tecla "enter" na busca de tarefas
search.addEventListener('submit', (e) => {
  e.preventDefault();
});

// Filtro no campo de busca
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.includes(term))
    .forEach((todo) => {
      todo.classList.add('filtered');
    });

  Array.from(list.children)
    .filter((todo) => todo.textContent.includes(term))
    .forEach((todo) => {
      todo.classList.remove('filtered');
    });
};

searchInput.addEventListener('keyup', () => {
  const term = searchInput.value.trim().toLowerCase();

  filterTodos(term);
});
