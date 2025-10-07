import express from "express";
import dotenv from "dotenv";
import { sessionConfig } from "./config/session.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import salesChannelsRoutes from "./modules/sales-channels/salesChannels.routes.js";
import purchaseReportsRoutes from "./modules/purchase-reports/purchaseReports.routes.js";
import mediaRoutes from "./modules/media/media.routes.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sales-channels", salesChannelsRoutes);
app.use("/api/purchase-reports", purchaseReportsRoutes);
app.use("/api/media", mediaRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server are running on port ${PORT}`));
