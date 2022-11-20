using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using StorageAPI.Data;
using StorageAPI.Models.Entities;
using StorageAPI.Models.Input;
using StorageAPI.Models.Models;

namespace StorageAPI.Controllers
{
    [ApiController]
    [Authorize]
    public class MessageController : Controller
    {
        private readonly DataContext _context;

        public MessageController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/get-all-messages")]
        public async Task<ActionResult<IEnumerable<MessageModel>>> GetMessages()
        {

            var messages = new List<MessageModel>();

            foreach (var message in await _context.Messages.ToListAsync())

                messages.Add(new MessageModel(
                    message.Id,
                    message.UserName,
                    message.Date,
                    message.Title,
                    message.Content));

            return messages;
       
        }

        [HttpGet]
        [Route("/get-message-by-id/{id}")]
        public async Task<ActionResult<MessageModel>> GetMessage(int id)
        {
            var messageEntity = await _context.Messages.FirstOrDefaultAsync(x => x.Id == id);

            if(messageEntity == null)
            {
                return NotFound("Message doesn't exist!");
            }

            return new MessageModel(
                messageEntity.Id,
                messageEntity.UserName,
                messageEntity.Date,
                messageEntity.Title,
                messageEntity.Content);
        }

        [HttpPut]
        [Route("/update-message/{id}")]
        public async Task<ActionResult<MessageModel>> UpdateMessage(int id, MessageInput model)
        {
            if (id != model.Id)
            {
                return BadRequest("Message doesn't exist!");
            }

            var messageEntity = await _context.Messages
                .FindAsync(model.Id);

            messageEntity.UserName = model.UserName;
            messageEntity.Date = model.Date;
            messageEntity.Title = model.Title;
            messageEntity.Content = model.Content;

            _context.Entry(messageEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!MessageEntityExists(id))
                {
                    return NotFound("Something went wrong!");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Message is Updated!");
        }

        private bool MessageEntityExists(int id)
        {
            return _context.Messages.Any(m => m.Id == id);
        }

        [HttpPost]
        [Route("/post-message")]
        public async Task<ActionResult<MessageModel>> PostMessage(MessageInput model)
        {
            var messageEntity = new MessageEntity(
                model.UserName,
                model.Date,
                model.Title,
                model.Content);

            _context.Messages.Add(messageEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessage", new { id = messageEntity.Id },
                new MessageModel(
                    messageEntity.Id,
                    messageEntity.UserName,
                    messageEntity.Date,
                    messageEntity.Title,
                    messageEntity.Content));

        }

        [HttpDelete]
        [Route("/delete-message/{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var messageEntity = await _context.Messages.FindAsync(id);

            if (messageEntity == null)
            {
                return NotFound("Message doesn't exist!");
            }

            _context.Messages.Remove(messageEntity);
            await _context.SaveChangesAsync();

            return Ok("Message is Deleted!");
        }
    }
}
