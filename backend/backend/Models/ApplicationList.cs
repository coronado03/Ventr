using System.ComponentModel.DataAnnotations;

namespace DotnetWebApiWithEFCodeFirst.Models
{
    public class ApplicationList
    {
       [Key]
       public int ApplicationId { get; set; }

        public string CompanyName { get; set; }

        public string JobRole { get; set; }

        public string JobSource { get; set; }

        public string SourceLinks { get; set; } 
        public DateTime ApplicationDate { get; set; }

        public string StateOfApplication { get; set; }

        public string Comments { get; set; }

    }
}