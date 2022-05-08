using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Db.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _dataContext;

        public CityRepository(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public void AddCityAsync(City city)
        {
            _dataContext.Cities.AddAsync(city);
        }

        public void DeleteCity(int cityId)
        {
            var city =  _dataContext.Cities.Find(cityId);
            
            if(city != null)
            {
                _dataContext.Cities.Remove(city);
            }

        }

        public async Task<City?> GetCityAsync(int cityId)
        {   
            var city = await _dataContext.Cities.FindAsync(cityId);
            if( city != null)
            {
                return city;

            } else { return null; }
        }

        public async Task<City> UpdateCityAsync(int cityId)
        {
            var city = await _dataContext.Cities.FindAsync(cityId);

            if (city != null)
            {
                return city;

            }
            else { return null; }
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await _dataContext.Cities.ToListAsync();
        }

       
    }
}
