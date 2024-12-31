import React from 'react';
import { TransactionType } from '../../types/transaction';

interface TransactionTypeSelectProps {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

export const TransactionTypeSelect: React.FC<TransactionTypeSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        نوع تراکنش
      </label>
      <div className="flex gap-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="buy"
            checked={value === 'buy'}
            onChange={(e) => onChange(e.target.value as TransactionType)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="mr-2">خرید از مشتری</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="sell"
            checked={value === 'sell'}
            onChange={(e) => onChange(e.target.value as TransactionType)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="mr-2">فروش به مشتری</span>
        </label>
      </div>
    </div>
  );
};