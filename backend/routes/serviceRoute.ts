import express from "express";
import { CreateService, UpdateService, GetAllService, GetServiceById, DeleteService } from "../controller/serviceController";
const app = express.Router();

app.get("/", GetAllService);
app.get("/:id", GetServiceById);
app.post("/", CreateService);
app.put("/:id", UpdateService);
app.delete("/:id", DeleteService);

export default app;
