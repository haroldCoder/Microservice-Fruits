using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;

namespace FruitApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class FruitsController : ControllerBase
    {
        public class Fruta
        {
            public int Id { get; set; }
            public string nombre { get; set; }
            public string tipo { get; set; }
        }
        public class User
        {
            public string name { get; set; }
            public string password { get; set; }
            public int id { get; set; }
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

        [HttpGet("fruits")]
        public IEnumerable<object> Get()
        {
            IEnumerable<string> Datos_frutas = ObtenerFrutas().Select(x => $"-{x.nombre} de tipo {x.tipo}");
            return Datos_frutas;
        }

        // GET api/values/5
        [HttpGet("fruits/datos")]
        public IEnumerable<object> GetDatos()
        {
            var datos = from i in ObtenerFrutas() select new {i.Id, i.nombre, i.tipo };
            return datos;
        }

        [HttpGet("fruits/modo")]
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
        [HttpGet("users/validate/{name}")]
        public async Task<object> Validation(string name)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response;
                try
                {
                    response = await client.GetAsync("http://localhost:4000/users");
                }
                catch (Exception err)
                {
                    response = await client.GetAsync("https://microservice-fruits-production-1b58.up.railway.app/users");
                }
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    User[] users = JsonConvert.DeserializeObject<User[]>(content);

                    //var getusers = new[] { new { name = "", password = "" } };
                    //foreach (var i in users)
                    //{
                    //    getusers = new[] { new { name = i.name, password = i.password } };
                    //}
                    var getusers = from i in users where i.name == name select i.name;

                    return getusers;
                }
                else
                {
                    Console.WriteLine($"Error {response.StatusCode}");
                }  
            }
            return "";
        }

        [HttpGet("users/login/{name}/{password}")]
        public async Task<object> Login(string name, string password)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response;
                try
                {
                    response = await client.GetAsync("http://localhost:4000/users");
                }
                catch (Exception err)
                {
                    response = await client.GetAsync("https://microservice-fruits-production-1b58.up.railway.app/users");
                }
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    User[] users = JsonConvert.DeserializeObject<User[]>(content);

                    var getusers = from i in users where i.name == name && i.password == password select new[]{ new { i.name, i.id } };

                    return getusers;
                }
                else
                {
                    Console.WriteLine($"Error {response.StatusCode}");
                }
            }
            return "";
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
