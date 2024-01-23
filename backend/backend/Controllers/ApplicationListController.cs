using Microsoft.AspNetCore.Mvc;
using DotnetWebApiWithEFCodeFirst.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.Data.SqlClient;

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
        public ActionResult<IEnumerable<ApplicationList>> GetApplications([FromQuery] string? applicationId = null, string? companyName = null, string? stateOfApplication = null)
        {
            IQueryable<ApplicationList> query = _context.ApplicationList;

            if (!string.IsNullOrEmpty(applicationId))
            {
                query = applicationId == "desc"
                    ? query.OrderByDescending(a => a.ApplicationId)
                    : query.OrderBy(a => a.ApplicationId);
            }

            if (!string.IsNullOrEmpty(companyName))
            {
                query = companyName == "desc"
                    ? query.OrderByDescending(a => a.CompanyName)
                    : query.OrderBy(a => a.CompanyName);
            }

            if (!string.IsNullOrEmpty(stateOfApplication))
            {
                query = stateOfApplication == "desc"
                    ? query.OrderByDescending(a => a.StateOfApplication)
                    : query.OrderBy(a => a.StateOfApplication);
            }

            var result = query.ToList();

            if (result.Count == 0)
            {
                return NotFound();
            }

            return result;
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