import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from './loading.json';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-24 h-24 mx-auto">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};