using Microsoft.AspNetCore.Mvc;
using DotnetWebApiWithEFCodeFirst.Models;
using Microsoft.AspNetCore.Cors;

namespace DotnetWebApiWithEFCodeFirst.Controllers
{
    [EnableCors("AllowAnyOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationListController : ControllerBase
    {
        private readonly DBContext _context;
        public ApplicationListController(DBContext context)
        {
            _context = context;
        }

        // GET: api/Customer
        [HttpGet]
        public ActionResult<IEnumerable<ApplicationList>> GetApplicationList()
        {
            return _context.ApplicationList.ToList();
        }

        // GET: api/Customer/1
        [HttpGet("{id}")]
        public ActionResult<ApplicationList> GetApplicationList(int id)
        {
            var customer = _context.ApplicationList.Find(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }

        // POST: api/Customer
        [HttpPost]
        public ActionResult<ApplicationList> CreateCustomer(ApplicationList ApplicationList)
        {
            if (ApplicationList == null)
            {
                return BadRequest();
            }
            _context.ApplicationList.Add(ApplicationList);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetApplicationList), new { id = ApplicationList.ApplicationId }, ApplicationList);
        }
    }
}