import joi from "joi";
import { Request, Response, NextFunction } from "express";

const transactionSchema = joi.object({
  cartId: joi.number().integer().required(),
  employeeId: joi.number().integer().required(),
  paymentMethod: joi.string().valid("CASH", "CREDIT_CARD", "BANK_TRANSFER").required(),
  notes: joi.string().max(500).optional(),
});

export const ValidateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const { error } = transactionSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
