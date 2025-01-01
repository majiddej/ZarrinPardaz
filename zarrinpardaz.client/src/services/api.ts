import { Customer, NewCustomer } from '../types/customer';

const API_BASE_URL = 'https://localhost:7180'; // Replace with your actual API URL

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_BASE_URL}/customers`);
  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }
    //var t = response.json();
    return await response.json();
};

export const addCustomer = async (customer: NewCustomer): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });
  if (!response.ok) {
    throw new Error('Failed to add customer');
  }
  return await response.json();
};