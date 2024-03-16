import express from "../../lib/express.js";
import { createUser } from "./createUser.js";
import { handleLogin } from "./login.js";

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

authRouter.get("/signin", async (req, res) => {
  const { user_email, user_password } = req.query;
  console.log("reached");
  const data = await handleLogin({
    email: user_email,
    password: user_password,
  });
  res.send(data);
});

export default authRouter;
