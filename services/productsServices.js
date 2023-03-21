const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generateBaseProducts();
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

  create(data) {
    const neededProperties = ['name', 'price', 'image'];
    let propertiesFilteredProduct = {};
    for (let i = 0; i < neededProperties.length; i++) {
      propertiesFilteredProduct[neededProperties[i]] =
        data[neededProperties[i]];

        if(!data[neededProperties[i]]){
          return `Invalid ${neededProperties[i]} property value`;
        }
    }

    const newProduct = {
      id: faker.datatype.uuid(),
      ...propertiesFilteredProduct,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((product) => product.id === id);
  }

  update() {}
}

module.exports = ProductsService;
