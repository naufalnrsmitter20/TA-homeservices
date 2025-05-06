import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const GetAllService = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const GetServiceById = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const CreateService = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const UpdateService = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const DeleteService = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
