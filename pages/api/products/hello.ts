import dbConnect from '../../../db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../db/models/product';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();

        console.debug("API[products] " + req.method)
        if (req.method == "GET") {
            // Get all products
            const products = await Product.find().populate('shop')
            res.status(200).json(products);
        } else if (req.method == "POST") {
            // Create
            const product = req.body
            console.log("Product POST", product)
            const newProduct = new Product(product)
            await newProduct.save()
            console.debug(">>> New Product Created!")
            res.status(200).json(newProduct)
        } else if (req.method == "PUT") {
            // Update
            const product = req.body
            console.log("Product PUT", product)
            const theProduct = await Product.findById(product._id)
            console.log("---- before update", theProduct)
            theProduct.shop = product.shop
            theProduct.product_name = product.product_name
            theProduct.price = product.price
            theProduct.brand = product.brand
            theProduct.description = product.description
            await theProduct.save()
            console.debug(">>> Product Updated!")
            res.status(200).json(theProduct)
        } else {
            res.status(400).json({ message: "Not yet implemented" })
        }

    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}