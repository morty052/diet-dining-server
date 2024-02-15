import express from "./src/lib/express.js";
import { json } from "express";
import { restaurantRouter, adminRouter } from "./src/routes/index.js";

const app = express();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
app.use(json());

app.use("/restaurant", restaurantRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("reached me");
});
