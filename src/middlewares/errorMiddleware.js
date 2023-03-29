//Deben tener los 4 parámetros para que sea identificado como un middleware del tipo error
function errorPrint(error, req, res, next) {
  console.log(error);
  //Captura el error y lo envía como parámetro al siguiente middleware para continuar con la cadena
  next(error);
}

function manageError(error, req, res, next) {
  console.log('Code en middleware ' + error.code);
  if (error.code) {
    res.status(error.code).json({
      status: error.code,
      message: error.message,
    });
  } else {
    console.log("entre a error 500");
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}

module.exports = {
  errorPrint,
  manageError,
};

//Importante los middlewares del tipo error se deben definir después de hacer el routing
