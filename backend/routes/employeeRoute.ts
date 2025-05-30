import express from "express";
import { CreateEmployee, DeleteEmployee, GetAllEmployee, GetEmployeeById, UpdateEmployee } from "../controller/employeeController";
import { ValidateEmployee } from "../middleware/validation/employee.validation";
import { verifyAdmin } from "../middleware/verifyToken";
const app = express.Router();

app.get("/", GetAllEmployee);
app.get("/:id", GetEmployeeById);
app.post("/", [verifyAdmin, ValidateEmployee], CreateEmployee);
app.put("/:id", [verifyAdmin, ValidateEmployee], UpdateEmployee);
app.delete("/:id", [verifyAdmin], DeleteEmployee);

export default app;
