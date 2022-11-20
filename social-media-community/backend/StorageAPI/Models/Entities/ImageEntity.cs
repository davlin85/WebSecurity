using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StorageAPI.Models.Entities
{
    public class ImageEntity
    {
        public ImageEntity()
        {

        }

        public ImageEntity(string userName, string date, string title, string imageName)
        {
            UserName = userName;
            Date = date;
            Title = title;
            ImageName = imageName;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string ImageName { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }
    }
}
