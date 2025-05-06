import express from "express";
import { CreateEmployee, DeleteEmployee, GetAllEmployee, GetEmployeeById, UpdateEmployee } from "../controller/employeeController";
const app = express.Router();

app.get("/", GetAllEmployee);
app.get("/:id", GetEmployeeById);
app.post("/", CreateEmployee);
app.put("/:id", UpdateEmployee);
app.delete("/:id", DeleteEmployee);

export default app;
