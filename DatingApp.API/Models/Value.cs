using System;

namespace DatingApp.API.Models
{
    public class Value
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Estatus { get; set; }
        public string Ubicacion { get; set; }
        public string Fraccionamiento { get; set; }
        public string Inmuebles { get; set; }
        public double Presupuesto { get; set; }
        public double Ejecutado { get; set; }
        public double PorEjecutar { get; set; }
        public double Avance { get; set; }
        public DateTime Estimado { get; set; }
        public double Avances { get; set; }
    }
}