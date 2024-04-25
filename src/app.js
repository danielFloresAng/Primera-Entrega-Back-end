import express from "express";
import setup from "./config.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes);
app.use("/static", express.static(`${setup.DIRNAME}/public`));

app.listen(
  setup.PORT,
  console.log(`Servidor funcionando en puerto ${setup.PORT}`)
);
