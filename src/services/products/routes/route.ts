import { Router } from "express";
import { createProducts, findAllProduct, } from "../controllers/controller";

const router = Router();

router.post("/create", createProducts);
router.get(
  "/list",
  findAllProduct
);


export default router;
