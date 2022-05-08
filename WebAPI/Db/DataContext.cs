

using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Db
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) 
        {

        }

        public DbSet<City> Cities { get; set; }

    }
}
