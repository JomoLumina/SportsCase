using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using SportsCase.Interfaces;
using SportsCase.Models;
using Newtonsoft.Json;
using RestSharp;
using System.Net;

namespace SportsCase.Services
{
    public class MemberService : IMemberService
    {
        private readonly ILogger<MemberService> _logger;
        private readonly string _apiUrl;
        private readonly string endpoint;
        private readonly string contentType;

        public MemberService(IConfiguration configuration, ILogger<MemberService> logger)
        {
            _logger = logger;
            _apiUrl = configuration["ApiUrl"];
            endpoint = $"{_apiUrl}/members";
            contentType = "application/json";
        }

        public Member AddMember(Member member)
        {
            try
            {
                var client = new RestClient(endpoint);
                var request = new RestRequest(Method.PUT);
                request.AddHeader("Content-Type", contentType);
                var body = JsonConvert.SerializeObject(member);
                request.AddParameter(contentType, body, ParameterType.RequestBody);
                
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    return JsonConvert.DeserializeObject<Member>(response.Content);
                }
                else
                {
                    throw new Exception("Error adding a new member, please try again");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        public Member GetMember(int memberId)
        {
            try
            {
                List<Member> members = GetMembers();
                foreach (Member member in members)
                {
                    if (member.Id == memberId)
                    {
                        return member;
                    }
                }

                throw new Exception("Member not found");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        public Member UpdateMember(Member member)
        {
            try
            {
                var client = new RestClient(endpoint);
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", contentType);
                var body = JsonConvert.SerializeObject(member);
                request.AddParameter(contentType, body, ParameterType.RequestBody);
                
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    return JsonConvert.DeserializeObject<Member>(response.Content);
                }
                else
                {
                    throw new Exception("Error updating member, please try again");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        public List<Member> GetMembers()
        {
            try
            {
                var client = new RestClient(endpoint);
                var request = new RestRequest(Method.GET);
                
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    return JsonConvert.DeserializeObject<List<Member>>(response.Content);
                }
                else
                {
                    throw new Exception("No Members found");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }
    }
}
