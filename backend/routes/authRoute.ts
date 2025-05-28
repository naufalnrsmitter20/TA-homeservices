import express from "express";
import { Login, Register, Logout } from "../controller/authController";
import { ValidateLogin, ValidateRegister } from "../middleware/validation/auth.validation";
import { verifyToken } from "../middleware/verifyToken";
const app = express.Router();

app.post("/login", [ValidateLogin], Login);
app.post("/register", [ValidateRegister], Register);
app.post("/logout", [verifyToken], Logout);

export default app;
