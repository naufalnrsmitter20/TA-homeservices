import { Request, Response } from "express";
import prisma from "../lib/prisma";
import cloudinary from "../utils/cloudinary";
import streamifier from "streamifier";

export const GetAllService = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const allServices = await prisma.service.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });
    res
      .json({
        status: true,
        data: allServices,
        message: `Services have been retrieved`,
      })
      .status(200);
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
    const { id } = req.params;
    const checkService = await prisma.service.findUnique({
      where: { id: Number(id) },
    });
    if (!checkService) {
      res.status(404).json({
        status: false,
        message: `Service Not Found`,
      });
      return;
    }
    res
      .json({
        status: true,
        data: checkService,
        message: `Service has been retrieved`,
      })
      .status(200);
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
    const file = req.file;
    if (!file || !file.buffer) {
      res.status(400).json({
        status: false,
        message: "Image file is required",
      });
      return;
    }
    const { name, description, price, servicesTypeId } = req.body;

    const findServicesType = await prisma.servicesType.findUnique({
      where: { id: Number(servicesTypeId) },
    });

    if (!findServicesType) {
      res.status(404).json({
        status: false,
        message: `Services Type Not Found`,
      });
      return;
    }

    let imageUrl: string | null = null;
    if (file && file.buffer) {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "uploads",
            public_id: file.originalname.split(".")[0],
            resource_type: "image",
            upload_preset: "ml_default",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      imageUrl = result.secure_url;
    }

    const create = await prisma.service.create({
      data: {
        name: name ?? "",
        description: description ?? "",
        price: price ? Number(price) : 0,
        attachment: imageUrl ?? undefined,
        ServicesType: {
          connect: { id: Number(servicesTypeId) },
        },
      },
    });

    res.status(201).json({
      status: true,
      data: create,
      message: `Service has been created`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
    return;
  }
};
export const UpdateService = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { id } = req.params;
    if (!file || !file.buffer) {
      res.status(400).json({
        status: false,
        message: "Image file is required",
      });
      return;
    }
    const { name, description, price, servicesTypeId } = req.body;

    const findServicesType = await prisma.servicesType.findUnique({
      where: { id: Number(servicesTypeId) },
    });

    if (!findServicesType) {
      res.status(404).json({
        status: false,
        message: `Services Type Not Found`,
      });
      return;
    }

    let imageUrl: string | null = null;
    if (file && file.buffer) {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "uploads",
            public_id: file.originalname.split(".")[0],
            resource_type: "image",
            upload_preset: "ml_default",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      imageUrl = result.secure_url;
    }

    const create = await prisma.service.create({
      data: {
        name: name ?? "",
        description: description ?? "",
        price: price ? Number(price) : 0,
        attachment: imageUrl ?? undefined,
        ServicesType: {
          connect: { id: Number(servicesTypeId) },
        },
      },
    });

    res.status(201).json({
      status: true,
      data: create,
      message: `Service has been created`,
    });
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
    const { id } = req.params;
    const checkService = await prisma.service.findUnique({
      where: { id: Number(id) },
    });
    if (!checkService) {
      res.status(404).json({
        status: false,
        message: `Service Not Found`,
      });
      return;
    }
    await prisma.service.delete({
      where: { id: Number(id) },
    });
    res
      .json({
        status: true,
        message: `Service has been deleted`,
      })
      .status(200);
  } catch (error) {
    console.log(error as Error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
