import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import https from 'https';
import connection from './sql/connection.js';
import { PORT } from './config.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/fruits', async(req, res) => {
  const UNSPLASH_API_KEY = 'ZNR7K8316b4RpWQw2Jtz3v-_OiQV235WCYjTje-2kSM';
    const agent = new https.Agent({
        rejectUnauthorized: false // Ignora la verificación del certificado
    });
      
    const data = await (await axios.get("https://localhost:44316/api/fruits/datos", {httpsAgent: agent})).data;
    res.json(data)

    connection.query("SELECT * FROM fruit", (err, res)=>{
      if(res.length == 0){
        data.map((element) => {
          axios.get(`https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&query=${element.nombre+" fruta"}`)
            .then(response => {
              const results = response.data.results;
              if (results.length > 0) {
                console.log('URL de la imagen:', results[0].urls.regular);
                connection.query(`INSERT INTO fruit (id, nombre, tipo, img) VALUES (${element.id}, "${element.nombre}", "${element.tipo}", "${results[0].urls.regular}")`, (err, res) => {
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
    const agent = new https.Agent({
        rejectUnauthorized: false // Ignora la verificación del certificado
    });
      
    const data = await axios.get("https://localhost:44316/api/fruits/modo", {httpsAgent: agent});
    res.json(data.data)
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  connection.connect(()=>{
    console.log("conect db");
  })
});

