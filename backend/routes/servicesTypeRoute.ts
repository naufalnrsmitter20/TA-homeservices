import express from "express";
import { CreateServicesType, DeleteServicesType, GetAllServicesType, GetServicesTypeById, UpdateServicesType } from "../controller/servicesTypeController";
const app = express.Router();

app.get("/", GetAllServicesType);
app.get("/:id", GetServicesTypeById);
app.post("/", CreateServicesType);
app.put("/:id", UpdateServicesType);
app.delete("/:id", DeleteServicesType);

export default app;
