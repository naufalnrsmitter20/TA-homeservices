import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const allUser = await prisma.user.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });

    res
      .json({
        status: true,
        data: allUser,
        message: `user has retrieved`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    res
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const checkUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!checkUser) {
      res
        .json({
          status: false,
          message: `User Not Found`,
        })
        .status(400);
      return;
    }

    res
      .json({
        status: true,
        data: checkUser,
        message: `user has retrieved`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    res
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    /** get requested data (data has been sent from request) */
    const { name, email, password, role } = req.body;

    const findEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (findEmail) {
      res.status(403).json({ status: false, message: `Email already exists` });
      return;
    }

    const newUser = await prisma.user.create({
      data: { name, email, password: await bcrypt.hash(password, 10), role, createdAt: new Date(), updatedAt: new Date() },
    });

    res
      .json({
        status: true,
        data: newUser,
        message: `New user has created`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    res
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser) {
      res.status(404).json({ status: false, message: `user is not found` });
      return;
    }

    const updatedUser = await prisma.user.update({
      data: {
        name: name || findUser.name,
        email: email || findUser.email,
        password: password ? await bcrypt.hash(password, 10) : findUser.password,
        role: role || findUser.role,
        updatedAt: new Date(),
      },
      where: { id: Number(id) },
    });

    res
      .json({
        status: true,
        data: updatedUser,
        message: `user has updated`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);

    res
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser) {
      res.status(200).json({ status: false, message: `user is not found` });
      return;
    }
    const deleteduser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res
      .json({
        status: true,
        data: deleteduser,
        message: `user has deleted`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    res
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};
