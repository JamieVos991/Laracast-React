import React from 'react';
import './Todo.css';

export default function Another(props) {
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#">
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          <li className="todo-item-container">
            <div className="todo-item">
              <input type="checkbox" />
              <span className="todo-item-label">Finish React Series</span>
            </div>
            <button className="x-button">
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
          <li className="todo-item-container">
            <div className="todo-item">
              <input type="checkbox" />
              <span className="todo-item-label line-through">
                Go to Grocery
              </span>
            </div>
            <button className="x-button">
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
          <li className="todo-item-container">
            <div className="todo-item">
              <input type="checkbox" />
              <span className="todo-item-label line-through">
                Go to Grocery
              </span>
            </div>
            <button className="x-button">
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
          <button className="button">Clear completed</button>
        </div>
      </div>
    </div>
  );
}
