using HPReports.Models.Setup;
using HPReports.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HPReports.Service.Setup
{
    public class CredentialService : IDisposable
    {
        private readonly UnitOfWork _work;

        public CredentialService()
        { 
            _work = new UnitOfWork();
        }

        public CurrentUser Login(string userId, string passWord)
        {
            return _work.Credentials.Login(userId, passWord);
        }

        public void Dispose()
        {
            _work.Dispose();
        }
    }
}
