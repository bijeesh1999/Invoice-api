import { Router } from "express";
import { userSignUp, findAll } from "../controllers/controller";
import { authMiddleware } from "../../../middlewares/auth";

const router = Router();

router.post("/create", userSignUp);
router.get("/list", findAll);

export default router;
