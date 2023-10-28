using Microsoft.EntityFrameworkCore;


namespace DotnetWebApiWithEFCodeFirst.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationList> ApplicationList { get; set; }
    }
}