import prisma from "../lib/prisma";
import { Request, Response } from "express";

export const GetAllServicesType = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const allServicesType = await prisma.servicesType.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });
    res
      .json({
        status: true,
        data: allServicesType,
        message: `Services Type has retrieved`,
      })
      .status(200);
    return;
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const GetServicesTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const checkservicesType = await prisma.servicesType.findUnique({
      where: { id: Number(id) },
    });
    if (!checkservicesType) {
      res.status(404).json({
        status: false,
        message: `Services Type Not Found`,
      });
      return;
    }
    res
      .json({
        status: true,
        data: checkservicesType,
        message: `Services Type has retrieved`,
      })
      .status(200);
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const CreateServicesType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const create = await prisma.servicesType.create({
      data: {
        name,
      },
    });
    if (!create) {
      res.status(400).json({
        status: false,
        message: `Failed to create Services Type`,
      });
      return;
    }
    res
      .json({
        status: true,
        data: create,
        message: `Services Type has created`,
      })
      .status(201);
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const UpdateServicesType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const checkServicesType = await prisma.servicesType.findUnique({
      where: { id: Number(id) },
    });
    if (!checkServicesType) {
      res.status(404).json({
        status: false,
        message: `Services Type Not Found`,
      });
      return;
    }

    const update = await prisma.servicesType.update({
      where: { id: Number(id) },
      data: { name },
    });

    res
      .json({
        status: true,
        data: update,
        message: `Services Type has updated`,
      })
      .status(200);
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const DeleteServicesType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const checkServicesType = await prisma.servicesType.findUnique({
      where: { id: Number(id) },
    });
    if (!checkServicesType) {
      res.status(404).json({
        status: false,
        message: `Services Type Not Found`,
      });
      return;
    }

    await prisma.servicesType.delete({
      where: { id: Number(id) },
    });

    res
      .json({
        status: true,
        message: `Services Type has deleted`,
      })
      .status(200);
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
