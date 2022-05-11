using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DTO;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
  
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _unitofWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AccountController(IUnitOfWork unitofWork, IMapper mapper, IConfiguration configuration)
        {
            this._unitofWork = unitofWork;
            this._mapper = mapper;
            this._configuration = configuration;
        }

        //api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReqDto)
        {
            var user = await _unitofWork.UserRepository.Authenticate(loginReqDto.Username, loginReqDto.Password);
            
           
            if(user != null)
            {
                var loginResDto = new LoginResDto()
                {
                    Username = user.Username,
                    Token = CreateJWT(user)
                };
                return Ok(loginResDto);
            } else
            {
                return Unauthorized();
            }

        }

        private string CreateJWT (User user)
        {
            var secretKey = _configuration["AppSettings:Key"];

            var key = new SymmetricSecurityKey(Encoding.UTF32
                .GetBytes(secretKey));

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);
                

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = signingCredentials

            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateJwtSecurityToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}
