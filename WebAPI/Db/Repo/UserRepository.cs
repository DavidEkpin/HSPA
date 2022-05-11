using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Db.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public async Task<User> Authenticate(string userName, string password)
        {
            var user =  await _dataContext.Users.FirstOrDefaultAsync(u => u.Username == userName && u.Password == password);

            return user;
        }
    }
}
