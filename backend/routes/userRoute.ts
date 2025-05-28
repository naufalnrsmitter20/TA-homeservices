import express from "express";
import { getAllUsers, createUser, deleteUser, getUserById, updateUser } from "../controller/userController";
import { ValidateUser } from "../middleware/validation/auth.validation";

const app = express.Router();

app.get("/", getAllUsers);
app.get("/:id", getUserById);
app.post("/", [ValidateUser], createUser);
app.put("/:id", [ValidateUser], updateUser);
app.delete("/:id", deleteUser);

export default app;
