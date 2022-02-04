using HPReports.Service.Setup;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace HPReports.Api.Securities
{
    public class AuthServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            ClaimsIdentity identity = new ClaimsIdentity(context.Options.AuthenticationType);
            try
            {
                using (var service = new CredentialService())
                {
                    var user = service.Login(context.UserName, context.Password);
                    identity.AddClaim(new Claim(ClaimTypes.Role, user.UType));
                    identity.AddClaim(new Claim(ClaimTypes.GivenName, user.FName));
                    identity.AddClaim(new Claim(ClaimTypes.Name, user.EmpName));
                    identity.AddClaim(new Claim(ClaimTypes.Sid, user.EmpID));
                    identity.AddClaim(new Claim("Dept", user.Dept));
                    identity.AddClaim(new Claim("DeptCode", user.DeptCode.ToString()));
                    identity.AddClaim(new Claim("SecCode", user.SecCode.ToString()));
                    identity.AddClaim(new Claim("WhsCode", user.WhsCode));
                    identity.AddClaim(new Claim("UType", user.UType));
                    context.Validated(identity);
                }
            }
            catch (Exception ex)
            {
                context.SetError("invalid_grant", ex.Message);
                return;
            }
        }
    }
}