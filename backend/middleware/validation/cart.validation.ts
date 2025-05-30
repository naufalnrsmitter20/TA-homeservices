import joi from "joi";
import { Request, Response, NextFunction } from "express";

const CartSchema = joi.object({
  serviceId: joi.array().items(joi.number().integer().required()).required(),
});

export const ValidateCart = (req: Request, res: Response, next: NextFunction) => {
  const { error } = CartSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
