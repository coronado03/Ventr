using Microsoft.AspNetCore.Mvc;
using DotnetWebApiWithEFCodeFirst.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Xml.Linq;

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
        public ActionResult<IEnumerable<ApplicationList>> GetApplications([FromQuery] string? applicationId = null, string? companyName = null, 
            string? jobRole = null, string? sourceLinks = null, string? stateOfApplication = null, string? comments = null, string? applicationDate = null)
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

            if (!string.IsNullOrEmpty(applicationDate))
            {
                query = applicationDate == "desc"
                    ? query.OrderByDescending(a => a.ApplicationDate)
                    : query.OrderBy(a => a.ApplicationDate);
            }


            if (!string.IsNullOrEmpty(jobRole))
            {
                query = jobRole == "desc"
                    ? query.OrderByDescending(a => a.JobRole)
                    : query.OrderBy(a => a.JobRole);
            }

            if (!string.IsNullOrEmpty(sourceLinks))
            {
                query = sourceLinks == "desc"
                    ? query.OrderByDescending(a => a.SourceLinks)
                    : query.OrderBy(a => a.SourceLinks);
            }

            if (!string.IsNullOrEmpty(comments))
            {
                query = comments == "desc"
                    ? query.OrderByDescending(a => a.Comments.Length)
                    : query.OrderBy(a => a.Comments.Length);
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