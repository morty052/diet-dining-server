import express from "../../lib/express.js";
import { create_like } from "./features/createLike.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

userRouter.get("/signup", async (req, res) => {
  const { email } = req.query;
  console.log(email);
  const _id = await createUser(email);
  res.send({ _id });
});

userRouter.get("/like", async (req, res) => {
  const { user_id, item_id } = req.query;
  console.log({ user_id, item_id });
  await create_like({ user_id, item_id });
  res.send({
    success: true,
  });
});

export default userRouter;
