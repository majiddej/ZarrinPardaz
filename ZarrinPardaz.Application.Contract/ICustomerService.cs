using ZarrinPardaz.Domain;

namespace ZarrinPardaz.Application
{
    public interface ICustomerService
    {
        List<Customer> GetCustomers();
        void SaveCustomer(Customer customer);

    }
}