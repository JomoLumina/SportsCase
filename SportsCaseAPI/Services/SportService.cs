using System;
using System.Net;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using SportsCase.Interfaces;
using SportsCase.Models;
using Newtonsoft.Json;
using RestSharp;

namespace SportsCase.Services
{
    public class SportService : ISportService
    {
        private readonly ILogger<SportService> _logger;
        private readonly string _apiUrl;
        private readonly string endpoint;
        private readonly string contentType;

        public SportService(IConfiguration configuration, ILogger<SportService> logger)
        {
            _logger = logger;
            _apiUrl = configuration["ApiUrl"];
            endpoint = $"{_apiUrl}/sports";
            contentType = "application/json";
        }

        public Sport AddSport(Sport sport)
        {
            try
            {
                var client = new RestClient(endpoint);
                var request = new RestRequest(Method.PUT);
                request.AddHeader("Content-Type", contentType);
                var body = JsonConvert.SerializeObject(sport);
                request.AddParameter(contentType, body, ParameterType.RequestBody);
                
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    return JsonConvert.DeserializeObject<Sport>(response.Content);
                }
                else
                {
                    throw new Exception("Error adding a new sport, please try again");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        public Sport GetSport(int sportId)
        {
            try
            {
                List<Sport> sports = GetSports();
                foreach (Sport sport in sports)
                {
                    if (sport.Id == sportId)
                    {
                        return sport;
                    }
                }
                throw new Exception("Sport not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        public Sport UpdateSport(Sport sport)
        {
            try
            {
                var client = new RestClient(endpoint);
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", contentType);
                var body = JsonConvert.SerializeObject(sport);
                request.AddParameter(contentType, body, ParameterType.RequestBody);
               
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    return JsonConvert.DeserializeObject<Sport>(response.Content);
                }
                else
                {
                    throw new Exception("Error updating sport, please try again");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        public List<Sport> GetSports()
        {
            var client = new RestClient(endpoint);
            var request = new RestRequest(Method.GET);
            
            IRestResponse response = client.Execute(request);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                return JsonConvert.DeserializeObject<List<Sport>>(response.Content);
            }
            else
            {
                throw new Exception("No Sports found");
            }
        }
    }
}
