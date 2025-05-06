import express from "express";
import { CreateTransaction, DeleteTransaction, GetAllTransaction, GetTransactionById } from "../controller/transactionController";
const app = express.Router();

app.get("/", GetAllTransaction);
app.get("/:id", GetTransactionById);
app.post("/", CreateTransaction);
app.delete("/:id", DeleteTransaction);

export default app;
