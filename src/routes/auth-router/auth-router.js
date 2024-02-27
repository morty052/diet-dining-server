import express from "../../lib/express.js";
import { createUser } from "./createUser.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

authRouter.get("/signup", async (req, res) => {
  const { email } = req.query;
  console.log(email);
  const _id = await createUser(email);
  res.send({ _id });
});

export default authRouter;
