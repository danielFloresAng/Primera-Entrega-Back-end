import fs from "fs";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  async addProducts(item) {
    let itemsList = this.products;
    let itemListPath = this.path;
    let generateID = itemsList.length + 1;
    let findCode = itemsList.find((elem) => elem.code === item.code);

    !findCode || item.code === undefined
      ? itemsList.push({ id: generateID, ...item })
      : console.error(`El producto con código "${item.code}" ya existe`);

    let listJSON = JSON.stringify(itemsList);

    await fs.promises.writeFile(itemListPath, listJSON);
  }
  async getProducts(limit) {
    let readItems = await fs.promises.readFile(this.path, this.products);
    let itemsParse = JSON.parse(readItems);

    return limit === 0 || limit > itemsParse.length
      ? itemsParse
      : itemsParse.slice(0, limit);
  }
  async getProductsById(itemID) {
    let readItems = await fs.promises.readFile(this.path, "utf-8");
    let list = JSON.parse(readItems);
    let getItem = await list.find((item) => item.id === itemID);
    return getItem
      ? getItem
      : { error: `El producto con ID "${itemID}" no existe` };
  }
  async updateProduct(productID, properties) {
    let readItems = await fs.promises.readFile(this.path, "utf-8");
    let listParse = JSON.parse(readItems);

    listParse.forEach((elem) => {
      if (productID === elem.id) {
        for (let prop in properties) {
          if (prop !== "id") {
            elem[prop] = properties[prop];
          }
        }
      }
    });
    let listJSON = JSON.stringify(listParse);
    await fs.promises.writeFile(this.path, listJSON);
  }
  async deleteProduct(elemId) {
    let itemsList = this.products;

    let readItems = await fs.promises.readFile(this.path, "utf-8");
    let list = JSON.parse(readItems);
    let filterItem = list.findIndex((elem) => elem.id === elemId);

    if (filterItem !== -1) {
      itemsList.splice(filterItem, 1);
    }
    let listJSON = JSON.stringify(itemsList);
    await fs.promises.writeFile(this.path, listJSON);
  }
}

// Creando productos
let manager = new ProductManager("./files/itemList.json");

/* 
manager.addProducts({
  title: "producto prueba 1",
  description: "Este es el producto prueba 1",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc1",
  stock: 2,
});
manager.addProducts({
  title: "producto prueba 2",
  description: "Este es el producto prueba 2",
  price: 400,
  thumbnail: "Sin imagen",
  code: "abc2",
  stock: 3,
});
manager.addProducts({
  title: "producto prueba 3",
  description: "Este es el producto prueba 3",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc3",
  stock: 6,
});
manager.addProducts({
  title: "producto prueba 4",
  description: "Este es el producto prueba 4",
  price: 230,
  thumbnail: "Sin imagen",
  code: "abc4",
  stock: 4,
});
manager.addProducts({
  title: "producto prueba 5",
  description: "Este es el producto prueba 5",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc5",
  stock: 8,
});
manager.addProducts({
  title: "producto prueba 6",
  description: "Este es el producto prueba 6",
  price: 460,
  thumbnail: "Sin imagen",
  code: "abc6",
  stock: 3,
});
manager.addProducts({
  title: "producto prueba 7",
  description: "Este es el producto prueba 7",
  price: 490,
  thumbnail: "Sin imagen",
  code: "abc7",
  stock: 9,
});
manager.addProducts({
  title: "producto prueba 8",
  description: "Este es el producto prueba 8",
  price: 660,
  thumbnail: "Sin imagen",
  code: "abc8",
  stock: 2,
});
manager.addProducts({
  title: "producto prueba 9",
  description: "Este es el producto prueba 9",
  price: 750,
  thumbnail: "Sin imagen",
  code: "abc9",
  stock: 8,
});
manager.addProducts({
  title: "producto prueba 10",
  description: "Este es el producto prueba 10",
  price: 1020,
  thumbnail: "Sin imagen",
  code: "abc10",
  stock: 3,
});
*/

export default ProductManager;
