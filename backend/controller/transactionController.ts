import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const GetAllTransaction = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const GetTransactionById = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const CreateTransaction = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const DeleteTransaction = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
