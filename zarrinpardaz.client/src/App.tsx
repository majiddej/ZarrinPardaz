import React, { useEffect, useState } from 'react';
import { Customer } from './types/customer';
import { fetchCustomers } from './services/api';
import { CustomerGrid } from './components/CustomerGrid';
import { AddCustomerForm } from './components/AddCustomerForm';
import { TransactionPage } from './pages/TransactionPage';
import { TransactionReportPage } from './pages/TransactionReportPage';
import { Header } from './components/layout/Header';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<'customers' | 'transactions' | 'reports'>('customers');

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
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {currentPage === 'customers' && (
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
      )}
      
      {currentPage === 'transactions' && (
        <TransactionPage customers={customers} />
      )}

      {currentPage === 'reports' && (
        <TransactionReportPage customers={customers} />
      )}
    </div>
  );
}

export default App;