import express from "express";
import dotenv from "dotenv";
import { sessionConfig } from "./config/session.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import salesChannelsRoutes from "./modules/sales-channels/salesChannels.routes.js";

dotenv.config();

const app = express();

// Parsowanie JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sesje
app.use(sessionConfig);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sales-channels", salesChannelsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server are running on port ${PORT}`));
