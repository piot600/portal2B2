import express from "express";
import dotenv from "dotenv";
import { sessionConfig } from "./config/session.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import salesChannelsRoutes from "./modules/sales-channels/salesChannels.routes.js";
import purchaseReportsRoutes from "./modules/purchase-reports/purchaseReports.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sales-channels", salesChannelsRoutes);
app.use("/api/purchase-reports", purchaseReportsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server are running on port ${PORT}`));
