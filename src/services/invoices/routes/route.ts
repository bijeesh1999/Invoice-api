import { Router } from "express";
import {
  createInvoice,
  deleteInvoice,
  findAllInvoice,
} from "../controllers/controller";

const router = Router();

router.post("/create", createInvoice);
router.get("/list", findAllInvoice);
router.delete("/delete/:id", deleteInvoice);

export default router;
