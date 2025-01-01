import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Customer } from '../types/customer';
import { GoldTransaction } from '../types/transaction';
import { fetchTransactions } from '../services/transactionApi';
import { CustomerSelect } from '../components/transactions/CustomerSelect';
import { DateRangeSelector } from '../components/reports/DateRangeSelector';
import { TransactionTable } from '../components/reports/TransactionTable';
import { LoadingSpinner } from '../components/animations/LoadingSpinner';
import { EmptyState } from '../components/animations/EmptyState';

interface TransactionReportPageProps {
  customers: Customer[];
}

export const TransactionReportPage: React.FC<TransactionReportPageProps> = ({ customers }) => {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [transactions, setTransactions] = useState<GoldTransaction[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
 const [selectedDay, setSelectedDay] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setHasSearched(true);

    try {
      const filters = {
        startDate,
        endDate,
        ...(customerId && { customerId }),
      };

      const data = await fetchTransactions(filters);
      setTransactions(data);
    } catch (err) {
      setError('خطا در دریافت گزارش تراکنش‌ها');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">گزارش تراکنش‌ها</h1>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

            <form onSubmit={handleSubmit} className="space-y-6">
            <DateRangeSelector
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />

            <CustomerSelect
              customers={customers}
              selectedCustomerId={customerId}
              onChange={setCustomerId}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'در حال دریافت گزارش...' : 'دریافت گزارش'}
            </button>
          </form>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : hasSearched && transactions.length === 0 ? (
          <EmptyState message="هیچ تراکنشی در این بازه زمانی یافت نشد" />
        ) : transactions.length > 0 ? (
          <TransactionTable transactions={transactions} />
        ) : null}
      </div>
    </div>
  );
};