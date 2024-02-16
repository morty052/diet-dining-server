import express from "../../lib/express.js";
import { restaurants } from "../../constants/restaurants.js";
import { get_all_stores } from "./features/fetch-store-actions.js";

const storesRouter = express.Router();

storesRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

storesRouter.get("/get-all", async (req, res) => {
  const stores = await get_all_stores();
  res.send(stores);
});

export default storesRouter;
