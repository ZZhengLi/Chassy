import dbConnect from '../../../db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import Car from '../../../db/models/car';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[cars] " + req.method)
        if (req.method == "GET") {
            // Get all cars
            const cars = await Car.find().populate("car_owner_id")
            res.status(200).json(cars);
        } else if (req.method == "POST") {
            // Create
            const car = req.body
            console.log("car POST", car)
            const newCar = new Car(car)
            await newCar.save()
            console.debug(">>> New Car Created!")
            res.status(200).json(newCar)
        } else if (req.method == "PUT") {
            // Update
            const car = req.body
            console.log("Car PUT", car)
            const theCar = await Car.findById(car._id)
            console.log("---- before update", theCar)
            theCar.license_plate = car.license_plate
            theCar.car_owner_id = car.car_owner_id
            theCar.brand = car.brand
            theCar.model = car.model
            theCar.color = car.color
            await theCar.save()
            console.debug(">>> Service Updated!")
            res.status(200).json(theCar)
        } else {
            res.status(400).json({ message: "Not yet implemented" })
        }

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}