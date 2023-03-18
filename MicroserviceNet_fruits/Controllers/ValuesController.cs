using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FruitApi.Controllers
{
    [Route("api/fruits")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public class Fruta
        {
            public int Id { get; set; }
            public string nombre { get; set; }
            public string tipo { get; set; }
        }

        public Fruta[] ObtenerFrutas()
        {
            var frutas = new Fruta[]
            {
                new Fruta { Id = 1, nombre = "Manzana", tipo = "dulce" },
                new Fruta { Id = 2, nombre = "Mango", tipo = "dulce" },
                new Fruta { Id = 3, nombre = "Piña", tipo = "acida" },
                new Fruta { Id = 4, nombre = "Sandia", tipo = "dulce" },
                new Fruta { Id = 5, nombre = "Coco", tipo = "simple" },
                new Fruta { Id = 6, nombre = "Aguacate", tipo = "simple" }
            };

            return frutas;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<object> Get()
        {
            IEnumerable<string> Datos_frutas = ObtenerFrutas().Select(x => $"-{x.nombre} de tipo {x.tipo}");
            return Datos_frutas;
        }

        // GET api/values/5
        [HttpGet("datos")]
        public IEnumerable<object> GetDatos()
        {
            var datos = from i in ObtenerFrutas() select new {i.nombre, i.tipo };
            return datos;
        }

        [HttpGet("modo")]
        public IEnumerable<object> Modo_conservado()
        {
            var conservado = new[]
            {
                new{tipo="dulce", modo_reserva="refrigeracion"},
                new{tipo="acida", modo_reserva="aire"},
                new{tipo="simple", modo_reserva="periodico"}
            };

            var unir_fruta_conservado = from fr in ObtenerFrutas()
                                        join cn in conservado on fr.tipo equals cn.tipo
                                        select new
                                        {
                                            fr.nombre,
                                            cn.modo_reserva
                                        };
            return unir_fruta_conservado;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
