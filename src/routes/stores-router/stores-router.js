import express from "../../lib/express.js";
import { get_all_stores } from "./features/fetch-store-actions.js";
import { create_store } from "./features/store-onboarding-actions.js";

const storesRouter = express.Router();

storesRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

storesRouter.get("/get-all", async (req, res) => {
  const stores = await get_all_stores();
  res.send(stores);
});
storesRouter.get("/create", async (req, res) => {
  const { store_name, store_address, store_image, store_description } =
    req.query;
  const newStore = {
    store_name,
    store_address,
    store_image,
    store_description,
    _type: "stores",
  };
  const status = await create_store(newStore);
  res.send(status);
});

export default storesRouter;
