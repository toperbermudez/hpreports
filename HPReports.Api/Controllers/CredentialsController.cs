using HPReports.Models.Setup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Web.Http;

namespace HPReports.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/currentuser")]
    public class CredentialsController : ApiController
    {
        [HttpGet]
        [Route("info")]
        public IHttpActionResult GetInfo()
        {
            //Get the current claims principal
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
            // Get the claims values
            var model = new CurrentUser();
            model.EmpID = identity.Claims.Where(c => c.Type == ClaimTypes.Sid)
                               .Select(c => c.Value).SingleOrDefault();
            model.EmpName = identity.Claims.Where(c => c.Type == ClaimTypes.Name)
                               .Select(c => c.Value).SingleOrDefault();
            model.FName = identity.Claims.Where(c => c.Type == ClaimTypes.GivenName)
                               .Select(c => c.Value).SingleOrDefault();
            model.UType = identity.Claims.Where(c => c.Type == ClaimTypes.Role)
                               .Select(c => c.Value).SingleOrDefault();
            model.Dept = identity.Claims.Where(x => x.Type == "Dept").Select(x => x.Value).SingleOrDefault();
            model.WhsCode = identity.Claims.Where(x => x.Type == "WhsCode").Select(x => x.Value).SingleOrDefault();
            model.DeptCode = Convert.ToInt32(identity.Claims.Where(x => x.Type == "DeptCode").Select(x => x.Value).SingleOrDefault());
            model.SecCode = Convert.ToInt32(identity.Claims.Where(x => x.Type == "SecCode").Select(x => x.Value).SingleOrDefault());
            return Ok(model);
        }
    }
}
