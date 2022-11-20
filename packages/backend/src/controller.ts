import { Request, Response } from "express";
import { Types } from "mongoose";
import { MInquilino, MPropiedad } from "./models";

class Inquilino {
  static getInquilino = async (req: Request, res: Response) => {
    try {
      const { refInquilino } = req.query;
      const valueToSearch: Types.ObjectId | string = `${refInquilino}`;
      const inquilino = await MInquilino.findOne({ _id: valueToSearch });
      if (!inquilino) {
        return res.status(404).json({
          message: "Inquilino no encontrado",
          output: [],
        });
      }
      return res.status(200).json({
        message: "inquilino encontrado",
        output: {
          inquilino: inquilino,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al buscar inquilino",
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

      const propiedadQuery = "calle_dir";
      let valueToSearch: string | Types.ObjectId = `${value}` ?? "";

      if (type === "inquilino") {
        const inquilino = await MInquilino.findOne({ dni: value }).populate(
          "propiedades"
        );
        // console.log(inquilino)
        if (!inquilino || !inquilino.propiedades?.length) {
          return res.status(404).json({
            message: "Inquilino no encontrado",
            output: [],
          });
        }
        return res.status(200).json({
          message: "Propiedades encontradas",
          output: {
            propiedades: inquilino.propiedades,
          },
        });
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
