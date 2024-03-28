import express from "../../lib/express.js";
import {
  confirm_admin_companion,
  register_admin_Companion,
  set_admin_password,
} from "./features/admin_auth.js";
import { fetch_affiliates } from "./features/fetch-affiliates.js";
import { fetch_orders } from "./features/fetch_orders.js";
import {
  generate_admin_otp,
  confirm_otp,
  confirm_admin_email,
  get_current_admin,
} from "./features/generate-otp.js";

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

adminRouter.get("/get-admin", async (req, res) => {
  const { admin_email } = req.query;
  const otp = await get_current_admin(admin_email);
  res.send({
    otp,
  });
});

adminRouter.get("/get-otp", async (req, res) => {
  const { admin_id } = req.query;
  console.log(admin_id);
  const otp = await generate_admin_otp(admin_id);
  res.send({
    otp,
  });
});

adminRouter.get("/confirm-otp", async (req, res) => {
  const { admin_id, otp } = req.query;

  const status = await confirm_otp(admin_id, otp);
  res.send(status);
});
adminRouter.get("/confirm-admin-email", async (req, res) => {
  const { admin_email, admin_password } = req.query;

  console.log(admin_email);

  const email = admin_email.toLowerCase();

  const status = await confirm_admin_email(email, admin_password);
  res.send(status);
});

adminRouter.post("/confirm-admin-email", async (req, res) => {
  const { admin_email, admin_password } = req.body;

  const email = admin_email.toLowerCase();
  console.log(email);

  const status = await confirm_admin_email(email, admin_password);
  res.send(status);
});

adminRouter.get("/set-password", async (req, res) => {
  const { password, admin_id } = req.query;
  const status = await set_admin_password({ password, admin_id });
  res.send(status);
});

adminRouter.get("/register-companion", async (req, res) => {
  const { admin_email, expo_push_token } = req.query;

  const data = await register_admin_Companion({
    admin_email,
    expo_push_token,
  });
  res.send(data);
});

adminRouter.get("/confirm-companion", async (req, res) => {
  const { admin_id } = req.query;

  console.log(admin_id);

  const data = await confirm_admin_companion({ _id: admin_id });
  res.send(data);
});

adminRouter.get("/get-all-affiliates", async (req, res) => {
  const { status, data } = await fetch_affiliates();
  res.send({ status, data });
});

adminRouter.get("/get-all-orders", async (req, res) => {
  console.log("reached");
  const { status, data } = await fetch_orders();
  res.send({ status, data });
});

export default adminRouter;
