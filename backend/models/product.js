const mongoose=require('mongoose')

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide name"],
    minlength: 2,
    maxlength: 20,
    unique:true
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  description: { type: String },
//   createdBy: {
//     type: mongoose.Types.ObjectId,
//     ref: "User",
//     required: [true, "Please provide user"],
//   },
},{timestamps:true});

module.exports=mongoose.model("Product",ProductSchema)