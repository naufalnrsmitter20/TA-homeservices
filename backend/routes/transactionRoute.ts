import express from "express";
import { CreateTransaction, DeleteTransaction, GetAllTransaction, GetHistoryTransaction, GetTransactionById, AddEmployeeToTransaction } from "../controller/transactionController";
import { ValidateTransaction } from "../middleware/validation/transaction.validation";
import { verifyAdmin, verifyToken } from "../middleware/verifyToken";
const app = express.Router();

app.get("/", [verifyAdmin], GetAllTransaction);
app.put("/addEmployee", [verifyAdmin], AddEmployeeToTransaction);
app.get("/history", [verifyToken], GetHistoryTransaction);
app.get("/:id", [verifyToken], GetTransactionById);
app.post("/", [verifyToken, ValidateTransaction], CreateTransaction);
app.delete("/:id", [verifyAdmin], DeleteTransaction);

export default app;
