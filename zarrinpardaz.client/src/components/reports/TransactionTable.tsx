import React from 'react';
import { GoldTransaction } from '../../types/transaction';
import { FileText } from 'lucide-react';

interface TransactionTableProps {
  transactions: GoldTransaction[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const totalBuyWeight = transactions
    .filter(t => t.type === 'buy')
    .reduce((sum, t) => sum + t.weight, 0);
    
  const totalSellWeight = transactions
    .filter(t => t.type === 'sell')
    .reduce((sum, t) => sum + t.weight, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">گزارش تراکنش‌ها</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">مجموع خرید</p>
          <p className="text-2xl font-bold text-green-700">{totalBuyWeight.toFixed(2)} گرم</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">مجموع فروش</p>
          <p className="text-2xl font-bold text-blue-700">{totalSellWeight.toFixed(2)} گرم</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">تاریخ</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">نام مشتری</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">نوع تراکنش</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">وزن (گرم)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {new Date(transaction.date).toLocaleDateString('fa-IR')}
                </td>
                <td className="px-6 py-4">{transaction.customerName}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'buy'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {transaction.type === 'buy' ? 'خرید' : 'فروش'}
                  </span>
                </td>
                <td className="px-6 py-4">{transaction.weight.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};