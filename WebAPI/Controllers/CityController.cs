
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;
using WebAPI.Helpers.ExtensionClass;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;  


        public CityController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        //Get api/city
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            
            var cities = await _unitOfWork.CityRepository.GetCitiesAsync();

            var citiesDto = _mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesDto);
        }
        //[HttpGet]
        //public async Task<IActionResult> GetCities ()
        //{
        //    var cities = await _unitOfWork.CityRepository.GetCitiesAsync();

        //    var citiesDto = from c in cities
        //                    select new CityDto() { 
        //                        Id = c.Id, 
        //                        Name = c.Name 
        //                    };
        //    return  Ok(citiesDto);
        //}

        //Get api/city
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCity(int id)
        {
            var city = await _unitOfWork.CityRepository.GetCityAsync(id);

           
            return Ok(city);
        }

        //Post api/city
        [HttpPost("add")]
        public async Task<IActionResult> AddCities(CityDto cityDto)
        {
            var city = _mapper.Map<City>(cityDto);

            _unitOfWork.CityRepository.AddCityAsync(city);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;

            await _unitOfWork.SaveAsync();

            return StatusCode(201);
        }

        //Put api/city
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCities(int id, CityDto cityDto)
        {
            var cityFrom = await _unitOfWork.CityRepository.GetCityAsync(id);

            if(id != cityDto.Id)
            {
                throw new Exception();
            }    
            if (cityFrom == null)
            {
                throw new KeyNotFoundException();
            }

           
                cityFrom.LastUpdatedBy = 1;
                cityFrom.LastUpdatedOn = DateTime.Now;

                _mapper.Map(cityDto, cityFrom);

                await _unitOfWork.SaveAsync();

                return StatusCode(200);
           
                  
        }

        //Patch api/city/update
        //Http pacth is shit, especially on .net core... 
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCitiesPatch (int id, JsonPatchDocument<City> cityToPatch)
        {
            var cityFrom = await _unitOfWork.CityRepository.GetCityAsync(id);
            cityFrom.LastUpdatedBy = 1;
            cityFrom.LastUpdatedOn = DateTime.Now;

            cityToPatch.ApplyTo(cityFrom, ModelState);
            await _unitOfWork.SaveAsync();

            return StatusCode(200);
        }

        //public async Task<IActionResult> AddCities(CityDto cityDto)
        //{
        //    var city = new City
        //    {
        //        Name = cityDto.Name,
        //        LastUpdatedBy = 1,
        //        LastUpdatedOn = DateTime.Now
        //    };

        //    _unitOfWork.CityRepository.AddCityAsync(city);
        //    await _unitOfWork.SaveAsync();

        //    return StatusCode(201);
        //}

        //Post api/city/addParam?cityName
        //[HttpPost("addParam")]
        //[HttpPost("addParam/{cityName}")]
        //public async Task<IActionResult> AddCities(string cityName)
        //{
        //    City city = new();
        //    city.Name = cityName;
        //    _cityRepository.AddCityAsync(city);
        //    await _cityRepository.SaveAsync();

        //    return Ok(city);
        //}


        //Post api/city
        [HttpDelete("delete/{id}")]
        public  async Task<IActionResult> DeleteCity(int id)
        {
            _unitOfWork.CityRepository.DeleteCity(id);
            await _unitOfWork.SaveAsync();
            
            return Ok("Deleted");
        }
    }
}
