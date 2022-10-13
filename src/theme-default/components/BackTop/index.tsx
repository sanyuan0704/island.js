import { React } from 'raect';

export function BackTop() {
  return (
    <div className="fixed bottom-10 right-30">
      <button
        className="w-10 h-10 rounded-full duration-300"
        c="gray hover:gray-500"
        b="~ gray-200 hover:gray-300"
        shadow="sm hover:md"
      >
        <div flex="~ center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 48 48"
            aria-hidden="true"
            focusable="false"
            className="w-4 h-4"
          >
            <path d="M39.6 30.557 24.043 15 8.487 30.557"></path>
          </svg>
        </div>
      </button>
    </div>
  );
}
