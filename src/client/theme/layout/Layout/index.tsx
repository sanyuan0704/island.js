import { Counter } from '../../components/Counter/index';
import React from 'react';
export const Layout: React.FC = () => {
  return (
    <div>
      <h1>This is Layout page</h1>
      <Counter count={1} __island />
    </div>
  );
};
