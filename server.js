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
import {
  identifyMeal,
  writeMealDescription,
  write_about_meal,
} from "./src/lib/gemini.js";
import sanityClient from "./src/lib/sanityClient.js";
import { getDistanceBetween } from "./src/utils/get-distance-between.js";
import { get_top_stores_around_user } from "./src/routes/stores-router/features/fetch-store-actions.js";
import { supabase } from "./src/lib/supabase.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.listen(process.env.PORT || 3000, () => {
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
    to: "ExponentPushToken[7VD4FSIKmiEleVcdQyNgzI]",
    sound: "default",
    title: "Hello there",
    body: "Did you get this one too ?.",
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

app.get("/", async (req, res) => {
  // const { meal_name } = req.query;
  // const data = await writeMealDescription(meal_name);
  res.send("reachead restaurant young dev");
});

app.get("/write_about_meal", async (req, res) => {
  const { meal_name } = req.query;
  const data = await write_about_meal(meal_name);
  res.send({
    data: {
      response: data,
    },
  });
});

app.get("/meal", async (req, res) => {
  const { url } = req.query;
  const data = await identifyMeal(url);
  res.send({ data });
});

app.get("/send-email", async (req, res) => {
  const { username, code, to } = req.query;
  console.log(code);
  const { data, error } = await supabase.functions.invoke("resend", {
    body: { username, code, to },
  });
  res.send({ data });
});

app.get("/send", async (req, res) => {
  const { lat, lng } = req.query;
  // console.log(url);
  // const text = await identifyMeal(url);
  // console.log(text);
  await sendPushNotification();
  // const encodedURI = encodeURI(url);
  // console.log(encodedURI);
  // const query = `geo::distance(geo::latLng(7.4367586, 3.970707), geo::latLng(7.4367505, 3.970707))`;
  // const data = await sanityClient.fetch(query);
  const data = {};
  res.send({ data });
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
