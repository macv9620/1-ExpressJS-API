//En este archivo deberían importarse todos los routers, categories, filter....

const producstRouter = require('./productsRouter');
// const categoriesRouter = require('./categoriessRouter');


function routerApi(app) {
  app.use('/products', producstRouter);
  // app.use('/categories', categoriesRouter);

}

module.exports = routerApi;
