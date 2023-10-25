const asyncHandler = require("express-async-handler");
const CarDetails = require("../models/inventory");
const UsersDB = require("../models/users");
const { use } = require("../routes/route");

// const view = asyncHandler(async (req, res) => {
//   const cars = await CarDetails.find();
//   res.status(200).json(cars);

// });
// 64d6a614c98fe210ad460b19
console.log("controller 10");
const add = asyncHandler(async (req, res) => {
  const {
    name,
    company,
    year,
    odometer,
    scratches,
    paint,
    accident_reported,
    previous_buyers,
    registration_place,
    price,
    photo,
    my_post,
  } = req.body;
  const car = await CarDetails.create({
    name,
    company,
    year,
    odometer,
    scratches,
    paint,
    accident_reported,
    previous_buyers,
    registration_place,
    price,
    photo,
    my_post,
  });
  const userid = req.user.id;
  const user = await UsersDB.findById(userid);
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }
  user.my_post.push(car._id);
  console.log(car._id + " 47");
  await user.save();

  res.status(200).json(car);
});

const edit = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const car = await CarDetails.findById(id);
  if (!car) {
    console.log("id not valid");
    return res.send("invalid id");
  }
  const updatedCarData = JSON.parse(req.body.item);

  const vehicle = await CarDetails.findByIdAndUpdate(id, updatedCarData, {
    new: true,
  });
  console.log(vehicle + " " + "56");
  res.status(200).json(vehicle);
});

const deleteCar = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userid = req.user.id;
  const car = await CarDetails.findById(id);
  if (!car) {
    return res.send("invalid request");
  }
  await CarDetails.findByIdAndDelete(id);
  const user = await UsersDB.findById(userid);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  user.my_post = user.my_post.filter((car) => car.toString() !== id);
  await user.save();
  let updatedPost = user.my_post;
  res.json({ updatedPost });
});

const viewSingle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const car = await CarDetails.findById(id);
  if (!car) {
    return res.send("invalid request");
  }
  const userid = req.user.id;
  const user = await UsersDB.findById(userid);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res.json(car);
});

const getFavourites = asyncHandler(async (req, res) => {
  const userid = req.query.userid;
  console.log(req.params.userid + "83");
  const user = await UsersDB.findById(userid);

  if (!user) {
    return res.status(404).json({ message: "Invalid user or car details" });
  }

  const cars = await Promise.all(
    user.fav.map(async (id) => {
      return await CarDetails.findById(id);
    })
  );
  console.log(cars);
  res.status(200).json(cars);
});

const view = asyncHandler(async (req, res) => {
  const search = req.query.query || "";
  const page = req.query.page || 1;
  console.log("req.query.query");
  let limit = 6;
  let start = (page - 1) * limit;
  const car = await CarDetails.find({
    $or: [
      { company: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { year: { $regex: search, $options: "i" } },
    ],
  })
    .skip(start)
    .limit(limit);

  if (!car) {
    return res.json({ message: "No data found" });
  } else {
    console.log(car);
    return res.status(201).json(car);
  }
});

const getOwnerInfo = asyncHandler(async (req, res) => {
  const email = req.params.owner;
  console.log(req.params.owner + " 155");
  const owner = await UsersDB.find({ email: email });
  if (!owner) {
    return res.status(400).json({ message: "Owner not found" });
  }
  let info = { id: owner[0]._id, name: owner[0].username, email: owner[0].email };
  // console.log(owner[0]._id+" 154")
  return res.status(200).json(info);
});

// const view = asyncHandler(async (req, res) => {
//   const search = req.query.query || "";
//   const car = await CarDetails.find({
//     $or: [
//       { company: { $regex: search, $options: "i" } },
//       { name: { $regex: search, $options: "i" } },
//       { year: { $regex: search, $options: "i" } },
//     ],
//   });

//   if (car.length === 0) {
//     return res.status(404).json({ message: "No data found" });
//   }

//   console.log(car + " " + "view");
//   return res.status(200).json(car);
// });

const addFavourites = asyncHandler(async (req, res) => {
  const { userid, carid } = req.body;
  const user = await UsersDB.findById(userid);
  const car = await CarDetails.findById(carid);
  if (!user || !car) {
    return res.status(404).json({ message: "Invalid user or car details" });
  }
  let newFav;
  user.fav.push(car);
  await user.save();
  newFav = user.fav;
  // console.log(newFav);
  res.status(200).json({ newFav });
});

const removeFavourites = asyncHandler(async (req, res) => {
  const { id, userid } = req.query;
  // console.log(req.body.userid+"     160")
  const user = await UsersDB.findById(userid);
  if (!user) {
    return res.status(400).json({ message: "Invalid user details" });
  }
  user.fav = user.fav.filter((car) => {
    return car.toString() !== id;
  });
  console.log(user.fav + " 169");
  await user.save();
  const newFav = user.fav;

  return res.status(200).json({ newFav });
});

const getMyPosts = asyncHandler(async (req, res) => {
  try {
    const id = req.user.id;

    const user = await UsersDB.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }
    console.log(user.my_post + "208");
    const cars = await Promise.all(
      user.my_post.map(async (id) => {
        return await CarDetails.findById(id);
      })
    );
    return res.status(200).json(cars);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  edit,
  add,
  deleteCar,
  view,
  viewSingle,
  addFavourites,
  removeFavourites,
  getFavourites,
  getMyPosts,
  getOwnerInfo,
};
