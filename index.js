import express from "express";
import { clienteRoutes } from "./src/api/api.js";
// import { optionsRouter } from "./src/api/test/tests.js";

const app = express();
const portApi = 2020;
const domain = '/v1/cliente';

app.use(express.json());
app.use(domain, clienteRoutes);
// app.use(domain, optionsRouter)

app.listen(portApi, () => {
    console.log(`API rodando em http://localhost:${portApi}`);
});