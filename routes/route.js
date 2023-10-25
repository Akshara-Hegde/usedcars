const express = require("express");
const router = express.Router();

const validateToken = require("../middlewares/validatetoken");
const {
  getFavourites,
  addFavourites,
  removeFavourites,
  view,
  add,
  viewSingle,
  deleteCar,
  edit,
  getMyPosts,
  getOwnerInfo
} = require("../controller/controller");

router.use(validateToken);
console.log("route");

router.route("/my/posts").get(getMyPosts)
router.route("/my/favourites").post(addFavourites).delete(removeFavourites).get(getFavourites);
router.route("/:search").get(view);
router.route("/ownerInfo/:owner").get(getOwnerInfo);
router.route("/:id").get(viewSingle).put(edit).delete(deleteCar);
router.route("/").post(add)

module.exports = router;
