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
ordersRouter.get("/create", async (req, res) => {
  //   const { store_name, store_address, store_image, store_description } =
  //     req.query;
  //   const newStore = {
  //     store_name,
  //     store_address,
  //     store_image,
  //     store_description,
  //     _type: "stores",
  //   };
  //   const status = await create_store(newStore);
  res.send("c");
});

export default ordersRouter;
