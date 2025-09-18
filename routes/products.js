import express from "express";
const router = express.Router();
import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select("_id name")
        return res.status(200).send({message: "Todos los productos", products: products})
    } catch (error) {
        return res.status(501).send({message: "hubo un error", error})
    }
};

const findOneProduct = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findOne({_id: id}).select("_id name")
        return res.status(200).send({message: "Producto", product})
    } catch (error) {
        return res.status(501).send({message: "Hubo un error", error})
    }
}

const addProduct = async (req, res) => {
    const { name, images, price, discount, sizes, stockBySize, gender, color, style, material, sole, description, rating, categories } = req.body
    try {
        const product = new Product({ name, images, price, discount, sizes, stockBySize, gender, color, style, material, sole, description, rating, categories })
        await product.save()
        return res.status(200).send({message: "Producto creado", product})
    } catch (error) {
        return res.status(501).send({message: "Hubo un error", error})
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    try {
        const productToUpdate = await Product.findOne({_id: id})
        if(!productToUpdate){
            return res.status(404).send({message: "No existe el producto", id: id})
        }

        //valore a actualizar
        productToUpdate.name = name
        await productToUpdate.save()
        return res.status(200).send({message: "Producto actualizado", product: productToUpdate})
    } catch (error) {
        return res.status(501).send({message: "Hubo un error", error})
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const productToDelete = await Product.findOne({_id: id})
        if(!productToDelete){
            return res.status(404).send({message: "No existe el producto", id: id})
        }
        await Product.deleteOne({_id: id})
        return res.status(200).send({message: "Producto borrado", product: productToDelete})
    } catch (error) {
        return res.status(501).send({message: "Hubo un error", error})
    }
}

//CRUD endpoints
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post('/', addProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router;
