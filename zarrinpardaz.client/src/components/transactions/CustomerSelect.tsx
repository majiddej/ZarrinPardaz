import React from 'react';
import { Customer } from '../../types/customer';

interface CustomerSelectProps {
  customers: Customer[];
  selectedCustomerId: number | '';
  onChange: (customerId: number) => void;
}

export const CustomerSelect: React.FC<CustomerSelectProps> = ({
  customers,
  selectedCustomerId,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        انتخاب مشتری
      </label>
      <select
        value={selectedCustomerId}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      >
        <option value="">انتخاب کنید</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>
  );
};