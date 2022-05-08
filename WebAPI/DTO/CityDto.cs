using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class CityDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Try dey put name for your entry")]
        [StringLength(50,MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage ="Numbers are not allowed")]
        public string Name { get; set; }
    }
}
