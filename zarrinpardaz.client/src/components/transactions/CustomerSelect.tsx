import React from 'react';
import { Customer } from '../../types/customer';
import { SearchableSelect } from './SearchableSelect';

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
  const customerOptions = customers.map(customer => ({
    id: customer.id,
    label: customer.name
  }));

  return (
    <SearchableSelect
      options={customerOptions}
      value={selectedCustomerId}
      onChange={onChange}
      label="انتخاب مشتری"
      placeholder="نام مشتری را جستجو کنید..."
    />
  );
};