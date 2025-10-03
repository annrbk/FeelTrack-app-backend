import express from "express";
import dotenv from "dotenv";
import signupRoute from "./routes/signupRoute.js";

dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());

app.use("/api/auth", signupRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});
