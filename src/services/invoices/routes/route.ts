import { Router } from "express";
import { createInvoice, findAllInvoice } from "../controllers/controller";

const router = Router();

router.post("/create", createInvoice);
router.get("/list", findAllInvoice);

export default router;
