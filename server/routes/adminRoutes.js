import express from "express";
import {
  createCar,
  getCars,
  updateCar,
  deleteCar,
} from "../controllers/adminController.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(authenticateToken);
router.use(authorizeAdmin);

router.post("/cars", createCar);
router.get("/cars", getCars);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

export default router;
