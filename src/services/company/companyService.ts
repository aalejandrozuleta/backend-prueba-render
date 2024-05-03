import companyRepositories from "../../repositories/companyRepositories";
// ----- Interface
import { createCompanyDto } from "./../../interface/company/createCompany";

// ----- Utils
import { EmailService } from "../../helpers/emailService";
import { verifyToken } from "../../helpers/verifyToken";

// Definimos los mensajes de error como constantes
const ERROR_MESSAGES = {
  USER_NOT_TYPE: "Acceso denegado para este Usuario",
};

export default () => {
  const CompanyRepositories = companyRepositories();
  const EmailServices = new EmailService();
  return {
    createCompany: async (company: createCompanyDto) => {
      const decoded: any = verifyToken(company.token);
      const id_user = decoded.id;

      if (decoded.type_user != "Comerciante") {
        throw new Error(ERROR_MESSAGES.USER_NOT_TYPE);
      }

      const createdCompany = await CompanyRepositories.CreateCompany(
        company,
        id_user
      );
      await EmailServices.sendWelcomeCompany(decoded.email);

      return {
        createdCompany,
      };
    },
  };
};
