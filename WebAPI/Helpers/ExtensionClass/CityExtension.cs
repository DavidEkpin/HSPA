using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Helpers.ExtensionClass
{
    static class CityExtention
    {
        public static CityDto ToCityDto(this City city)
        {
            return new CityDto
            {
                Id = city.Id,
                Name = city.Name,

            };
        }

        public static City ToCity(this CityDto cityDto)
        {
            return new City
            {
                Id = cityDto.Id,
                Name = cityDto.Name,
            };
        }
    }
}
