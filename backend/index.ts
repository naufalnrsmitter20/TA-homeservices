import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(`/api/user`, userRoute);
app.use(`/api/employee`, userRoute);
app.use(`/api/services/type`, userRoute);
app.use(`/api/service`, userRoute);
app.use(`/api/cart`, userRoute);
app.use(`/api/transaction`, userRoute);

app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:${3000}`);
});
