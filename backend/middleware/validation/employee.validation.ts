import joi from "joi";
import { Request, Response, NextFunction } from "express";
const EmployeeSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]{12}$/)
    .required(),
  position: joi.string().min(3).max(50).required(),
});

export const ValidateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { error } = EmployeeSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
