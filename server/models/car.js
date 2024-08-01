import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturingYear: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Car = mongoose.model("Car", CarSchema);
export default Car;
