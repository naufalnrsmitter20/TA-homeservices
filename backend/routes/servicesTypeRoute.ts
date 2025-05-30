import express from "express";
import { CreateServicesType, DeleteServicesType, GetAllServicesType, GetServicesTypeById, UpdateServicesType } from "../controller/servicesTypeController";
import { ValidateServiceType } from "../middleware/validation/services.validation";
import { verifyAdmin } from "../middleware/verifyToken";
const app = express.Router();

app.get("/", GetAllServicesType);
app.get("/:id", GetServicesTypeById);
app.post("/", [verifyAdmin, ValidateServiceType], CreateServicesType);
app.put("/:id", [verifyAdmin, ValidateServiceType], UpdateServicesType);
app.delete("/:id", [verifyAdmin], DeleteServicesType);

export default app;
