const { faker } = require('@faker-js/faker');
const setTimeoutTime = 1000;

class ProductsService {
  constructor() {
    this.products = [];
    this.generateBaseProducts();
    //Se crea array con propiedades obligatorias para validarlas
    this.neededProperties = ['name', 'price', 'image'];
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

  async create(data) {
    let propertiesFilteredProduct = {};
    //Este script recorre los datos enviados y retorna error si alguno de los parámetros obligatorios fue enviado sin información
    for (let i = 0; i < this.neededProperties.length; i++) {
      propertiesFilteredProduct[this.neededProperties[i]] =
        data[this.neededProperties[i]];

      if (!data[this.neededProperties[i]]) {
        return `Invalid ${this.neededProperties[i]} property value`;
      }
    }

    const newProduct = {
      id: faker.datatype.uuid(),
      ...propertiesFilteredProduct,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, setTimeoutTime);
    });
  }

  async findOne(id) {
    return this.products.find((product) => product.id === id);
  }

  //PATCH
  async updatePartial(id, paramsToUpdate) {
    try {
      let propertiesFilteredProduct = {};
      //Este script recorre los datos enviados y retorna error si alguno de los parámetros obligatorios fue enviado sin información

      const index = this.products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error(`Poduct id:${id} not found`, {
          cause: 404,
        });
      }

      for (let i = 0; i < this.neededProperties.length; i++) {
        if (paramsToUpdate[this.neededProperties[i]]) {
          propertiesFilteredProduct[this.neededProperties[i]] =
            paramsToUpdate[this.neededProperties[i]];
        } else if (paramsToUpdate[this.neededProperties[i]] === '') {
          throw new Error(
            `Invalid ${this.neededProperties[i]} property value`,
            {
              cause: 400,
            }
          );
        }
      }

      if (Object.keys(propertiesFilteredProduct).length === 0) {
        throw new Error(`Properties to update not sent`, {
          cause: 400,
        });
      }

      this.products[index] = {
        ...this.products[index],
        ...propertiesFilteredProduct,
      };
      return {
        status: 200,
        message: `Product id:${id} updated`,
        //data: this.products[index],
        data: propertiesFilteredProduct,
      };
    } catch (err) {
      return {
        status: err.cause,
        message: err.message,
      };
    }
  }

  //PUT
  async updateAll(id, paramsToUpdate) {
    // try {
    //   let propertiesFilteredProduct = {};

    //   const index = this.products.findIndex((product) => product.id === id);
    //   if (index === -1) {
    //     throw new Error(`Poduct id:${id} not found`, {
    //       cause: 404,
    //     });
    //   }

    //   for (let i = 0; i < this.neededProperties.length; i++) {
    //     if (paramsToUpdate[this.neededProperties[i]]) {
    //       propertiesFilteredProduct[this.neededProperties[i]] =
    //         paramsToUpdate[this.neededProperties[i]];
    //     } else {
    //       throw new Error(`${this.neededProperties[i]} property not sent`, {
    //         cause: 400,
    //       });
    //     }
    //   }

    //   if (Object.keys(propertiesFilteredProduct).length === 0) {
    //     throw new Error(`Properties or values to update not sent`, {
    //       cause: 400,
    //     });
    //   }

    //   this.products[index] = {
    //     ...this.products[index],
    //     ...propertiesFilteredProduct,
    //   };
    //   return {
    //     status: 200,
    //     message: `Product id:${id} updated`,
    //     data: this.products[index],
    //   };
    // } catch (err) {
    //   return {
    //     status: err.cause,
    //     message: err.message,
    //   };
    // }
    return new Promise((resolve, reject) => {
      OJOOOOOOOOOOOOOOOOOOOOOOOOOOOO SEGUIR ACÁ CON PROMISE
      setTimeout(() => {
        let propertiesFilteredProduct = {};
        const index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {
          const error = new Error(`Poduct id:${id} not found`, {
            cause: 404,
          });
        }

        for (let i = 0; i < this.neededProperties.length; i++) {
          if (paramsToUpdate[this.neededProperties[i]]) {
            propertiesFilteredProduct[this.neededProperties[i]] =
              paramsToUpdate[this.neededProperties[i]];
          } else {
            throw new Error(`${this.neededProperties[i]} property not sent`, {
              cause: 400,
            });
          }
        }

        if (Object.keys(propertiesFilteredProduct).length === 0) {
          throw new Error(`Properties or values to update not sent`, {
            cause: 400,
          });
        }

        this.products[index] = {
          ...this.products[index],
          ...propertiesFilteredProduct,
        };
        return {
          status: 200,
          message: `Product id:${id} updated`,
          data: this.products[index],
        };

        return {
          status: err.cause,
          message: err.message,
        };
      }, setTimeoutTime);
    });
  }

  //DELETE
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
