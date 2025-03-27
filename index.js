import env from "dotenv";
env.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import MongoDbConnection from "./db/server.js";
import blogRoutes from "./routes/blog.routes.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes.js";
const app = express();

// PORT
const PORT = process.env.PORT || 8080;

//MongoDb
MongoDbConnection(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully MongoDb Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//Routes
app.get("/api/v1", (req, res) => {
  return res.send("Welcome Blog Web Api");
});

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/profile", userRoutes);

// Error Handling

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  return res.status(status).json({ error: true, success: false, message });
});

// Listen
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Started PORT on ${PORT}`);
});
