import express from "../../lib/express.js";
import { get_affiliate_store } from "../../lib/sanityClient.js";
import {
  get_all_stores,
  get_single_product,
  get_single_store,
  get_stores_search_array,
  get_product_search_array,
} from "./features/fetch-store-actions.js";
import {
  create_store,
  delete_store,
} from "./features/store-onboarding-actions.js";

const storesRouter = express.Router();

storesRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "That easy Yeah ?",
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

storesRouter.get("/get-all", async (req, res) => {
  const stores = await get_all_stores();

  res.send(stores);
});

storesRouter.get("/get-single", async (req, res) => {
  try {
    const { store_id } = req.query;
    const store = await get_single_store(store_id);
    res.send(store);
  } catch (error) {
    res.send({
      status: "ERROR",
      message: error,
    });
  }
});

storesRouter.get("/get-single-product", async (req, res) => {
  try {
    const { product_id } = req.query;
    const product = await get_single_product(product_id);
    res.send(product);
  } catch (error) {
    res.send({
      status: "ERROR",
      message: error,
    });
  }
});

storesRouter.get("/search-stores", async (req, res) => {
  try {
    const stores = await get_stores_search_array();
    res.send(stores);
  } catch (error) {
    res.send({
      status: "ERROR",
      message: error,
    });
  }
});

storesRouter.get("/search-products", async (req, res) => {
  try {
    const products = await get_product_search_array();
    res.send(products);
  } catch (error) {
    res.send({
      status: "ERROR",
      message: error,
    });
  }
});

storesRouter.post("/create", async (req, res) => {
  const newStore = req.body;

  const _id = await create_store(newStore);

  res.send({ _id });
});

storesRouter.get("/create-category", async (req, res) => {
  const { category, affiliate_id } = req.query;

  const store_id = await get_affiliate_store(affiliate_id);
  console.log("got store with", store_id);

  res.send({
    message: ` created ${category}`,
  });
});

storesRouter.get("/like", async (req, res) => {
  const { user_id, item_id } = req.query;

  res.send({ user_id, item_id });
});

storesRouter.get("/delete", async (req, res) => {
  await delete_store();
  res.send({ user_id: "item_id " });
});

export default storesRouter;
