import { Request, Response } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import { UserData } from "../lib/interfaces";

export const GetAllCartUser = async (req: Request, res: Response) => {
  try {
    const allCarts = await prisma.user.findMany({
      include: {
        Cart: {
          include: {
            service: true,
            _count: true,
          },
        },
      },
    });
    res.status(200).json({
      status: true,
      data: allCarts,
      message: "All carts have been retrieved",
    });
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
    const token = req.headers["authorization"]?.split(" ")[1];
    const decodeToken = jwt.decode(token!);
    const data = decodeToken as UserData;

    const checkCart = await prisma.user.findUnique({
      where: { id: Number(data.id) },
      include: {
        Cart: {
          include: {
            service: true,
            _count: true,
          },
        },
      },
    });
    if (!checkCart) {
      res.status(404).json({
        status: false,
        message: "Cart Not Found",
      });
      return;
    }
    res.status(200).json({
      status: true,
      data: checkCart,
      message: "Cart has been retrieved",
    });
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
    const { serviceId }: { serviceId: [] } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    const decodeToken = jwt.decode(token!);
    const data = decodeToken as UserData;
    const checkExistingUser = await prisma.user.findUnique({
      where: { id: Number(data.id) },
      include: {
        Cart: true,
      },
    });
    if (!checkExistingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const checkExistingService = await prisma.service.findMany({
      where: { id: { in: serviceId } },
    });

    if (checkExistingService.length !== serviceId.length) {
      res.status(400).json({ message: "Some service IDs are invalid" });
      return;
    }
    if (checkExistingUser.Cart?.id) {
      const existingCart = await prisma.cart.findUnique({
        where: { id: checkExistingUser.Cart.id },
        include: {
          service: true,
        },
      });
      if (!existingCart) {
        res.status(404).json({ message: "Cart not found" });
        return;
      }
      const updatedCart = await prisma.cart.update({
        where: { id: existingCart.id },
        data: {
          service: {
            connect: serviceId.map((id: number) => ({ id })),
            disconnect: existingCart.service.filter((service) => !serviceId.includes(service.id as never)).map((service) => ({ id: service.id })),
          },
          updatedAt: new Date(),
          totalAmount: checkExistingService.reduce((total, service) => total + service.price, 0),
        },
        include: {
          service: true,
        },
      });
      res.status(200).json({
        status: true,
        data: updatedCart,
        message: "Service has been updated to cart",
      });
    } else {
      const newCart = await prisma.cart.create({
        data: {
          userId: Number(data.id),
          service: {
            connect: serviceId.map((id: number) => ({ id })),
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          totalAmount: checkExistingService.reduce((total, service) => total + service.price, 0),
        },
        include: {
          service: true,
        },
      });
      res.status(201).json({
        status: true,
        data: newCart,
        message: "Service has been added to cart",
      });
    }
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const UpdateCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { serviceId }: { serviceId: [] } = req.body;
    const checkCart = await prisma.cart.findUnique({
      where: { id: Number(id) },
    });
    if (!checkCart) {
      res.status(404).json({
        status: false,
        message: "Cart Not Found",
      });
      return;
    }
    const checkExistingService = await prisma.service.findMany({
      where: { id: { in: serviceId } },
    });
    if (checkExistingService.length !== serviceId.length) {
      res.status(400).json({ message: "Some service IDs are invalid" });
      return;
    }
    const updatedCart = await prisma.cart.update({
      where: { id: Number(id) },
      data: {
        service: {
          set: [],
          connect: serviceId.map((id: number) => ({ id })),
        },
        updatedAt: new Date(),
        totalAmount: checkExistingService.reduce((total, service) => total + service.price, 0),
      },
      include: {
        service: true,
      },
    });
    res.status(200).json({
      status: true,
      data: updatedCart,
      message: "Cart has been updated",
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const DeleteCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const checkCart = await prisma.cart.findUnique({
      where: { id: Number(id) },
    });
    if (!checkCart) {
      res.status(404).json({
        status: false,
        message: "Cart Not Found",
      });
      return;
    }
    await prisma.cart.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      status: true,
      message: "Cart has been deleted",
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
