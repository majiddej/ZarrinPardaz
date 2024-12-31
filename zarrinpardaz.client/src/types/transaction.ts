export type TransactionType = 'buy' | 'sell';

export interface GoldTransaction {
  id: number;
  customerId: number;
  type: TransactionType;
  weight: number;
  date: string;
}

export interface NewGoldTransaction {
  customerId: number;
  type: TransactionType;
  weight: number;
}