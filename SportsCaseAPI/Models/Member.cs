using System.Collections.Generic;

namespace SportsCase.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public List<int> Sports { get; set; }
    }
}
