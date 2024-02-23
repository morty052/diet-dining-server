import express from "../../lib/express.js";
import { get_all_orders } from "./features/fetch-orders.js";

const ordersRouter = express.Router();

ordersRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

ordersRouter.get("/get-all", async (req, res) => {
  try {
    const orders = await get_all_orders();
    res.send(orders);
  } catch (error) {
    res.send({
      status: "ERROR",
    });
  }
});
ordersRouter.post("/create", async (req, res) => {
  console.log("this is body", req.body);
  res.send("c");
});

export default ordersRouter;
