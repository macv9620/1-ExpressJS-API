const express = require("express");
const app = express();

app.use(express.json());
const port = 3000;
const routerApi = require("./routes/main.routes");

app.get("/", (req, res) => {
  res.send("Bienvenido a ProductAPI, consulta el contrato de la API");
});

app.listen(port, () => {
  console.log("Escuchando en puerto: " + port);
});

routerApi(app);
