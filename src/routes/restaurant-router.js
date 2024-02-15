import express from "../lib/express.js";
import { restaurants } from "../constants/restaurants.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", (req, res) => {
  res.send("reachead restaurant young dev");
});

restaurantRouter.get("/get-all", (req, res) => {
  res.send(restaurants);
});

export default restaurantRouter;
