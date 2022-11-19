import { Request, Response } from "express";
import { Inquilino } from "./models";

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
  try{
    const {value, type} = req.body 
    let PropInq: object[]
    if (type === 'inquilino') {
      PropInq = await 
    }
    else {
      ...
    }
  }
}

export { nuevoInquilino };
