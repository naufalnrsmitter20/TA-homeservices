import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      res.status(401).json({
        status: false,
        message: "Invalid password",
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        status: false,
        message: "Email already in use",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
export const Logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
