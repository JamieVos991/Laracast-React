import PropTypes from 'prop-types';
import { useState } from 'react';
import './Todo.css';
import NoTodos from '../NoTodos/NoTodos';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';

TodoForm.PropTypes = {
  addTodo: PropTypes.func.isRequired,
};

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
      isComplete: true,
      isEditing: false,
    },
  ]);

  const [idForTodo, setIdForTodo] = useState(4);

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

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

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

  return (
    <div className="todo-app-container">
      <div className="todo-app">
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
