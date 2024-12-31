import { GoldTransaction, NewGoldTransaction } from '../types/transaction';

const API_BASE_URL = 'https://api.example.com';

export const createTransaction = async (transaction: NewGoldTransaction): Promise<GoldTransaction> => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  
  if (!response.ok) {
    throw new Error('خطا در ثبت تراکنش');
  }
  
  return response.json();
};