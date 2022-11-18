import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import './Todo.css';
import NoTodos from '../NoTodos/NoTodos';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import useLocalStorage from '../../Hooks/UseLocalStorage';

TodoForm.PropTypes = {
  addTodo: PropTypes.func.isRequired,
};

function Todo() {
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);

  const [todos, setTodos] = useLocalStorage('todos', []);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ]);

    setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id != id));
  }

  function completeTodo(id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updateTodos);
  }

  function markAsEditing(id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });

    setTodos(updateTodos);
  }

  function updateTodo(event, id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }

        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updateTodos);
  }

  function cancelEdit(event, id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updateTodos);
  }

  function remainingCalculation() {
    for (let index = 0; index < 200000000; index++) {}
    return todos.filter(todo => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodos() {
    const updateTodos = todos.map(todo => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updateTodos);
  }

  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  useEffect(() => {
    nameInputEl.current.focus();

    return function cleanUp() {};
  }, []);

  function handleNameInput(event) {
    setName(event.target.value);
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What is your name?</h2>
          <form action="#">
            <input
              type="text"
              ref={nameInputEl}
              className="todo-input"
              placeholder="What is your name"
              value={name}
              onChange={handleNameInput}
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default Todo;
