namespace ZarrinPardaz.Application
{
    using System.Collections.Generic;
    using ZarrinPardaz.Domain;

    public class CustomerService : ICustomerService
    {
        private readonly List<Customer> _customers = new()
        {
            new Customer
            {
                Id = 1,
                Name = "John Doe",
                Email = "john.doe@example.com",
                Phone = "123-456-7890",
                Address = "123 Main St, Springfield, USA"
            },
            new Customer
            {
                Id = 2,
                Name = "Jane Smith",
                Email = "jane.smith@example.com",
                Phone = "987-654-3210",
                Address = "456 Elm St, Springfield, USA"
            }
        };
        public List<Customer> GetCustomers()
        {
            return _customers;
        }
        public void SaveCustomer(Customer customer)
        {
            // Simulating saving the customer
            customer.Id = _customers.Count + 1; // Auto-generate a new ID
            _customers.Add(customer);
        }
    }


}
