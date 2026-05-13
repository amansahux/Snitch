import { Router } from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";

const DashboardRouter = Router();

DashboardRouter.get("/data", authenticateSeller, getDashboardData);

export default DashboardRouter;
