
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAll()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Get(Guid id)
        {
            return await Mediator.Send(new Detail.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult> Create(Activity model)
        {
            await Mediator.Send(new Create.Command{Activity = model});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(Guid id, Activity model)
        {
            model.Id = id;
            await Mediator.Send(new Edit.Command{Activity = model});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}