import { useState } from 'react';
import React from 'react';

export function Counter(props: { count?: number; __island: boolean }) {
  const [count, setCount] = useState(props.count || 0);
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>点击我哈</button>
    </div>
  );
}
