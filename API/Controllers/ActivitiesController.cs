
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Activity model)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity = model}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Activity model)
        {
            model.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = model}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}