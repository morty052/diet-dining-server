import express from "../../lib/express.js";
import { fetch_affiliates } from "./features/fetch-affiliates.js";
import { fetch_orders } from "./features/fetch_orders.js";
import {
  generate_otp,
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
  const otp = await generate_otp(admin_id);
  res.send({
    otp,
  });
});

adminRouter.get("/confirm-otp", async (req, res) => {
  const { admin_id, otp } = req.query;

  const status = await confirm_otp(admin_id, otp);
  res.send({
    status,
  });
});
adminRouter.get("/confirm-admin-email", async (req, res) => {
  const { admin_email } = req.query;

  console.log(admin_email);

  const status = await confirm_admin_email(admin_email);
  res.send(status);
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
