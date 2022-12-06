using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Trending_News.Models;
using Newtonsoft.Json;
using System.IO;
using System.Net;
using Google.Apis.Auth.OAuth2;

namespace Trending_News.Controllers
{
  [Route("api/[Controller]")]

  public class AuthController : Controller
  {
    private static List<UserInfo> UserList = new List<UserInfo>();
    public TrendingNewsContext Context { get; set; }

    private readonly ApplicationSettings _applicationSettings;

    public AuthController(IOptions<ApplicationSettings> _applicationSettings, TrendingNewsContext _Context)
    {
      this.Context = _Context;
      this._applicationSettings = _applicationSettings.Value;

    }


   
    [HttpPost("Login")]
    public IActionResult Login([FromBody] Login model)
    {
      var user = Context.UserInfos.Where(x => x.UserName == model.UserName).FirstOrDefault();
     // var user = UserList.Where(x => x.UserName == model.UserName).FirstOrDefault();
      if (user == null)
      {
        return BadRequest("Username Or Password Was Invalid");
      }

      var match = CheckPassword(model.Password, user);

      if (!match)
      {
        return BadRequest("Username Or Password Was Invalid");
      }



      return Ok(JWTGenerator(user));
    }

    [AllowAnonymous]
    [HttpGet("google")]
    public async Task<IActionResult> Google(string code,int state)
    {
      var settings = new GoogleJsonWebSignature.ValidationSettings()
      {
        Audience = new List<string> { this._applicationSettings.GoogleClientId }
      };

      var payload = await GoogleJsonWebSignature.ValidateAsync(code, settings);

      return Ok();

    }


    [HttpPost("LoginWithGoogle")]
    public async Task<IActionResult> LoginWithGoogle([FromBody] string credential)
    {
      var settings = new GoogleJsonWebSignature.ValidationSettings()
      {
        Audience = new List<string> { this._applicationSettings.GoogleClientId }
      };

      var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);

      if (payload == null) return BadRequest();

      // var user = Context.UserInfos.Select(x => x.Email == payload.Email || x.UserName == payload.Name).FirstOrDefault();
      var user = Context.UserInfos.Where(x => x.UserName == payload.Email).FirstOrDefault();

      if (user != null) return Ok(JWTGenerator(user));

      var newUser = new UserInfo { UserName = payload.Email ,Email= payload.Email, Name= payload .Name,Picture= payload.Picture};
      using (HMACSHA512? hmac = new HMACSHA512())
      {
        newUser.PasswordSalt = hmac.Key;
        newUser.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(""));
      }
      Context.Add(newUser);
      Context.SaveChanges();

      var newuser = Context.UserInfos.Where(x => x.UserName == payload.Email).FirstOrDefault();

