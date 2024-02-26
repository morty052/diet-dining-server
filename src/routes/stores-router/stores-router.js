import express from "../../lib/express.js";
import {
  get_all_stores,
  get_single_product,
  get_single_store,
  get_stores_search_array,
  get_product_search_array,
} from "./features/fetch-store-actions.js";
import { create_store } from "./features/store-onboarding-actions.js";

const storesRouter = express.Router();

storesRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

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
