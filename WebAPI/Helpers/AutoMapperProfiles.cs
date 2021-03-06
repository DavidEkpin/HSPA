using AutoMapper;
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<User, LoginReqDto>().ReverseMap();
        }

    }
}
