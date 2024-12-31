import React, { useState } from 'react';
import { Customer } from '../types/customer';
import { TransactionType, NewGoldTransaction } from '../types/transaction';
import { createTransaction } from '../services/transactionApi';
import { CustomerSelect } from '../components/transactions/CustomerSelect';
import { TransactionTypeSelect } from '../components/transactions/TransactionTypeSelect';
import { WeightInput } from '../components/transactions/WeightInput';
import { Scale } from 'lucide-react';

interface TransactionPageProps {
  customers: Customer[];
}

export const TransactionPage: React.FC<TransactionPageProps> = ({ customers }) => {
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [transactionType, setTransactionType] = useState<TransactionType>('buy');
  const [weight, setWeight] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!customerId) {
      setError('لطفاً مشتری را انتخاب کنید');
      return;
    }

    try {
      const transaction: NewGoldTransaction = {
        customerId,
        type: transactionType,
        weight,
      };

      await createTransaction(transaction);
      setSuccess('تراکنش با موفقیت ثبت شد');
      
      // Reset form
      setCustomerId('');
      setTransactionType('buy');
      setWeight(0);
    } catch (err) {
      setError('خطا در ثبت تراکنش');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">ثبت تراکنش طلا</h1>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomerSelect
              customers={customers}
              selectedCustomerId={customerId}
              onChange={setCustomerId}
            />
            
            <TransactionTypeSelect
              value={transactionType}
              onChange={setTransactionType}
            />
            
            <WeightInput
              value={weight}
              onChange={setWeight}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ثبت تراکنش
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};