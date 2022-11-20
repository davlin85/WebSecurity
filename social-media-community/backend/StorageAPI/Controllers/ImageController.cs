using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StorageAPI.Data;
using StorageAPI.Models.Entities;
using StorageAPI.Models.Input;
using StorageAPI.Models.Models;

namespace StorageAPI.Controllers
{
    [ApiController]
    [Authorize]
    public class ImageController : ControllerBase
    {
        private readonly DataContext _context;

        private readonly IWebHostEnvironment _hostEnvironment;

        public ImageController(DataContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        [Route("/get-all-images")]
        public async Task<ActionResult<IEnumerable<ImageEntity>>> GetImages()
        {
            return await _context.Images
                .Select(x => new ImageEntity() { 
                    Id = x.Id,
                    UserName = x.UserName,
                    Date = x.Date,
                    Title = x.Title,
                    ImageName = x.ImageName,
                    ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                    })
                    .ToListAsync();
        }

        [HttpGet]
        [Route("/get-image-by-id/{id}")]
        public async Task<ActionResult<ImageEntity>> GetImage(int id)
        {

            var imageEntity = await _context.Images
                          .Select(x => new ImageEntity() {
                              Id = x.Id,
                              UserName = x.UserName,
                              Date = x.Date,
                              Title = x.Title,
                              ImageName = x.ImageName,
                              ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                              })
                              .FirstOrDefaultAsync(x => x.Id == id);

            if (imageEntity == null)
            {
                return NotFound();
            }

            return imageEntity;
        }

        [HttpPut]
        [Route("/update-image/{id}")]
        public async Task<IActionResult> PutImage(int id, ImageEntity imageEntity)
        {
            if (id != imageEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(imageEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        [Route("/post-image")]
        public async Task<ActionResult<ImageEntity>> PostImage([FromForm]ImageEntity model)
        {
            model.ImageName = await SaveImage(model.ImageFile);

           var imageEntity = new ImageEntity(
                model.UserName,
                model.Date,
                model.Title,
                model.ImageName);

            _context.Images.Add(imageEntity);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        [HttpDelete]
        [Route("/delete-image/{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var imageEntity = await _context.Images.FindAsync(id);
            DeleteImage(imageEntity.ImageName);

            if (imageEntity == null)
            {
                return NotFound();
            }

            _context.Images.Remove(imageEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImageEntityExists(int id)
        {
            return _context.Images.Any(e => e.Id == id);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
        string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
        imageName = imageName + "_" + Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if(System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
