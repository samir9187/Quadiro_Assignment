import express from "express";
import { getCars } from "../controllers/userController.js";

const router = express.Router();

router.get("/cars", getCars);

export default router;
