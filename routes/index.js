//En este archivo deberían importarse todos los routers, categories, filter....

//Se importa express para poder usar .Router()
const express = require('express');
const producstRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');


function routerApi(app) {
  //Se crea instancia para router padre
  const routerPadre= express.Router();
  //Se agrega el path que indica el endpoint general al que se accederá en la v1
  app.use('/API/v1', routerPadre)
  //Se asignan todas las rutas que irán tras el endpoint o routerPadre
  routerPadre.use('/products', producstRouter);
  routerPadre.use('/users', usersRouter);
  routerPadre.use('/categories', categoriesRouter);
}

module.exports = routerApi;
