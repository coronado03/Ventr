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

        [HttpGet]
        public ActionResult<IEnumerable<ApplicationList>> GetApplicationList([FromQuery] string sortOrder = "desc")
        {
            IQueryable<ApplicationList> query = _context.ApplicationList;

            query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(app => app.ApplicationId) : query.OrderBy(app => app.ApplicationId);

            return query.ToList();
        }

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