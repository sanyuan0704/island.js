import React, { useState } from "react";

export default function Counter(props: { start: number }) {
  const [count, setCount] = useState(props.start);
  return (
    <div>
      count: {count}
      <button
        onClick={() => {
          console.log("点击了");
          setCount((count) => count + 1);
        }}
      >
        点击加1
      </button>
    </div>
  );
}
