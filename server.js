import express from "express";
import authRoutes from "./routes/auth.routes.js";
import catalogRoutes from "./routes/catalog.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
app.use(express.json());

// Default root route
app.get("/", (req, res) => {
  res.send("Backend server running successfully 🚀");
});

// Routes
app.use("/auth", authRoutes);
app.use("/catalog", catalogRoutes);
app.use("/order", orderRoutes);

// Server
app.listen(5000, () => console.log("Server running on port 5000"));
