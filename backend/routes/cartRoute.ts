import express from "express";
import { AddToCart, DeleteCart, GetAllCartUser, GetCartUserById, UpdateCart } from "../controller/cartController";
import { ValidateCart } from "../middleware/validation/cart.validation";
import { verifyToken } from "../middleware/verifyToken";
const app = express.Router();

app.get("/", GetAllCartUser);
app.get("/:id", GetCartUserById);
app.post("/", [verifyToken, ValidateCart], AddToCart);
app.put("/:id", [verifyToken, ValidateCart], UpdateCart);
app.delete("/:id", [verifyToken], DeleteCart);

export default app;
