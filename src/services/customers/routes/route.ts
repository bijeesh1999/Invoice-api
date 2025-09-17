import { Router } from "express";
import { userSignUp, findAll, deleteCustomer } from "../controllers/controller";
import { authMiddleware } from "../../../middlewares/auth";

const router = Router();

router.post("/create", userSignUp);
router.get("/list", findAll);
router.delete("/delete/:id", deleteCustomer);


export default router;
