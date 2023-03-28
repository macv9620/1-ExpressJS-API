const express = require("express");
const cors = require("cors");
const app = express();

//Se importan middlewares
const { errorPrint, manageError } = require("./middlewares/errorMiddleware.js");

app.use(express.json());
const port = 3000;

app.use(express.json());

const routerApi = require("./routes/main.routes");

app.get("/", (req, res, next) => {
  res.send("Bienvenido a ProductAPI, consulta el contrato de la API");
});

app.listen(port, () => {
  console.log("Escuchando en puerto: " + port);
});

routerApi(app);
//Después de rutear se asocian los middlewares a la app
//Muy importante el orden en que se asocian ya que se ejecutan en esa secuencia y de eso dependerá cual será el next

app.use(errorPrint);
app.use(manageError);
