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
} from "./src/routes/index.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  get_single_store,
  get_single_store_preview,
} from "./src/routes/stores-router/features/fetch-store-actions.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// const server = createServer(app);
// const io = new Server(server,{
//   cors: {
//     origin: "*",
//   },
// });

// const io = new Server("4000", {
//   cors: {
//     origin: "*",
//   },
// });

// const admin = io.of("/admin");

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// admin.on("connection", (socket) => {
//   socket.on("handshake", async (data) => {
//     const { _id } = data;

//     await socket.join(`admin_${_id}`);
//   });

//   socket.on("connect_admin", async (data, cb) => {
//     const { _id } = data;

//     await socket.join(`admin_${_id}`);

//     console.log("admin connected", _id);
//     cb();
//   });

//   socket.on("connect_companion", async (data, cb) => {
//     const { _id } = data;

//     await socket.join(`companion_${_id}`);

//     console.log("companion connected", _id);
//     cb();
//   });

//   socket.on("send_store_name", async (data, cb) => {
//     const { _id, store_name } = data;
//     socket.to(`companion_${_id}`).emit("store_name_received", { store_name });
//     console.log(store_name);
//   });

//   socket.on("send_store_tag", async (data, cb) => {
//     const { _id, tag } = data;
//     socket.to(`companion_${_id}`).emit("store_tag_received", tag);
//     console.log(tag);
//   });

//   socket.on("sync", async (data, cb) => {
//     const { _id } = data;
//     // const store = await get_single_store_preview(_id);
//     const store = {
//       store_name: "test",
//       store_image: "",
//     };
//     socket.to(`admin_${_id}`).emit("synced", store);
//     socket.to(`companion_${_id}`).emit("synced", { store });
//     console.log("synced", _id);
//     cb(store);
//   });
// });

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

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
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
app.get("/send", (req, res) => {
  sendPushNotification("ExponentPushToken[PnNzg8Gai1SXsYmVplsTFW]");
  res.send({ "reached me": "" });
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
