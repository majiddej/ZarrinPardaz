import { GoldTransaction, NewGoldTransaction, TransactionFilters } from '../types/transaction';

const API_BASE_URL = 'https://localhost:7180'; // Replace with your actual API URL

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

export const fetchTransactions = async (filters: TransactionFilters): Promise<GoldTransaction[]> => {
  const params = new URLSearchParams({
    startDate: filters.startDate,
    endDate: filters.endDate,
    ...(filters.customerId && { customerId: filters.customerId.toString() }),
  });

  const response = await fetch(`${API_BASE_URL}/transactions/report?${params}`);
  if (!response.ok) {
    throw new Error('خطا در دریافت گزارش تراکنش‌ها');
  }
  return response.json();
};