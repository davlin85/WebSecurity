using System.ComponentModel.DataAnnotations;

namespace StorageAPI.Models.Entities
{
    public class MessageEntity
    {
        public MessageEntity(string userName, string date, string title, string content)
        {
            UserName = userName;
            Date = date;
            Title = title;
            Content = content;
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
        public string Content { get; set; }

    }
}
