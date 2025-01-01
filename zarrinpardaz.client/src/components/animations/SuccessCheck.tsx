import React from 'react';
import Lottie from 'lottie-react';
import successAnimation from './success.json';

export const SuccessCheck: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  return (
    <div className="w-32 h-32 mx-auto">
      <Lottie 
        animationData={successAnimation} 
        loop={false}
        onComplete={onComplete}
      />
    </div>
  );
};