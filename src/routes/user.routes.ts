import { Router } from "express";

import { CreateRootUserController } from "../modules/users/controllers/CreateRootUserController";
import { CreateAssociationGlobalUserController } from "../modules/users/controllers/CreateAssociationGlobalUserController";
import { CreateTechnicianGeneralUserController } from "../modules/users/controllers/CreateTechnicianGeneralUserController";
import { CreateAssociationUserController } from "../modules/users/controllers/CreateAssociationUserController";
import { CreateAssociationTechnicianController } from "../modules/users/controllers/CreateTechnicianAssociationUserController";
import { CreateCompanyUserController } from "../modules/users/controllers/CreateCompanyUserController";
import { GenerateCompanyTokenController } from "../modules/users/controllers/GenerateCompanyTokenController";
import { AuthenticateUserController } from "../modules/users/controllers/AuthenticateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import { ensureIsRoot } from "../middlewares/ensureIsRoot";
import { ensureIsTechnicianAssociation } from "../middlewares/ensureIsTechnicianAssociation";
import { GenerateTechnicianTokenController } from "../modules/users/controllers/GenerateTechnicianTokenController";

const userRoutes = Router();

const createRootUserController = new CreateRootUserController();
const createAssociationGlobalUserController = new CreateAssociationGlobalUserController();
const createTechnicianGeneralUserController = new CreateTechnicianGeneralUserController();
const createAssociationUserController = new CreateAssociationUserController();
const createTechnicianAssociationUserController = new CreateAssociationTechnicianController();
const createCompanyUserController = new CreateCompanyUserController();
const generateCompanyTokenController = new GenerateCompanyTokenController();
const generateTechnicianTokenUseCase = new GenerateTechnicianTokenController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post("/auth", (req, res) => authenticateUserController.handle(req, res));

userRoutes.post("/create-root", (req, res) => {
  return createRootUserController.handle(req, res);
});

userRoutes.post("/create-association-global", ensureAuthenticated, ensureIsRoot, (req, res) => {
  return createAssociationGlobalUserController.handle(req, res);
});

userRoutes.post("/create-technician-general", ensureAuthenticated, ensureIsRoot, (req, res) => {
  return createTechnicianGeneralUserController.handle(req, res);
});

userRoutes.post("/create-association", ensureAuthenticated, ensureIsRoot, (req, res) => {
  return createAssociationUserController.handle(req, res);
});

userRoutes.post("/create-technician-association", ensureAuthenticated, ensureIsRoot, (req, res) => {
  return createTechnicianAssociationUserController.handle(req, res);
});

userRoutes.post("/generate-token", ensureAuthenticated, (req, res) => {
  return generateCompanyTokenController.handle(req, res);
});

userRoutes.post("/generate-technician-token", ensureAuthenticated, (req, res) => {
  return generateCompanyTokenController.handle(req, res);
});

userRoutes.post("/create-company",ensureAuthenticated, (req, res) => {
  return createCompanyUserController.handle(req, res);
});

export { userRoutes };
