import express from "express";
import { CreateService, UpdateService, GetAllService, GetServiceById, DeleteService } from "../controller/serviceController";
import multer from "multer";
import { ValidateCreateServices, ValidateUpdateServices } from "../middleware/validation/services.validation";
import { verifyAdmin } from "../middleware/verifyToken";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = express.Router();

app.get("/", GetAllService);
app.get("/:id", GetServiceById);
app.post("/", [verifyAdmin, ValidateCreateServices, upload.single("attachment")], CreateService);
app.put("/:id", [verifyAdmin, ValidateUpdateServices, upload.single("attachment")], UpdateService);
app.delete("/:id", [verifyAdmin], DeleteService);

export default app;
