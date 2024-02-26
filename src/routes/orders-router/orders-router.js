import express from "../../lib/express.js";
import { create_order } from "./features/create-order.js";
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
  const { vendor } = req.body;
  await create_order("bda93bf7-3060-46fd-bee4-692cabba7299", vendor);
  res.send("c");
});

export default ordersRouter;
