import React from 'react';
import { MotionConfig } from 'framer-motion';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <HomePage />
    </MotionConfig>
  );
};

export default App;
