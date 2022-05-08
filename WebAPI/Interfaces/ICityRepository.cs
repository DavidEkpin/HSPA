using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();
        void DeleteCity(int cityId);
        void AddCityAsync(City city);
        Task<City?> GetCityAsync(int cityId);
        Task<City> UpdateCityAsync(int cityId);
    }
}
