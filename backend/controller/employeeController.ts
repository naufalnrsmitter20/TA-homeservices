import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const GetAllEmployee = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const GetEmployeeById = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const CreateEmployee = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const UpdateEmployee = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const DeleteEmployee = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
