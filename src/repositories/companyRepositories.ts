import { createCompanyDto } from "./../interface/company/createCompany";
import db from "../config/mysqlConfig";
export default () => ({
  CreateCompany: async (company: createCompanyDto, id_user: number) => {
    console.log({ company: company, id: id_user });
    const query = "CALL CreateCompany(?,?,?,?,?)";
    const values = [
      company.company_name,
      company.company_description,
      company.company_address,
      company.company_phone,
      id_user,
    ];
    return db.query(query, values);
  },
});
