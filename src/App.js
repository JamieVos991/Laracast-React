import './App.css';
import { useState } from 'react';
import Another from './Another';

function App() {
  const [count, setCount] = useState(0);

  function decrement() {
    setCount(prevCount => prevCount - 1);
  }

  function increment() {
    setCount(prevCount => prevCount + 1);
  }

  return (
    <div className="App">
      <span>{count}</span>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>

      <Another name="Jamie" />
      <Another />
    </div>
  );
}

export default App;
