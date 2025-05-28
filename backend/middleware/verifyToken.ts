import { Request, Response, NextFunction } from "express";

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
