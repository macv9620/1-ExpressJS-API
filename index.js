const express = require('express');
const app = express();
//Middleware para poder recibir JSON
app.use(express.json());
const port = 3000;
const routerApi = require('./routes/index');

app.get('/', (req, res) => {
  res.send('Consultaste el server!!');
});


app.listen(port, () => {
  console.log('Escuchando en puerto: ' + port);
});

routerApi(app);
