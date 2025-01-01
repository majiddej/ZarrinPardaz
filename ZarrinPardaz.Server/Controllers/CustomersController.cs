using Microsoft.AspNetCore.Mvc;
using ZarrinPardaz.Application;
using ZarrinPardaz.Domain;

namespace ZarrinPardaz.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomersController : ControllerBase
    {

        private readonly ILogger<Customer> _logger;
        private readonly ICustomerService _customerService;

        public CustomersController(ILogger<Customer> logger, ICustomerService customerService)
        {
            _logger = logger;
            _customerService = customerService;
        }

        [HttpGet]
        public IEnumerable<Customer> GetCustomers()
        {
            return _customerService.GetCustomers();
        }
        [HttpPost]
        public IActionResult SaveCustomer([FromBody] Customer customer)
        {
            if (customer == null || string.IsNullOrEmpty(customer.Name))
            {
                return BadRequest("Customer data is invalid.");
            }

            _customerService.SaveCustomer(customer);
            return CreatedAtAction(nameof(GetCustomers), new { id = customer.Id }, customer);
        }
    }
}
