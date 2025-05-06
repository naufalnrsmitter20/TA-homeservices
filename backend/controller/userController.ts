import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

export const getAllUsers = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const allUser = await prisma.user.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });

    response
      .json({
        status: true,
        data: allUser,
        message: `user has retrieved`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

export const getUserById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const checkUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!checkUser) {
      response
        .json({
          status: false,
          message: `User Not Found`,
        })
        .status(400);
      return;
    }

    response
      .json({
        status: true,
        data: checkUser,
        message: `user has retrieved`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

export const createUser = async (request: Request, response: Response) => {
  try {
    /** get requested data (data has been sent from request) */
    const { name, email, password, role } = request.body;

    const findEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (findEmail) {
      response.status(403).json({ status: false, message: `Email already exists` });
      return;
    }

    const newUser = await prisma.user.create({
      data: { name, email, password: await bcrypt.hash(password, 10), role },
    });

    response
      .json({
        status: true,
        data: newUser,
        message: `New user has created`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

export const updateUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, password, role } = request.body;

    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser) {
      response.status(404).json({ status: false, message: `user is not found` });
      return;
    }

    const updatedUser = await prisma.user.update({
      data: {
        name: name || findUser.name,
        email: email || findUser.email,
        password: password ? await bcrypt.hash(password, 10) : findUser.password,
        role: role || findUser.role,
      },
      where: { id: Number(id) },
    });

    response
      .json({
        status: true,
        data: updatedUser,
        message: `user has updated`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);

    response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser) {
      response.status(200).json({ status: false, message: `user is not found` });
      return;
    }
    const deleteduser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    response
      .json({
        status: true,
        data: deleteduser,
        message: `user has deleted`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
    return;
  }
};

// export const authentication = async (request: Request, response: Response) => {
//   try {
//     const { email, password } = request.body; /** get requested data (data has been sent from request) */

//     /** find a valid admin based on username and password */
//     const findUser = await prisma.user.findFirst({
//       where: { email, password: md5(password) },
//     });

//     /** check is admin exists */
//     if (!findUser) return response.status(200).json({ status: false, logged: false, message: `Email or password is invalid` });

//     let data = {
//       id: findUser.id,
//       name: findUser.name,
//       email: findUser.email,
//       role: findUser.role,
//       profile_picture: findUser.profile_picture,
//     };

//     /** define payload to generate token */
//     let payload = JSON.stringify(data);

//     /** generate token */
//     let token = sign(payload, SECRET || "joss");

//     return response.status(200).json({ status: true, logged: true, data: data, message: `Login Success`, token });
//   } catch (error) {
//     return response
//       .json({
//         status: false,
//         message: `There is an error. ${error}`,
//       })
//       .status(400);
//   }
// };
