import session from "express-session";

const isProd = process.env.NODE_ENV === "production";

export const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "dev_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax", // żeby działało cross-origin,
    maxAge: 1000 * 60 * 60, // 1h
  },
});
