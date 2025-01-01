import React from 'react';
import { Customer } from '../types/customer';
import { Table } from 'lucide-react';
import Lottie from 'lottie-react';
import usersAnimation from './animations/users.json';

interface CustomerGridProps {
  customers: Customer[];
}

export const CustomerGrid: React.FC<CustomerGridProps> = ({ customers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Table className="w-5 h-5" />
              <h2 className="text-xl font-semibold">لیست مشتریان</h2>
              <Lottie animationData={usersAnimation} loop={true} />

      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">نام</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">ایمیل</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">تلفن</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">آدرس</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};