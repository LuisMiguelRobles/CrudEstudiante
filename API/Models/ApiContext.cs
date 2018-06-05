using Microsoft.EntityFrameworkCore;
namespace API.Models
{
    public class ApiContext : DbContext{

        public ApiContext(DbContextOptions<ApiContext> options): base(options){}
        
        public DbSet<Student> Students { get; set; }
       
    }
}
