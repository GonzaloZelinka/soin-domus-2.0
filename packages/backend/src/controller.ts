import { Request, Response } from "express";
import { Types } from "mongoose";
import { Inquilino, Propiedad } from "./models";

const nuevoInquilino = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, telefono, email } = req.body;
    const inquilino = new Inquilino({
      nombre,
      apellido,
      telefono,
      email,
    });
    const saved = await inquilino.save();
    res.status(201).json({
      message: "Nuevo inquilino creado",
      output: saved,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear nuevo inquilino",
      output: `${error}`,
    });
  }
};

const getInfoPropiedad = async (req: Request, res: Response) => {
  try {
    // value = inquilino / propiedad
    const { value, type } = req.body;

    const propiedadQuery = type === 'inquilino' ? 'inquilino' : 'calle_dir';
    let valueToSearch: string | Types.ObjectId = value;

    if (type === "inquilino") {
      const inquilino = await Inquilino.findOne({ dni: value });
      if (!inquilino) {
        return res.status(404).json({
          message: "Inquilino no encontrado",
          output: null,
        });
      }
      valueToSearch = inquilino._id;
    }

    const propiedad = await Propiedad.findOne({ [propiedadQuery]: valueToSearch });
    if (!propiedad) {
      return res.status(404).json({
        message: "Propiedad no encontrada",
        output: null,
      });
    }

    return res.status(200).json({
      message: "Propiedad del inquilino encontrada",
      output: {
        propiedad,
      },
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al buscar propiedad",
      output: `${e}`,
    });
  }
};

export { nuevoInquilino, getInfoPropiedad };
