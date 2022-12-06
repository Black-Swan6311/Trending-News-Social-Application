using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Trending_News.Models
{
  public class Login
  {
    public int id { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }

    [ForeignKey("ProductGroup")]
    public int RegisterId { get; set; }
    public Register Register { get; set; }


  }
  public class ExternalAuthDto
  {
    public string? Provider { get; set; }
    public string? IdToken { get; set; }
  }
  public class AuthenticateRequest
  {
    [Required]
    public string IdToken { get; set; }
  }

  public class GoogleAccessToken

  {

    public string access_token { get; set; }

    public string token_type { get; set; }

    public int expires_in { get; set; }

    public string id_token { get; set; }

    public string refresh_token { get; set; }

  }


  public class UserView
  {
    public string tokenId { get; set; }
  }
  public class GoogleUserOutputData

  {

    public string id { get; set; }

    public string name { get; set; }

    public string given_name { get; set; }

    public string email { get; set; }

    public string picture { get; set; }

  }

}
