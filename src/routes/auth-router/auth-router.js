import express from "../../lib/express.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

export default authRouter;
