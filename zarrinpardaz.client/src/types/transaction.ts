export type TransactionType = 'buy' | 'sell';

export interface GoldTransaction {
  id: number;
  customerId: number;
  type: TransactionType;
  weight: number;
  date: string;
  customerName?: string; // Added for report display
}

export interface NewGoldTransaction {
  customerId: number;
  type: TransactionType;
  weight: number;
}

export interface TransactionFilters {
  startDate: string;
  endDate: string;
  customerId?: number;
}