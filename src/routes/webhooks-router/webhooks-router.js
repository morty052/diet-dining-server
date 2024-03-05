import express from "../../lib/express.js";

const webhooksRouter = express.Router();

webhooksRouter.get("/", (req, res) => {
  res.send("reachead webhooks young dev");
});

webhooksRouter.post("/orders", (req, res) => {
  res.send("reachead webhooks young dev");
});

export default webhooksRouter;
