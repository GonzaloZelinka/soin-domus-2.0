import { Request, Response } from "express";
import { Types } from "mongoose";
import { MInquilino, MPropiedad } from "./models";

class Inquilino {
  static nuevoInquilino = async (req: Request, res: Response) => {
    try {
      const { nombre, apellido, telefono, email } = req.body;
      const inquilino = new MInquilino({
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
}

class Propiedad {
  static getInfoProperty = async (req: Request, res: Response) => {
    try {
      // value = inquilino / propiedad
      const { value, type } = req.query;

      const propiedadQuery = type === "inquilino" ? "inquilino" : "calle_dir";
      let valueToSearch: string | Types.ObjectId = `${value}` ?? '';

      if (type === "inquilino") {
        const inquilino = await MInquilino.findOne({ dni: value }).populate('propiedades');
        if (!inquilino) {
          return res.status(404).json({
            message: "Inquilino no encontrado",
            output: [],
          });
        }
        valueToSearch = inquilino._id;
      }
      
      const propiedades = await MPropiedad.find({
        [propiedadQuery]: valueToSearch,
      });

      if (!propiedades || !propiedades.length) {
        return res.status(404).json({
          message: "Ninguna propiedad encontrada",
          output: [],
        });
      }

      return res.status(200).json({
        message: "Propiedades del inquilino encontrada",
        output: {
          propiedades,
        },
      });
    } catch (e) {
      res.status(500).json({
        message: "Error al buscar propiedad",
        output: `${e}`,
      });
    }
  };
}

export { Inquilino, Propiedad };
