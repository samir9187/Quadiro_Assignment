import Car from "../models/Car.js";

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
