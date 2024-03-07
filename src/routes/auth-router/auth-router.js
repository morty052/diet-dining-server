import express from "../../lib/express.js";
import { createUser } from "./createUser.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

authRouter.get("/signup", async (req, res) => {
  const { email, expo_push_token } = req.query;
  console.log(email, expo_push_token);
  const _id = await createUser(email, expo_push_token);
  res.send({ _id });
});

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const _id = await createUser(req.body);
  res.send({ _id });
});

export default authRouter;
