import { Request, Response } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import { UserData } from "../lib/interfaces";

export const GetAllTransaction = async (req: Request, res: Response) => {
  try {
    const allTransactions = await prisma.transaksi.findMany({
      include: {
        user: true,
        DetailTransaksi: true,
      },
    });
    res.status(200).json({
      status: true,
      data: allTransactions,
      message: "All transactions have been retrieved",
    });
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
    const { id } = req.params;
    const allTransactions = await prisma.transaksi.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        DetailTransaksi: true,
      },
    });
    if (!allTransactions) {
      res.status(404).json({
        status: false,
        message: "Transaction Not Found",
      });
      return;
    }
    res.status(200).json({
      status: true,
      data: allTransactions,
      message: "Transactions have been retrieved",
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const GetHistoryTransaction = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decodeToken = jwt.decode(token!);
    const data = decodeToken as UserData;
    const Transactions = await prisma.user.findUnique({
      where: { id: Number(data.id) },
      include: {
        Transaksi: {
          include: {
            DetailTransaksi: true,
            employee: true,
            _count: true,
          },
        },
      },
    });
    if (!Transactions) {
      res.status(404).json({
        status: false,
        message: "Transaction Not Found",
      });
      return;
    }
    res.status(200).json({
      status: true,
      data: Transactions,
      message: "Transactions History have been retrieved",
    });
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
    const { cartId, notes, paymentMethod } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    const decodeToken = jwt.decode(token!);
    const data = decodeToken as UserData;
    const checkExistingUser = await prisma.user.findUnique({
      where: { id: data.id },
    });
    if (!checkExistingUser) {
      res.status(404).json({
        status: false,
        message: "User Not Found",
      });
      return;
    }
    const checkExistingCart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        service: true,
      },
    });
    if (!checkExistingCart) {
      res.status(404).json({
        status: false,
        message: "Cart Not Found",
      });
      return;
    }

    const createTransaction = await prisma.transaksi.create({
      data: {
        user: { connect: { id: data.id } },
        cart: { connect: { id: cartId } },
        notes,
        totalAmount: checkExistingCart.service.reduce((acc, service) => acc + service.price, 0),
        paymentMethod,
        paymentStatus: "UNPAID",
        transactionStatus: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
        DetailTransaksi: {
          create: checkExistingCart.service.map((x) => ({
            servicesId: x.id,
            serviceName: x.name,
            servicePrice: x.price,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
      },
      include: {
        DetailTransaksi: true,
        user: true,
        employee: true,
      },
    });
    if (!createTransaction) {
      res.status(400).json({
        status: false,
        message: "Failed to create transaction",
      });
      return;
    }
    res.status(201).json({
      status: true,
      data: createTransaction,
      message: "Transaction has been created",
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const AddEmployeeToTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { employeeId } = req.body;
    const checkTransaction = await prisma.transaksi.findUnique({
      where: { id: Number(id) },
    });
    if (!checkTransaction) {
      res.status(404).json({
        status: false,
        message: "Transaction Not Found",
      });
      return;
    }
    const checkEmployee = await prisma.employee.findUnique({
      where: { id: Number(employeeId) },
    });
    if (!checkEmployee) {
      res.status(404).json({
        status: false,
        message: "Employee Not Found",
      });
      return;
    }
    const updateTransaction = await prisma.transaksi.update({
      where: { id: Number(id) },
      data: {
        employee: { connect: { id: Number(employeeId) } },
        updatedAt: new Date(),
      },
      include: {
        DetailTransaksi: true,
        user: true,
        employee: true,
      },
    });
    res.status(200).json({
      status: true,
      data: updateTransaction,
      message: "Employee has been added to transaction",
    });
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
    const { id } = req.params;
    const checkTransaction = await prisma.transaksi.findUnique({
      where: { id: Number(id) },
    });
    if (!checkTransaction) {
      res.status(404).json({
        status: false,
        message: "Transaction Not Found",
      });
      return;
    }
    await prisma.detailTransaksi.deleteMany({
      where: { transaksiId: Number(id) },
    });
    await prisma.transaksi.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      status: true,
      message: "Transaction has been deleted",
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
