using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SportsCase.Interfaces;
using SportsCase.Models;

namespace SportsCase.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly string apiUrl;

        public MembersController(IConfiguration configuration, IMemberService memberService)
        {
            apiUrl = configuration["ApiUrl"];
            _memberService = memberService;
        }

        [HttpGet]
        [Route("id/{id}")]
        public IActionResult GetMember(int id)
        {

            try
            {
                return Ok(_memberService.GetMember(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetMembers()
        {

            try
            {
                try
                {
                    return Ok(_memberService.GetMembers());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult AddMember([FromBody] Member model)
        {

            try
            {
                return Created($"{apiUrl}/members", _memberService.AddMember(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult UpdateMember([FromBody] Member model)
        {

            try
            {
                return Ok(_memberService.UpdateMember(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
