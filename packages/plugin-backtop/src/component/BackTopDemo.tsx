import BTween from 'b-tween';
import { useState, useRef } from 'react';
import type { ComponentPropsWithIsland } from 'islandjs';

export function BackTopDemo(props: ComponentPropsWithIsland) {
  const [duration, setDuration] = useState(500);
  const [animation, setAnimation] = useState('quadIn');
  const ballRef = useRef<HTMLDivElement>(null);

  const onStart = () => {
    const btween = new BTween({
      from: {
        left: 20
      },
      to: {
        left: 600
      },
      duration,
      easing: animation,
      onUpdate: (keys) => {
        ballRef.current!.style.left = keys!.left + 'px';
      }
    });
    btween.start();
  };
  const onReset = () => {
    ballRef.current!.style.left = '20px';
  };

  return (
    <div
      className="border-1 h-60 rounded-2 p-4"
      style={{ boxShadow: 'var(--island-shadow-3)' }}
    >
      <div className="gap-4" flex="~ wrap">
        <div>
          <label>duration: </label>
          <input
            type="number"
            border-1=""
            placeholder="default 500"
            onInput={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>animation: </label>
          <select
            className="border-1 w-50 px-2"
            onChange={(e) => setAnimation(e.target.value)}
          >
            <option value="linear">linear</option>
            <option value="quadIn">quadIn</option>
            <option value="quadOut">quadOut</option>
            <option value="quadInOut">quadInOut</option>
            <option value="cubicIn">cubicIn</option>
            <option value="cubicOut">cubicOut</option>
            <option value="cubicInOut">cubicInOut</option>
            <option value="quartIn">quartIn</option>
            <option value="quartOut">quartOut</option>
            <option value="quartInOut">quartInOut</option>
            <option value="quintIn">quintIn</option>
            <option value="quintOut">quintOut</option>
            <option value="quintInOut">quintInOut</option>
            <option value="sineIn">sineIn</option>
            <option value="sineOut">sineOut</option>
            <option value="sineInOut">sineInOut</option>
            <option value="bounceIn">bounceIn</option>
            <option value="bounceOut">bounceOut</option>
            <option value="bounceInOut">bounceInOut</option>
          </select>
        </div>
        <div>
          <button
            className="border-1 px-2 rounded dark:hover:bg-#21b8a3"
            onClick={onStart}
          >
            start
          </button>
          <button
            className="border-1 px-2 rounded dark:hover:bg-#21b8a3"
            onClick={onReset}
          >
            reset
          </button>
        </div>
      </div>
      <div className="flex h-40 items-center">
        <div className="h-0.5 w-100% bg-gray"></div>
        <div
          className="w-8 h-8 absolute rounded-50 l-20px"
          style={{ backgroundColor: 'var(--island-c-brand)' }}
          ref={ballRef}
        ></div>
      </div>
    </div>
  );
}
