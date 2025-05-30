import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const GetAllEmployee = async (req: Request, res: Response) => {
  try {
    const allEmployees = await prisma.employee.findMany();
    res.status(200).json({
      status: true,
      data: allEmployees,
      message: "All employees have been retrieved",
    });
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
    const { id } = req.params;
    const checkEmployee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (!checkEmployee) {
      res.status(404).json({
        status: false,
        message: "Employee Not Found",
      });
      return;
    }
    res.status(200).json({
      status: true,
      data: checkEmployee,
      message: "Employee has been retrieved",
    });
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
    const { name, position, email, phone } = req.body;
    const newEmployee = await prisma.employee.create({
      data: {
        name,
        position,
        email,
        phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json({
      status: true,
      data: newEmployee,
      message: "Employee has been created",
    });
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
    const { id } = req.params;
    const { name, position } = req.body;
    const checkEmployee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (!checkEmployee) {
      res.status(404).json({
        status: false,
        message: "Employee Not Found",
      });
      return;
    }
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        name,
        position,
        updatedAt: new Date(),
      },
    });
    res.status(200).json({
      status: true,
      data: updatedEmployee,
      message: "Employee has been updated",
    });
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
    const { id } = req.params;
    const checkEmployee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (!checkEmployee) {
      res.status(404).json({
        status: false,
        message: "Employee Not Found",
      });
      return;
    }
    await prisma.employee.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      status: true,
      message: "Employee has been deleted",
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
