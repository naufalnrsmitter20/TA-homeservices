import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserData } from "../lib/interfaces";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodeToken = jwt.decode(token);
    const data = decodeToken as UserData;

    if (!decodeToken || data.role !== "ADMIN") {
      res.status(403).json({ message: "Forbidden, Only Admin can access!" });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
