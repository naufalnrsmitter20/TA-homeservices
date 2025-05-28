import joi from "joi";
import { Request, Response, NextFunction } from "express";

const RegisterSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  role: joi.string().valid("CUSTOMER", "ADMIN").optional(),
});
const LoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
});

export const ValidateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { error } = RegisterSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
export const ValidateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = RegisterSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
export const ValidateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
