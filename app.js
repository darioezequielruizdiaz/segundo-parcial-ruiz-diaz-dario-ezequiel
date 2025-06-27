import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", () => {
    console.log("Hola mundo! 👋");
})

initDB();

app.listen(PORT, () => {
    console.log(`🚀 El servidor se esta ejecutando en http://localhost:${PORT}/`);
})