      if (newuser != null)
      {
        return Ok(JWTGenerator(newuser));
      }
      else
      {
        return BadRequest();
      }
    }

    //[AllowAnonymous]
    //[HttpGet("LoginWithGoogle")]
    //public async Task<IActionResult> Authenticate([FromHeader] object data)
    //{
    //  try

    //  {

    //    var url = "";
    //    //Request.Url.Query;

    //    if (url != "")

    //    {

    //      string queryString = url.ToString();

    //      char[] delimiterChars = { '=' };

    //      string[] words = queryString.Split(delimiterChars);

    //      string code = words[1];



    //      if (code != null)

    //      {

    //        //get the access token

    //        HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create("https://accounts.google.com/o/oauth2/token");

    //        webRequest.Method = "POST";

    //        var Parameters = "code=" + code + "&client_id=" + _applicationSettings.GoogleClientId + "&client_secret=" + _applicationSettings.Googleclient_secret + "&redirect_uri=" + _applicationSettings.redirect_uris + "&grant_type=authorization_code";

    //        byte[] byteArray = Encoding.UTF8.GetBytes(Parameters);


    //        webRequest.ContentType = "application/x-www-form-urlencoded";

    //        webRequest.ContentLength = byteArray.Length;

    //        Stream postStream = webRequest.GetRequestStream();

    //        // Add the post data to the web request

    //        postStream.Write(byteArray, 0, byteArray.Length);

    //        postStream.Close();

    //        WebResponse response = webRequest.GetResponse();

    //        postStream = response.GetResponseStream();

    //        StreamReader reader = new StreamReader(postStream);

    //        string responseFromServer = reader.ReadToEnd();

    //        GoogleAccessToken serStatus = JsonConvert.DeserializeObject<GoogleAccessToken>(responseFromServer);

    //        if (serStatus != null)

    //        {

    //          string accessToken = string.Empty;

    //          accessToken = serStatus.access_token;

    //         // Session["Token"] = accessToken;

    //          if (!string.IsNullOrEmpty(accessToken))

    //          {

    //            //call get user information function with access token as parameter

    //          }

    //        }

    //      }

    //    }

    //  }

    //  catch (Exception ex)

    //  {

    //    return RedirectToAction("Index", "Home");

    //  }
    //  return Ok();
    //}


    [HttpGet("LoginWithGoogle3")]
    [AllowAnonymous]
    public async Task<IActionResult> VerifyGoogleToken(string state,string access_token,string scope)
    {
      try
      {
    
        return null;
      }
      catch (Exception ex)
      {
        //log an exception
        return null;
      }
    }

    [HttpGet("LoginWithGoogle1")]
    [AllowAnonymous]
    public void LoginWithGoogleGet
      (string returnUrl=null,string remoteError=null)
    {
      //string credential=null;

      


      //var settings = new GoogleJsonWebSignature.ValidationSettings()
      //{
      //  Audience = new List<string> { this._applicationSettings.GoogleClientId }
      //};

      //var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);


      //var user = Context.UserInfos.Select(x => x.Email == payload.Email || x.UserName == payload.Name).FirstOrDefault();

      //if (payload != null && user == null)
      //{
      //  var newUser = new UserInfo { UserName = payload.Email };
      //  using (HMACSHA512? hmac = new HMACSHA512())
      //  {
      //    newUser.PasswordSalt = hmac.Key;
      //    newUser.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(""));
      //  }
      //  Context.Add(user);
      //  Context.SaveChanges();
      //  //UserList.Add(newUser);
      //}

      //var newuser = Context.UserInfos.Where(x => x.Email == payload.Email || x.UserName == payload.Name).FirstOrDefault();

      //if (newuser != null)
      //{
      //  return Ok(JWTGenerator(newuser));
      //}
      //else
      //{
      //  return BadRequest();
      //}
    }


    private dynamic JWTGenerator(UserInfo user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(this._applicationSettings.Secret);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
        { new Claim(ClaimTypes.Name, user.UserName ?? ""),
          new Claim (ClaimTypes.Surname,user.Name ?? "" ),
          new Claim (ClaimTypes.Email, ""),
          new Claim(ClaimTypes.Uri, "profile.png") }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
      };


      var token = tokenHandler.CreateToken(tokenDescriptor);
      var encrypterToken = tokenHandler.WriteToken(token);

      HttpContext.Response.Cookies.Append("token", encrypterToken,
           new CookieOptions
           {
             Expires = DateTime.Now.AddDays(7),
             HttpOnly = true,
             Secure = true,
             IsEssential = true,
             SameSite = SameSiteMode.None
           });

      return new { token = encrypterToken, username = user.UserName };
    }

    private bool CheckPassword(string password, UserInfo user)
    {
      bool result;

      using (HMACSHA512? hmac = new HMACSHA512(user.PasswordSalt))
      {
        var compute = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        result = compute.SequenceEqual(user.PasswordHash);
      }

      return result;
    }

    [HttpPost("Register")]
    public IActionResult Register([FromBody] Register model)
    {
      var user = new UserInfo { UserName = model.UserName };

      if (model.ConfirmPassword == model.Password)
      {
        using (HMACSHA512? hmac = new HMACSHA512())
        {
          user.PasswordSalt = hmac.Key;
          user.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(model.Password));
        }
      }
      else
      {
        return BadRequest("Passwords Dont Match");
      }

      //UserList.Add(user);
      Context.Add(user);
      Context.SaveChanges();

      return Ok(user);
    }
    [HttpGet]
    public IActionResult Index()
    {
      // return new ObjectResult(Context.Login.Select(p => new { p.UserName, p.Password, p.id }).ToList());
      return new ObjectResult(Context.Logins.ToList());
    }







  }



  public class AppSettings
  {
    public string Secret { get; set; }
    public string GoogleClientId { get; set; }
  }




}

