import express from "../../lib/express.js";
import { uploadFile } from "../../lib/sanityClient.js";

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

export default utilityRouter;
