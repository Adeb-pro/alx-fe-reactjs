import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <p style={{ fontSize: '18px' }}>
        Current Count: <strong>{count}</strong>
      </p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button
        onClick={() => setCount(count - 1)}
        style={{ margin: '0 10px' }}
      >
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
export default Counter;