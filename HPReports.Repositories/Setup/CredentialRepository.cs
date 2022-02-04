using Dapper;
using HPReports.Models.Setup;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HPReports.Repositories.Setup 
{
    public class CredentialRepository
    {
        private readonly IDbConnection _connection;
        private readonly IDbTransaction _transaction;

        public CredentialRepository(IDbConnection connection, IDbTransaction transaction)
        {
            _connection = connection;
            _transaction = transaction;
        }

        public CurrentUser Login(string userId, string passWord)
        {
            var query = @"HPCOMMON.dbo.UserLogin2";
            var output = _connection.QueryFirst<CurrentUser>(query, new { UserName = userId, Password = passWord }, transaction: _transaction, commandType: CommandType.StoredProcedure);
            return output;
        }
    }
}
