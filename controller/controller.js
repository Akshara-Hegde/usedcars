const asyncHandler = require("express-async-handler");
const CarDetails = require("../models/inventory");

// const view = asyncHandler(async (req, res) => {
//   const cars = await CarDetails.find();
//   res.status(200).json(cars);
// });
console.log("controller")
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
    photo
  });
  res.status(200).json(car);
});

const edit = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const car = await CarDetails.findById(id);
  if (!car) {
    console.log("id not valid")
    return res.send("invalid id");
  }
  const updatedCarData = JSON.parse(req.body.item);

 

  const vehicle = await CarDetails.findByIdAndUpdate(id, updatedCarData, {
    new: true,
  });
  console.log(vehicle)
  res.status(200).json(vehicle);
});

const deleteCar = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const car = await CarDetails.findById(id);
  if (!car) {
    return res.send("invalid request");
  }
  await CarDetails.findByIdAndDelete(id);
  res.send("Deleted Succesfully");
});

const viewSingle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const car = await CarDetails.findById(id);
  if (!car) {
    return res.send("invalid request");
  }
  res.json(car);
});

const view = asyncHandler(async (req, res) => {
  const search = req.query.query || "";
  console.log("req.query.query");
  const car = await CarDetails.find(
    {
      $or: [
        { company: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { year: { $regex: search, $options: "i" } },
      ],
    }

  );

  if (!car) {
    return res.send("No data found");
  }
  console.log(car);
  return res.status(201).json(car);
});

module.exports = { edit, add, deleteCar, view, viewSingle };
