import express from "../../lib/express.js";
import { uploadFile } from "../../lib/sanityClient.js";
import { broadcast_all_users } from "../../notifications/broadcast.js";

const utilityRouter = express.Router();

utilityRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

utilityRouter.get("/get-all", async (req, res) => {
  const stores = await get_all_stores();
  res.send(stores);
});

utilityRouter.get("/register-companion", async (req, res) => {
  const stores = await get_all_stores();
  res.send(stores);
});

utilityRouter.post("/notifications/broadcast", async (req, res) => {
  const { body, title } = req.body;
  console.log(body, title, "broadcast");
  const data = await broadcast_all_users({ body, title });
  // const data = {};
  res.send(data);
});

utilityRouter.post("/notifications/schedule", async (req, res) => {
  const { body, title } = req.body;
  // const data = await broadcast_all_users({ body, title });
  console.log(body, title, "schedule");
  const data = {};
  res.send(data);
});

export default utilityRouter;
