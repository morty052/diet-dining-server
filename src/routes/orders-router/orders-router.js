import express from "../../lib/express.js";
import { create_order } from "./features/create-order.js";
import { get_all_orders } from "./features/fetch-orders.js";
import { update_order_status } from "./features/update-order-status.js";

const ordersRouter = express.Router();

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Order sent to vendor",
    body: "Thanks for placing an order.",
    data: { someData: "goes here" },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error);
  }
  console.log("sent");
}

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
  const { vendor, user_id } = req.body;
  await create_order({
    store_id: "bda93bf7-3060-46fd-bee4-692cabba7299",
    user_id,
    vendor,
  });
  console.log("created");
  // sendPushNotification("ExponentPushToken[ruarKdODJs7pAeDo4pW58P]");
  res.send("c");
});
ordersRouter.post("/update-status", async (req, res) => {
  const { status, _id } = req.body;
  console.log(req.body);
  await update_order_status(_id, status);
  res.send({ cool: "" });
});

export default ordersRouter;
