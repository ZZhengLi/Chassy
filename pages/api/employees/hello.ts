import dbConnect from '../../../db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import Employee from '../../../db/models/employee';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[employees] " + req.method)
        if (req.method == "GET") {
            // Get all employees
            const employees = await Employee.find().populate('shop')
            res.status(200).json(employees);
        } else if (req.method == "POST") {
            // Create
            const employee = req.body
            console.log("employee POST", employee)
            const newEmployee = new Employee(employee)
            await newEmployee.save()
            console.debug(">>> New Employee Created!")
            res.status(200).json(newEmployee)
        } else if (req.method == "PUT") {
            // Update
            const employee = req.body
            console.log("Employee PUT", employee)
            const theEmployee = await Employee.findById(employee._id)
            console.log("---- before update", theEmployee)
            theEmployee.shop = employee.shop
            theEmployee.first_name = employee.first_name
            theEmployee.last_name = employee.last_name
            theEmployee.position = employee.position
            theEmployee.phone_number = employee.phone_number
            
            
            await theEmployee.save()
            console.debug(">>> Employee Updated!")
            res.status(200).json(theEmployee)
        } else {
            res.status(400).json({ message: "Not yet implemented" })
        }

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}