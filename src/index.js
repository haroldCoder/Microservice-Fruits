import express, { response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import https from 'https';
import connection from './sql/connection.js';
import { PORT } from './config.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.set("server", "https://localhost:44316/api/fruits/datos")

connection
const agent = new https.Agent({
  rejectUnauthorized: false // Ignora la verificación del certificado
});

app.get('/fruits', async(req, res) => {
  const UNSPLASH_API_KEY = 'ZNR7K8316b4RpWQw2Jtz3v-_OiQV235WCYjTje-2kSM';
    let data;
    try {
      data = await (await axios.get(app.get("server"), {httpsAgent: agent})).data;
      res.json(data)
    } catch (error) {
      app.set("server", "http://www.fruits-api.somee.com/api/fruits/datos")
      data = await (await axios.get(app.get("server"), {httpsAgent: agent})).data;
      res.json(data)
    } 
    

    connection.query("SELECT * FROM fruit", (err, res)=>{
      if(res.length == 0){
        data.map((element) => {
          axios.get(`https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&query=${element.nombre+" fruta"}`)
            .then(response => {
              const results = response.data.results;
              if (results.length > 0) {
                console.log('URL de la imagen:', results[0].urls.regular);
                connection.query(`INSERT INTO fruit (id, nombre, tipo, img) VALUES (${element.Id}, "${element.nombre}", "${element.tipo}", "${results[0].urls.regular}")`, (err, res) => {
                  if (err) throw err;
                  console.log('Fruit added');
                });
              } else {
                console.log('No se encontraron imágenes para la descripción');
              }
            })
            .catch(error => {
              console.log('Error al realizar la búsqueda:', error);
            });  
      });
      }
    });
    

});

app.get("/fruits/data", async(req, res)=>{
  connection.query('SELECT * FROM fruit', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
})

app.get("/fruits/modo", async(req, res)=>{
    
    let data;
    try {
      app.set("server", "https://localhost:44316/api/fruits/modo")
      data = await (await axios.get(app.get("server"), {httpsAgent: agent})).data;
      res.json(data)
    } catch (error) {
      app.set("server", "http://www.fruits-api.somee.com/api/fruits/modo")
      data = await (await axios.get(app.get("server"), {httpsAgent: agent})).data;
      res.json(data)
    } 
})

app.get("/users", (req, res)=>{
  connection.query("SELECT * FROM users", (err, response)=>{
    res.json(response)
  })
})

app.post("/users", async (req, res) => {
  const { name, password } = req.body;

  let resp;
  try{
      resp = await (await axios.get('https://localhost:44316/api/users/validate/'+name,{ httpsAgent: agent })).d
  }
  catch(err){
      resp = await (await axios.get("http://www.fruits-api.somee.com/api/users/validate/"+name)).data;
  }
  
  if(resp == ""){
    connection.query(`INSERT INTO users(name, password, create_time) VALUES('${name}', '${password}', NOW())`, (err, response)=>{
      if(err) throw err;
      console.log('new user aded');
      res.json(true);
    });
  }
  else{
    res.send(`the user ${resp} already exists`);
  }
});

app.get("/users/validate/:name/:password", async(req, res)=>{
  const {name, password} = req.params;

  try{
    try{
      await axios.get("https://localhost:44316/api/users/login/"+name+"/"+password, {httpsAgent: agent})
      .then((resp) => {
        if(resp.data != ""){
          res.json({"status": "ok","data": resp.data})
        }
        else{
          res.json("error");
        }
      })
    }
    catch(err){
      await axios.get("http://www.fruits-api.somee.com/api/users/login/"+name+"/"+password, {httpsAgent: agent})
      .then((resp) => {
        if(resp.data != ""){
          res.json({"status": "ok","data": resp.data})
        }
        else{
          res.json("error");
        }
      })
    }
  }
  catch(err){
    res.send(err)
  }
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  connection.connect(()=>{
    console.log("conect db");
  })
});

