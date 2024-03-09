import express from "./src/lib/express.js";
import { json } from "express";
import {
  storesRouter,
  adminRouter,
  utilityRouter,
  ordersRouter,
  authRouter,
  affiliateRouter,
  webhooksRouter,
  userRouter,
} from "./src/routes/index.js";
import cors from "cors";
import { identifyMeal } from "./src/lib/gemini.js";

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
app.use("/affiliates", affiliateRouter);
app.use("/utils", utilityRouter);
app.use("/auth", authRouter);
app.use("/webhooks", webhooksRouter);
app.use("/user", userRouter);

async function sendPushNotification(expoPushToken) {
  const message = {
    to: "ExponentPushToken[OviGVrPaQmUO8KnyZe7e8M]",
    sound: "default",
    title: "God help us",
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

app.get("/", (req, res) => {
  res.send("reached me");
});
app.get("/send", async (req, res) => {
  const { url } = req.query;
  console.log(url);
  const text = await identifyMeal(url);
  console.log(text);
  // sendPushNotification("ExponentPushToken[PnNzg8Gai1SXsYmVplsTFW]");
  res.send({ text: "" });
});
app.post("/notifications", async (req, res) => {
  const message = req.body;
  console.log(message);

  const { title, body } = message;

  const notification = {
    to: "ExponentPushToken[PnNzg8Gai1SXsYmVplsTFW]",
    sound: "default",
    title,
    body,
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
      body: JSON.stringify(notification),
    });
  } catch (error) {
    console.log(error);
  }
  res.send({ "reached me": "" });
});
