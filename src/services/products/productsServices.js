const { faker } = require("@faker-js/faker");
const setTimeoutTime = 1000;

class ProductsService {
  constructor() {
    this.products = [];
    this.generateBaseProducts();
    //Se crea array con propiedades obligatorias para validarlas
    this.neededProperties = ["name", "price", "image"];
  }

  generateBaseProducts() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  //OK  promesa
  async create(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let propertiesFilteredProduct = {};
        //Este script recorre los datos enviados y retorna error si alguno de los parámetros obligatorios fue enviado sin información
        for (let i = 0; i < this.neededProperties.length; i++) {
          propertiesFilteredProduct[this.neededProperties[i]] =
            data[this.neededProperties[i]];

          if (!data[this.neededProperties[i]]) {
            const error = new Error(
              `${this.neededProperties[i]} is not defined o has a invalid value`,
              { cause: 400 }
            );
            reject(error);
          }
        }

        const newProduct = {
          id: faker.datatype.uuid(),
          ...propertiesFilteredProduct,
        };
        this.products.push(newProduct);
        resolve({
          status: 201,
          message: "Product created",
          data: newProduct,
        });
      }, setTimeoutTime);
    });
  }

  //OK  promesa
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(this.products);
        } catch (err) {
          reject(err);
        }
      }, setTimeoutTime);
    });
  }

  //OK  promesa
  async findOne(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = this.products.find((product) => product.id === id);
        if (product) {
          const result = {
            status: 200,
            data: product,
          };
          resolve(result);
        } else {
          const error = new Error(`Product id:${id} not found`, { cause: 404 });
          reject(error);
        }
      }, setTimeoutTime);
    });
  }

  //PATCH
  //OK  promesa
  async updatePartial(id, paramsToUpdate) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let propertiesFilteredProduct = {};
        //Este script recorre los datos enviados y retorna error si alguno de los parámetros obligatorios fue enviado sin información

        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
          const error = new Error(`Poduct id:${id} not found`, {
            cause: 404,
          });
          reject(error);
        }

        for (let i = 0; i < this.neededProperties.length; i++) {
          if (paramsToUpdate[this.neededProperties[i]]) {
            propertiesFilteredProduct[this.neededProperties[i]] =
              paramsToUpdate[this.neededProperties[i]];
          } else if (paramsToUpdate[this.neededProperties[i]] === "") {
            const error = new Error(
              `Invalid ${this.neededProperties[i]} property value`,
              {
                cause: 400,
              }
            );
            reject(error);
          }
        }

        if (Object.keys(propertiesFilteredProduct).length === 0) {
          const error = new Error(`Properties to update not sent`, {
            cause: 400,
          });
          reject(error);
        }

        this.products[index] = {
          ...this.products[index],
          ...propertiesFilteredProduct,
        };
        resolve({
          status: 200,
          message: `Product id:${id} updated`,
          data: propertiesFilteredProduct,
        });
      }, setTimeoutTime);
    });
  }

  //PUT
    //OK  promesa
  async updateAll(id, paramsToUpdate) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let propertiesFilteredProduct = {};
        let error = undefined;

        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
          error = new Error(`Poduct id:${id} not found`, {
            cause: 404,
          });
          reject(error);
        }

        for (let i = 0; i < this.neededProperties.length; i++) {
          if (paramsToUpdate[this.neededProperties[i]]) {
            propertiesFilteredProduct[this.neededProperties[i]] =
              paramsToUpdate[this.neededProperties[i]];
          } else {
            error = new Error(`${this.neededProperties[i]} property invalid`, {
              cause: 400,
            });
            reject(error);
          }
        }

        if (Object.keys(propertiesFilteredProduct).length === 0) {
          error = new Error(`Properties or values to update not sent`, {
            cause: 400,
          });
          reject(error);
        }

        this.products[index] = {
          ...this.products[index],
          ...propertiesFilteredProduct,
        };

        const result = {
          status: 200,
          message: `Product id:${id} updated`,
          data: this.products[index],
        };
        resolve(result);
      }, setTimeoutTime);
    });
  }

  //OK  promesa
  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
          const error = new Error(`Poduct id:${id} not found`, {
            cause: 404,
          });
          reject(error);
        } else {
          this.products.splice(index, 1);
          const result = {
            status: 200,
            message: `Product id:${id} deleted`,
            data: {
              id: id,
            },
          };
          resolve(result);
        }
      }, setTimeoutTime);
    });
  }
}

module.exports = ProductsService;
