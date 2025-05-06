import express from "express";
import { Login, Register, Logout } from "../controller/authController";
const app = express.Router();

app.post("/login", Login);
app.post("/register", Register);
app.post("/logout", Logout);

export default app;
