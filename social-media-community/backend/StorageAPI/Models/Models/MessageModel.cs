namespace StorageAPI.Models.Models
{
    public class MessageModel
    {
        public MessageModel()
        {
        }

        public MessageModel(int id, string userName, string date, string title, string content)
        {
            Id = id;
            UserName = userName;
            Date = date;
            Title = title;
            Content = content;
        }

        public int Id { get; set; }
        public string UserName { get; set; }    
        public string Date { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
