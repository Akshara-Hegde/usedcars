// like KMs on Odometer, Major Scratches,
// Original Paint, Number of accidents reported, Number of previous buyers, Registration Place

const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  
  company: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  odometer: {
    type: String,
    required: true,
  },
  scratches: {
    type: String,
    required: true,
  },
  paint: {
    type: String,
    required: true,
  },
  accidents_reported: {
    type: String,
    // required: true,
  },
  previous_buyers: {
    type: String,
    required: true,
  },
  registration_place: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  photo:{
    type: String,
    required: true
  },
  my_post:{
    type: String,    
    required: true,
    default:"Owner"
  }
},{
    timestamps : true
});

module.exports = mongoose.model("CarDetails",inventorySchema)