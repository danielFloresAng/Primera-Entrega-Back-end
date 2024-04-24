import { Router } from "express";
import ProductManager from "../productManager.js";
import setup from "../config.js";

const endPoints = Router();
const itemsManager = new ProductManager("../src/files/products.json");
const cartManager = new ProductManager("../src/files/carts.json")

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
  /* 
  La ruta raíz POST / deberá agregar un nuevo producto con los campos:
id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.

thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
Status es true por defecto.
Todos los campos son obligatorios, a excepción de thumbnails
*/

  await itemsManager.addProducts(addItem);
  res.send({ status: "OK", playload: itemsManager.getProducts() });
});

// ---> PUT PARA ACTUALIZAR PRODUCTOS
endPoints.put("/api/products:pid", async (req, res) => {
  const ID = req.params.pid
  const update = req.body
  /*
  La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
*/
await itemsManager.updateProduct(+ID, update)
  res.send(itemsManager.getProductsById(+ID));
});

// ---> DELETE PARA BORRAR PRODUCTOS CON EL ID SELECCIONADO
endPoints.delete("/api/products:pid", async (req, res) => {
  // La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.
  const deleteItem = req.params.pid
  await itemsManager.deleteProduct(+deleteItem)
  res.send(itemsManager.getProducts());
});

// ---> POST PARA CREAR NUEVO CARRITO
endPoints.post("/api/carts", (req, res) => {
  const newCart = req.body
  cartManager.addProducts(newCart)
  /*
  Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:
  La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
  Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
  products: Array que contendrá objetos que representen cada producto
  */

  res.send(cartManager.getProducts());
});
// ---> GET PARA LISTAR PRODUCTOS
endPoints.get("/api/carts:cid", async (req, res) => {
  const list = req.params.cid
  // La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
  res.send(cartManager.getProductsById(+list));
});

// ---> POST PARA AGREGAR PRODUCTO A "products"
endPoints.post("/api/carts:cid/product/:pid", (req, res) => {
  
  /*
  La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
  product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
  
  quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
  
  Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 
  
  */

  res.send();
});

/*
La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.
No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.
 */

export default endPoints;
