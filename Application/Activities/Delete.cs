using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Hanlder : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Hanlder(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activites.FindAsync(request.Id);
                _context.Activites.Remove(activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}