using RestSharp;
using SportsCase.Models;
using System.Collections.Generic;

namespace SportsCase.Interfaces
{
    public interface IMemberService
    {
        Member AddMember(Member member);
        List<Member> GetMembers();
        Member GetMember(int memberId);
        Member UpdateMember(Member member);
    }
}
