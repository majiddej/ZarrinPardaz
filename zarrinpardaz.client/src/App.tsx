import React, { useEffect, useState } from 'react';
import { Customer } from './types/customer';
import { fetchCustomers } from './services/api';
import { CustomerGrid } from './components/CustomerGrid';
import { AddCustomerForm } from './components/AddCustomerForm';
import { TransactionPage } from './pages/TransactionPage';
import { Users, Scale } from 'lucide-react';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<'customers' | 'transactions'>('customers');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err) {
      setError('خطا در بارگذاری اطلاعات مشتریان');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8 space-x-reverse">
              <button
                onClick={() => setCurrentPage('customers')}
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
                onClick={() => setCurrentPage('transactions')}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  currentPage === 'transactions'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Scale className="w-5 h-5 ml-2" />
                ثبت تراکنش
              </button>
            </div>
          </div>
        </div>
      </nav>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {currentPage === 'customers' ? (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CustomerGrid customers={customers} />
            </div>
            <div>
              <AddCustomerForm onSubmit={async (newCustomer) => {
                // ... existing customer add logic
              }} />
            </div>
          </div>
        </div>
      ) : (
        <TransactionPage customers={customers} />
      )}
    </div>
  );
}

export default App;