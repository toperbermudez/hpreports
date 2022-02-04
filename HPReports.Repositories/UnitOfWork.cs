using HPReports.Repositories.Setup;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HPReports.Repositories
{
    public class UnitOfWork : IDisposable
    {
        private readonly IDbConnection _connection;
        private IDbTransaction _transaction;
        private string connectionString = "Data Source=_SERVER;Initial Catalog=_DB;Integrated Security=False;UID=_UID;PWD=_PWD; Application Name=SAPB1Integration";

        public Setup.CredentialRepository Credentials { get; set; }

        public UnitOfWork(string server = Config.Server, string database = Config.Database, string userId = Config.UserId, string passWord = Config.PassWord)
        {
            connectionString = connectionString.Replace("_SERVER", server);
            connectionString = connectionString.Replace("_DB", database);
            connectionString = connectionString.Replace("_UID", userId);
            connectionString = connectionString.Replace("_PWD", passWord);

            _connection = new SqlConnection(connectionString);
            _connection.Open();

            _transaction = _connection.BeginTransaction();

            //SETUP
            Credentials = new CredentialRepository(_connection, _transaction);
        }

        public void Commit()
        {
            _transaction.Commit();
        }

        public void Rollback()
        {
            _transaction.Rollback();
        }

        public void Dispose()
        {
            _transaction.Dispose();
            _connection.Dispose();
        }
    }
}
