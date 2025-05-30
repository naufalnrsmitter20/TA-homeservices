import joi from "joi";
import { Request, Response, NextFunction } from "express";

const ServicesSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  description: joi.string().min(10).max(500).required(),
  price: joi.number().min(0).required(),
  servicesTypeId: joi.number().integer().required(),
  attachment: joi
    .object({
      buffer: joi.binary().required(),
      mimetype: joi.string().valid("image/jpeg", "image/png").required(),
    })
    .required(),
});
const ServicesSchemaUpdated = joi.object({
  name: joi.string().min(3).max(30).required(),
  description: joi.string().min(10).max(500).required(),
  price: joi.number().min(0).required(),
  servicesTypeId: joi.number().integer().required(),
  attachment: joi
    .object({
      buffer: joi.binary().required(),
      mimetype: joi.string().valid("image/jpeg", "image/png").required(),
    })
    .optional(),
});
const ServicesTypechema = joi.object({
  name: joi.string().min(3).max(30).required(),
});
export const ValidateCreateServices = (req: Request, res: Response, next: NextFunction) => {
  const { error } = ServicesSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

export const ValidateUpdateServices = (req: Request, res: Response, next: NextFunction) => {
  const { error } = ServicesSchemaUpdated.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

export const ValidateServiceType = (req: Request, res: Response, next: NextFunction) => {
  const { error } = ServicesTypechema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
