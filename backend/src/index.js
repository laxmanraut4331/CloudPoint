
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

//Routes
import authRoutes from "./routes/auth.js";
import fileSharingRoutes from "./routes/filesharing.route.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const app = express();

app.use(express.json());

// For form data (optional)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cloudpoint2.onrender.com"],
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/files", fileSharingRoutes);
//PORT:
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
