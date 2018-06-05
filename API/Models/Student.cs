using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Models
{
    public class Student
    {
        public long Id { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string cedula { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }



    }
}