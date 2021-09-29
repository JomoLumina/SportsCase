using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SportsCase.Interfaces;
using SportsCase.Models;

namespace SportsCase.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SportsController : ControllerBase
    {
        private readonly ISportService _sportService;
        private readonly string apiUrl;

        public SportsController(IConfiguration configuration, ISportService sportService)
        {
            apiUrl = configuration["ApiUrl"];
            _sportService = sportService;
        }

        [HttpGet]
        [Route("id/{id}")]
        public IActionResult GetSport(int id)
        {

            try
            {
                return Ok(_sportService.GetSport(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetSports()
        {

            try
            {
                return Ok(_sportService.GetSports());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult AddSport([FromBody] Sport model)
        {

            try
            {
                return Created($"{apiUrl}/sports",_sportService.AddSport(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult UpdateSport([FromBody] Sport model)
        {

            try
            {
                return Ok(_sportService.UpdateSport(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
