import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppClass from './components/Todo/TodoClass/TodoClass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppClass />
  </React.StrictMode>
);
