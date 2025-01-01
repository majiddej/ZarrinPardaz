import React from 'react';
import Lottie from 'lottie-react';
import emptyAnimation from './empty-state.json';

export const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-64 h-64">
        <Lottie animationData={emptyAnimation} loop={true} />
      </div>
      <p className="text-gray-500 mt-4">{message}</p>
    </div>
  );
};