using Microsoft.EntityFrameworkCore;
using StorageAPI.Models.Entities;

namespace StorageAPI.Data
{
    public class DataContext: DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public virtual DbSet<MessageEntity> Messages { get; set; }
        public virtual DbSet<ImageEntity> Images { get; set; }
    }
}
