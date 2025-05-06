import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const GetAllCartUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const GetCartUserById = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const AddToCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const UpdateUserCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const DeleteUserCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
