import { Router } from "express";
import ProductManager from "../productManager.js";
import setup from "../config.js";

const endPoints = Router();
const itemsManager = new ProductManager("../src/files/itemList.json");
// const indicate = (req, res, next) => {
//   console.log("loco, éste es el incicate, flaco");
//   next();
// };
endPoints.get("/", (req, res) => {
  res.status(200).send(`<h2>Bienvenido al puerto ${setup.PORT} :)</h2>`);
});
// endPoints.post("/", (req, res) => {
//   console.log(req.body);
//   res.status(200).send({ status: "ok", playload: req.body });
// });

endPoints.get("/api/products", async (req, res) => {
  const itemsLimit = req.query.limit;
  const items = await itemsManager.getProducts(itemsLimit);

  res.send({ status: "OK", playload: items });
});

endPoints.get("/api/products/:pid", async (req, res) => {
  const filterById = req.params.pid;
  const items = await itemsManager.getProductsById(+filterById);

  res.send({ status: "OK", playload: items });
});
endPoints.post("/api/products/:pid", async (req, res) => {
  const filterById = req.params.pid;
  const items = await itemsManager.getProductsById(+filterById);

  res.send({ status: "OK", playload: items });
});

export default endPoints;
