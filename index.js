import env from "dotenv";
env.config();
import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/auth.routes.js";
import MongoDbConnection from "./db/server.js";
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
app.use(morgan("tiny"));

//Routes
app.get("/api/v1", (req, res) => {
  return res.send("Welcome Blog Web Api");
});

app.use("/api/v1/users", userRoutes);

// Error Handling

app.use(async (err, req, res, next) => {
  const { status, message } = err;
  return res.status(status).json({ error: true, success: false, message });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server Started PORT on ${PORT}`);
});
