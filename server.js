import express from "express";
import dotenv from "dotenv";
import signupRoute from "./routes/signupRoute.js";
import signinRoute from "./routes/signInRoute.js";
import accountRoute from "./routes/accountRoute.js";

dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());

app.use("/api/auth", signupRoute);
app.use("/api/auth", signinRoute);
app.use("/api/account", accountRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});
