import express from "express";
import { getAllUsers, createUser, deleteUser, getUserById, updateUser } from "../controller/userController";
import { ValidateUser } from "../middleware/validation/auth.validation";
import { verifyAdmin } from "../middleware/verifyToken";

const app = express.Router();

app.get("/", [verifyAdmin], getAllUsers);
app.get("/:id", [verifyAdmin], getUserById);
app.post("/", [verifyAdmin, ValidateUser], createUser);
app.put("/:id", [verifyAdmin, ValidateUser], updateUser);
app.delete("/:id", [verifyAdmin], deleteUser);

export default app;
