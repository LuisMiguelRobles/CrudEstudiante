using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using System.Linq;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly ApiContext _context;

        public StudentController(ApiContext context)
        {
            _context = context;
            if (_context.Students.Count() == 0)
            {
                _context.Students.Add(new Student { nombre = "Luis",apellido = "Robles", cedula= "1054925384"});
                _context.SaveChanges();
            }
        }

        /*Obtiene todos los estudiantes 
         */
        [HttpGet]
        public IEnumerable<Student> GetAll(){
            return _context.Students.ToList();
        }

        /*
        Obtiene solo un estudiante 
         */
        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(string cedula){
            var student = _context.Students.FirstOrDefault(t => t.cedula == cedula);
            if (student == null){
                return NotFound();
            }
            return new ObjectResult(student);
        }

        /*
        Crea un nuevo Estudiante
         */
        [HttpPost]
        public IActionResult Create([FromBody] Student student){
            if (student == null){
                return BadRequest();
            }
            _context.Students.Add(student);
            _context.SaveChanges();
            return CreatedAtRoute("GetTodo", new { id = student.Id }, student);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var todo = _context.Students.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Students.Remove(todo);
            _context.SaveChanges();
            return new NoContentResult();
        }


        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Student student)
        {
            

            if (student == null || student.Id != id)
            {
                
                return BadRequest();
            }

            var todo = _context.Students.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.nombre = student.nombre;
            todo.apellido = student.apellido;
            todo.cedula = student.cedula;

            _context.Students.Update(todo);
            _context.SaveChanges();
            return new NoContentResult();
        }
 
        
    }
    
}
