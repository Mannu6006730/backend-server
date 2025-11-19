import express from "express";
import cors from "cors"; // ← CORS import
import authRoutes from "./routes/auth.routes.js";
import catalogRoutes from "./routes/catalog.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
app.use(express.json());

// Enable CORS for frontend
const allowedOrigins = [
  "http://72.60.102.213:3000",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


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
