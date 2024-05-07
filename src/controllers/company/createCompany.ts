import { createCompanyDto } from './../../interface/company/createCompany';
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import companyService from '../../services/company/companyService';

export const createCompany = async (req: Request, res: Response) => {
  const companyData: createCompanyDto = req.body;
  const token = req.cookies.jwt;
  companyData.token = token;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await companyService().createCompany(companyData);
    res.status(200).json({
      mensaje: "Empresa creada con éxito",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
}