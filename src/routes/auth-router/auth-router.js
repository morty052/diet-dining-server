import express from "../../lib/express.js";

const authRouter = express.Router();

storesRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

export default authRouter;
