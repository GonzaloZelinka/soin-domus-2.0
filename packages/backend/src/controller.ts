import { Request, Response } from "express";
import { Types } from "mongoose";
import { Propiedad, Reclamo, Inquilino } from "shared-common";
import { MInquilino, MPropiedad, MReclamo } from "./models";
class InquilinoBackEnd extends Inquilino {
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
      return res.status(200).json(inquilino);
    } catch (error) {
      res.status(500).json({
        message: "Error al buscar inquilino",
        output: `${error}`,
      });
    }
  };
}

class PropiedadBackEnd extends Propiedad {
  static getInfoProperty = async (req: Request, res: Response) => {
    try {
      // value = inquilino / propiedad
      const { value, type } = req.query;
      const propiedadQuery = "calle_dir";
      let valueToSearch: string | Types.ObjectId = `${value}` ?? "";

      if (type === "inquilino") {
        const inquilino = await MInquilino.findOne({
          dni: { $eq: value },
        }).populate("propiedades");
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
  static añadirReclamo = async (req: Request, res: Response) => {
    try {
      const { reclamo, propiedad } = req.body;
      const propiedadResult = await MPropiedad.updateMany(
        {
          _id: `${propiedad}`,
        },
        { $push: { reclamos: reclamo } }
      );
      res.status(201).json({
        message: "Reclamo añadido",
        output: propiedadResult,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el Reclamo",
        output: `${error}`,
      });
    }
  };
}

class ReclamoBackEnd extends Reclamo {
  static setReclamo = async (req: Request, res: Response) => {
    try {
      const {
        prioridad,
        nomReclamante,
        Telefono,
        descripcion,
        atencionRequerida,
        inicioInconveniente,
        propiedad,
        fechaReclamo,
      } = req.body;
      const reclamo = new MReclamo({
        prioridad,
        nomReclamante,
        Telefono,
        descripcion,
        atencionRequerida,
        inicioInconveniente,
        propiedad,
        fechaReclamo,
      });
      const saved = await reclamo.save();
      // await Propiedad.añadirReclamo(propiedad, reclamo.id)
      res.status(201).json({
        message: "Nuevo Reclamo creado",
        output: saved,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el Reclamo",
        output: `${error}`,
      });
    }
  };
}
export { InquilinoBackEnd, PropiedadBackEnd, ReclamoBackEnd };
