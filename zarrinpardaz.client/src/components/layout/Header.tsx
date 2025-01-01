import React from 'react';
import { Users, Scale, FileText } from 'lucide-react';

interface HeaderProps {
  currentPage: 'customers' | 'transactions' | 'reports';
  onPageChange: (page: 'customers' | 'transactions' | 'reports') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">زرین پرداز</span>
          </div>
          <div className="flex space-x-8 space-x-reverse">
            <button
              onClick={() => onPageChange('customers')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                currentPage === 'customers'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-5 h-5 ml-2" />
              مدیریت مشتریان
            </button>
            <button
              onClick={() => onPageChange('transactions')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                currentPage === 'transactions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Scale className="w-5 h-5 ml-2" />
              ثبت تراکنش
            </button>
            <button
              onClick={() => onPageChange('reports')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                currentPage === 'reports'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-5 h-5 ml-2" />
              گزارش تراکنش‌ها
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};