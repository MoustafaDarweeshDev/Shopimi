using API.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        protected async Task<ActionResult> CreatedPagedResault<T>(IGenericRepostiory<T> repo, ISpecification<T> spec, int pageIndex, int pageSize) where T : BaseEntity
        {
            var data = await repo.ListAllWithSpec(spec);
            var count = await repo.GetCountAsync(spec);
            var pagination = new Pagination<T>(pageIndex, pageSize, count , data);

            return Ok(pagination);
        }
    }
}
