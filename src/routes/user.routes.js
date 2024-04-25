import { Router } from "express";
import ProductManager from "../productManager.js";
import setup from "../config.js";

const endPoints = Router();
const itemsManager = new ProductManager("../src/files/products.json");
const cartManager = new ProductManager("../src/files/carts.json");

// ---> GET DE INICIO EN LOCAL HOST 8080
endPoints.get("/", (req, res) => {
  res.status(200).send(`<h2>Bienvenido al puerto ${setup.PORT} :)</h2>`);
});

// ---> GET PARA DEVOLVER PRODUCTOS CON UN LIMITE
endPoints.get("/api/products", async (req, res) => {
  const itemsLimit = req.query.limit;
  const items = await itemsManager.getProducts(itemsLimit);

  res.send({ status: "OK", playload: items });
});

// ---> GET PARA FILTRAR PRODUCTOS POR ID
endPoints.get("/api/products/:pid", async (req, res) => {
  const filterById = req.params.pid;
  const items = await itemsManager.getProductsById(+filterById);

  res.send({ status: "OK", playload: items });
});

// ---> POST PARA AGREGAR PRODUCTOS
endPoints.post("/api/products", async (req, res) => {
  const addItem = req.body;

  await itemsManager.addProducts(addItem);
  res.send({ status: "OK", playload: itemsManager.getProducts() });
});

// ---> PUT PARA ACTUALIZAR PRODUCTOS
endPoints.put("/api/products/:pid", async (req, res) => {
  const ID = req.params.pid;
  const update = req.body;

  await itemsManager.updateProduct(+ID, update);
  res.send(itemsManager.getProductsById(+ID));
});

// ---> DELETE PARA BORRAR PRODUCTOS CON EL ID SELECCIONADO
endPoints.delete("/api/products/d", async (req, res) => {
  const deleteItem = req.params.pid;
  await itemsManager.deleteProduct(deleteItem);
  // const oi = await itemsManager.deleteProduct(deleteItem);
  res.send({ status: "ok", playload: itemsManager.getProducts() });
  // res.send({ status: "ok", playload: oi });
});

// ---> POST PARA CREAR NUEVO CARRITO
endPoints.post("/api/carts", (req, res) => {
  const newCart = req.body;
  cartManager.addProducts(newCart);

  res.send(cartManager.getProducts());
});
// ---> GET PARA LISTAR PRODUCTOS
endPoints.get("/api/carts/:cid", async (req, res) => {
  const cartID = req.params.cid;
  // La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
  const cartItems = await cartManager.getProductsById(+cartID);
  res.send({ status: "ok", playload: cartItems });
});

// ---> POST PARA AGREGAR PRODUCTO A "products"
endPoints.post("/api/carts:cid/product/:pid", async (req, res) => {
  const itemID = req.params.pid;
  const cartID = req.params.cid;
  const itemFilter = await itemsManager.getProductsById(+itemID);
  const cartFilter = await cartManager.getProductsById(+cartID);

  cartFilter.forEach();

  const sdf = cartFilter.products.push({ product: itemFilter.id, quantity: 4 });
  /*
  La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
  product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
  
  quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
  
  Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 
  
  */

  res.send();
});

export default endPoints;
