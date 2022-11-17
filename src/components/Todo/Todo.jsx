import { useState } from 'react';
import './Todo.css';

function Todo() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Finish CSS Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Finish HTML Series',
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [todoInput, setTodoInput] = useState('');
  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setTodoInput('');
    setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id != id));
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
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

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={todoInput}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        {todos.length > 0 ? (
          <>
            <ul className="todo-list">
              {todos.map((todo, index) => (
                <li key={todo.id} className="todo-item-container">
                  <div className="todo-item">
                    <input
                      type="checkbox"
                      onChange={() => completeTodo(todo.id)}
                      checked={todo.isComplete ? true : false}
                    />

                    {!todo.isEditing ? (
                      <span
                        onDoubleClick={() => markAsEditing(todo.id)}
                        className={`todo-item-label ${
                          todo.isComplete ? 'line-through' : ''
                        }`}
                      >
                        {todo.title}
                      </span>
                    ) : (
                      <input
                        type="text"
                        onBlur={event => updateTodo(event, todo.id)}
                        className="todo-item-input"
                        defaultValue={todo.title}
                        onKeyDown={event => {
                          if (event.key === 'Enter') {
                            updateTodo(event, todo.id);
                          } else if (event.key === 'Escape') {
                            cancelEdit(event, todo.id);
                          }
                        }}
                        autoFocus
                      />
                    )}
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="x-button"
                  >
                    X
                    <svg
                      className="x-button-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </button>
                </li>
              ))}
            </ul>
            <div className="check-all-container">
              <div>
                <div className="button">Check All</div>
              </div>
              <span>3 items remaining</span>
            </div>

            <div className="other-buttons container">
              <div>
                <button className="button filter-button filter-button-active">
                  All
                </button>
                <button className="button filter-button">Active</button>
                <button className="button filter-button">Completed</button>
              </div>
              <div>
                <button className="button">Clear completed</button>
              </div>
            </div>
          </>
        ) : (
          <div className="no-todos-container">
            <p>Add some todos...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
