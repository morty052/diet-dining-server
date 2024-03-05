import express from "../../lib/express.js";
import {
  confirm_affiliate_email,
  confirm_otp,
  get_current_affiliate_id,
} from "./features/auth.js";
import { generate_otp } from "./features/generate-otp.js";
import {
  get_affiliate_stores,
  get_affiliate,
  get_affiliate_orders,
  update_affiliate_products,
} from "./features/store_features.js";

const affiliateRouter = express.Router();

affiliateRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

affiliateRouter.get("/get-affiliate", async (req, res) => {
  const { afilliate_id } = req.query;
  const affiliate = await get_affiliate(afilliate_id);
  res.send(affiliate);
});

affiliateRouter.get("/get-affiliate-stores", async (req, res) => {
  const { afilliate_id } = req.query;
  const data = await get_affiliate_stores(afilliate_id);
  res.send(data);
});

affiliateRouter.get("/get-affiliate-orders", async (req, res) => {
  const { afilliate_id } = req.query;
  const data = await get_affiliate_orders(afilliate_id);
  res.send(data);
});

affiliateRouter.post("/add-product", async (req, res) => {
  const { affiliate_id } = req.query;
  const data = await update_affiliate_products(affiliate_id, req.body);
  res.send(data);
});

affiliateRouter.get("/get-otp", async (req, res) => {
  const { admin_id } = req.query;
  console.log(admin_id);
  const otp = await generate_otp(admin_id);
  res.send({
    otp,
  });
});

affiliateRouter.get("/confirm-otp", async (req, res) => {
  const { admin_id, otp } = req.query;

  const status = await confirm_otp(admin_id, otp);
  res.send({
    status,
  });
});

affiliateRouter.get("/confirm-affiliate-email", async (req, res) => {
  const { affiliate_email } = req.query;

  console.log(affiliate_email);

  const status = await confirm_affiliate_email(affiliate_email);
  res.send(status);
});

export default affiliateRouter;
