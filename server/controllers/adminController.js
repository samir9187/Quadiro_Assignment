import Car from "../models/Car.js";

export const createCar = async (req, res) => {
  try {
    const { name, manufacturingYear, price } = req.body;

    if (!name || !manufacturingYear || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCar = new Car({
      name,
      manufacturingYear,
      price,
    });

    await newCar.save();
    res.status(201).json({ newCar, message: "Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, manufacturingYear, price } = req.body;

    if (!name || !manufacturingYear || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { name, manufacturingYear, price },
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
