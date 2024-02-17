import express from "./src/lib/express.js";
import { json } from "express";
import {
  storesRouter,
  adminRouter,
  utilityRouter,
  ordersRouter,
} from "./src/routes/index.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
app.use(json());

app.use("/stores", storesRouter);
app.use("/orders", ordersRouter);
app.use("/admin", adminRouter);
app.use("/utils", utilityRouter);

app.get("/", (req, res) => {
  res.send("reached me");
});
