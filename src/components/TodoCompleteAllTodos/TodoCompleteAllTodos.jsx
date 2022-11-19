import React, { useContext } from 'react';
import { TodosContext } from '../../Context/TodosContext';

function TodoCompleteAllTodos() {
  const { todos, setTodos } = useContext(TodosContext);

  function completeAllTodos() {
    const updateTodos = todos.map(todo => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updateTodos);
  }

  return (
    <div>
      <div onClick={completeAllTodos} className="button">
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAllTodos;
