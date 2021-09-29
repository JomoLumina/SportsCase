using Microsoft.AspNetCore.Mvc;

namespace SportsCase.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppController : ControllerBase
    {
        public AppController(){}

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("SportsCase API running");
        }
    }
}
