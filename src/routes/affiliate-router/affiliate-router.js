import express from "../../lib/express.js";
import {
  confirm_affiliate_email,
  confirm_otp,
  get_current_affiliate_id,
  confirm_affiliate_otp,
  set_affiliate_password,
} from "./features/auth.js";
import { generate_affiliate_otp } from "./features/generate-otp.js";
import {
  confirm_affiliate_companion,
  registerCompanion,
} from "./features/registerCompanion.js";
import {
  get_affiliate_stores,
  get_affiliate,
  get_affiliate_orders,
  update_affiliate_products,
} from "./features/store_features.js";
import createAffiliate from "./features/createAffiliate.js";

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

affiliateRouter.post("/edit-product", async (req, res) => {
  const { affiliate_id } = req.query;
  const data = await update_affiliate_products(affiliate_id, req.body);
  res.send(data);
});

affiliateRouter.get("/get-otp", async (req, res) => {
  const { affiliate_id } = req.query;
  const otp = await generate_affiliate_otp(affiliate_id);
  res.send({
    otp,
  });
});

affiliateRouter.get("/confirm-otp", async (req, res) => {
  const { admin_id, otp } = req.query;

  const status = await confirm_affiliate_otp(admin_id, otp);
  res.send(status);
});

affiliateRouter.get("/confirm-affiliate-email", async (req, res) => {
  const { affiliate_email, password } = req.query;

  console.log(affiliate_email);

  const status = await confirm_affiliate_email(affiliate_email, password);
  res.send(status);
});

affiliateRouter.post("/confirm-affiliate-email", async (req, res) => {
  const { affiliate_email, password } = req.body;

  console.log(affiliate_email);

  const status = await confirm_affiliate_email(affiliate_email, password);
  res.send(status);
});

affiliateRouter.get("/set-password", async (req, res) => {
  const { password, affiliate_id } = req.query;
  const status = await set_affiliate_password({ password, affiliate_id });
  res.send(status);
});

affiliateRouter.get("/create-affiliate", async (req, res) => {
  const { email } = req.query;
  const status = await createAffiliate({ email });
  res.send(status);
});

affiliateRouter.get("/register-companion", async (req, res) => {
  const { affiliate_email, expo_push_token } = req.query;

  console.log(affiliate_email);

  const data = await registerCompanion({ affiliate_email, expo_push_token });
  res.send(data);
});

affiliateRouter.get("/confirm-companion", async (req, res) => {
  const { affiliate_id } = req.query;

  console.log(affiliate_id);

  const data = await confirm_affiliate_companion({ _id: affiliate_id });
  res.send(data);
});

export default affiliateRouter;
