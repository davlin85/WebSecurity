namespace StorageAPI.Models.Input
{
    public class MessageInput
    {
        private int _id;
        private string _userName;
        private string _date;
        private string _title;
        private string _content;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string UserName
        {
            get { return _userName; }
            set { _userName = value; }
        }

        public string Date
        {
            get { return _date; }
            set { _date = value; }
        }

        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }

        public string Content
        {
            get { return _content; }
            set { _content = value; }
        }
    }
}
