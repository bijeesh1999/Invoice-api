import { Router } from "express";
import { createProducts, deleteProduct, findAllProduct } from "../controllers/controller";

const router = Router();

router.post("/create", createProducts);
router.get("/list", findAllProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
