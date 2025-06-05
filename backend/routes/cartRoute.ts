import express from "express";
import { AddToCart, DeleteCart, GetAllCartUser, GetCartUserById, UpdateCart } from "../controller/cartController";
import { ValidateCart } from "../middleware/validation/cart.validation";
import { verifyAdmin, verifyToken } from "../middleware/verifyToken";
const app = express.Router();

app.get("/", [verifyAdmin], GetAllCartUser);
app.get("/usercart", [verifyToken], GetCartUserById);
app.post("/", [verifyToken, ValidateCart], AddToCart);
app.put("/:id", [verifyToken, ValidateCart], UpdateCart);
app.delete("/:id", [verifyToken], DeleteCart);

export default app;
