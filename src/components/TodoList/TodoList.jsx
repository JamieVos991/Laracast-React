import React, { useContext } from 'react';
import TodoClearCompleted from '../TodoClearCompleted/TodoClearCompleted';
import TodoItemsRemaining from '../TodoItemsRemaining/TodoItemsRemaining';
import TodoCompleteAllTodos from '../TodoCompleteAllTodos/TodoCompleteAllTodos';
import TodoFilters from '../TodoFilters/TodoFilters';
import useToggle from '../../Hooks/useToggle';
import { TodosContext } from '../../Context/TodosContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function TodoList() {
  const { todosFiltered, todos, setTodos } = useContext(TodosContext);
  const [isFeaturesOneVisible, setFeaturesOneVisible] = useToggle(true);
  const [isFeaturesTwoVisible, setFeaturesTwoVisible] = useToggle(false);

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
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

  function completeTodo(id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updateTodos);
  }

  return (
    <>
      <TransitionGroup component="ul" className="todo-list">
        {todosFiltered().map((todo, index) => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="slide-horizontal"
          >
            <li className="todo-item-container">
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

              <button onClick={() => deleteTodo(todo.id)} className="x-button">
                ✖️
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
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="toggles-container">
        <button onClick={setFeaturesOneVisible} className="button">
          ♒
        </button>
        <button onClick={setFeaturesTwoVisible} className="button">
          ♊
        </button>
      </div>

      <CSSTransition
        in={isFeaturesOneVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="check-all-container">
          <TodoCompleteAllTodos />

          <TodoItemsRemaining />
        </div>
      </CSSTransition>

      <CSSTransition
        in={isFeaturesTwoVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="other-buttons-container">
          <TodoFilters todosFiltered={todosFiltered} filter setFilter />
          <div>
            <TodoClearCompleted clearCompleted />
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default TodoList;
