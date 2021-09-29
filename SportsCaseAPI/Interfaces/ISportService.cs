using RestSharp;
using SportsCase.Models;
using System.Collections.Generic;

namespace SportsCase.Interfaces
{
    public interface ISportService
    {
        Sport AddSport(Sport sport);
        List<Sport> GetSports();
        Sport GetSport(int sportId);
        Sport UpdateSport(Sport sport);
    }
}
