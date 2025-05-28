import express from "express";
import { CreateService, UpdateService, GetAllService, GetServiceById, DeleteService } from "../controller/serviceController";
import multer from "multer";
import { ValidateServices } from "../middleware/validation/services.validation";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = express.Router();

app.get("/", GetAllService);
app.get("/:id", GetServiceById);
app.post("/", [ValidateServices, upload.single("attachment")], CreateService);
app.put("/:id", [ValidateServices, upload.single("attachment")], UpdateService);
app.delete("/:id", DeleteService);

export default app;
