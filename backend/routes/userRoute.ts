import express from "express";
import { getAllUsers, createUser, deleteUser, getUserById, updateUser } from "../controller/userController";

const app = express.Router();

app.get("/", getAllUsers);
app.get("/:id", getUserById);
app.post("/", createUser);
app.put("/:id", updateUser);
app.delete("/:id", deleteUser);

export default app;
