import express from "../../lib/express.js";
import { generate_otp, confirm_otp } from "./features/generate-otp.js";

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
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

export default adminRouter;
