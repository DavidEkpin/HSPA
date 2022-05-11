using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class LoginReqDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
