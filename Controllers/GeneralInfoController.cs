using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Trending_News.Models;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

namespace Trending_News.Controllers
{
  [Authorize]
  [ApiController]
  public class GeneralInfoController : Controller
  {
    public TrendingNewsContext Context { get; set; }
    public GeneralInfoController(TrendingNewsContext _Context)
    {
      this.Context = _Context;
      

    }
    [HttpGet("GetInfo")]
    public IActionResult GetInfo()
    {
      try
      {
        // Get the claims values
        var claims = User.Claims;
        var username = claims.Where(c => c.Type == ClaimTypes.Name)
                           .Select(c => c.Value).SingleOrDefault();

        var name = claims.Where(c => c.Type == ClaimTypes.Surname)
                         .Select(c => c.Value).SingleOrDefault();

        var email = claims.Where(c => c.Type == ClaimTypes.Email)
                           .Select(c => c.Value).SingleOrDefault();

        var profileImg = claims.Where(c => c.Type == ClaimTypes.Uri)
                         .Select(c => c.Value).SingleOrDefault();



        var finduser = Context.UserInfos.FirstOrDefault(x => x.Email == username);

        return Ok(new UpdateUserInfoViewModel
        {
          email= username,
          username= username,
          firstName= finduser.Name,
          lastName= finduser.Name,
          aboutme=name,
          country="test",
          address="test",
          pic= finduser.Picture,
          city="test",
          company="test",
          zip = "test"




        });
       




      }
      catch (Exception ex)
      {

        throw;
      }
    }

    [HttpPost("UpdateUserInfo")]
    public IActionResult UpdateUserInfo([FromBody] UpdateUserInfoViewModel model)
    {
      try
      {
        // Get the claims values

        var finduser = Context.UserInfos.FirstOrDefault(x => x.Email == model.email);
        if (finduser != null)
        {
         // finduser.Name = model.firstName + " " + model.lastName;
          finduser.Name = model.firstName ;
          finduser.Email = model.email;
          Context.UserInfos.Update(finduser);
          Context.SaveChanges();
          return Ok(model);
        }

        return NotFound();

      }
      catch (Exception ex)
      {

        return BadRequest(); 
      }
    }
  }
}
