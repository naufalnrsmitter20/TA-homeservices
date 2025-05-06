import express from "express";
import { AddToCart, DeleteUserCart, GetAllCartUser, GetCartUserById, UpdateUserCart } from "../controller/cartController";
const app = express.Router();

app.get("/", GetAllCartUser);
app.get("/:id", GetCartUserById);
app.post("/", AddToCart);
app.put("/:id", UpdateUserCart);
app.delete("/:id", DeleteUserCart);

export default app;
