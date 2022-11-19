import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import './Todo.css';
import NoTodos from '../NoTodos/NoTodos';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import useLocalStorage from '../../Hooks/UseLocalStorage';
import useToggle from '../../Hooks/useToggle';
import { TodosContext } from '../../Context/TodosContext';

TodoForm.PropTypes = {
  addTodo: PropTypes.func.isRequired,
};

function Todo(props) {
  const [isFeaturesOneVisible, setFeaturesOneVisible] = useToggle();
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);

  const [todos, setTodos] = useLocalStorage('todos', []);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

  const [filter, setFilter] = useState('all');

  function todosFiltered() {
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
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        idForTodo,
        setIdForTodo,
        todosFiltered,
        filter,
        setFilter,
      }}
    >
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-container">
            {name && <h2>Good evening, {name}</h2>}
            {isFeaturesOneVisible && (
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
            )}
          </div>
          <h2>Todos</h2>
          <TodoForm />

          {todos.length > 0 ? <TodoList /> : <NoTodos />}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default Todo;
