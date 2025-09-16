import { Router } from "express";
import customerRoutes from "./services/customers/routes/route";
import productRoutes from "./services/products/routes/route";
import invoiceRoutes from "./services/invoices/routes/route";

const router = Router();

// Use the invoice router
router.use("/customer", customerRoutes);
router.use("/product", productRoutes);
router.use("/invoice", invoiceRoutes);

export default router;
