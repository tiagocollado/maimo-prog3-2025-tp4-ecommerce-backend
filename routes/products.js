import express from "express";
const router = express.Router();
import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("_id name");
    return res.status(200).send({ message: "ALL PRODUCTS", products });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  try {
    const product = new Product({ name });
    await product.save();

    return res.status(200).send({ message: "CREATED", product });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};

const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).select("_id name");
    return res.status(200).send({ message: "PRODUCT", product });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const productToEdit = await Product.findOne({ _id: id });

    if (!productToEdit) {
      return res
        .status(501)
        .send({ message: "Error", error: "No product to edit" });
    }

    productToEdit.name = name;

    await productToEdit.save();

    return res.status(200).send({ message: "EDITED", productToEdit });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productToDelete = await Product.findOne({ _id: id });

    if (!productToDelete) {
      return res
        .status(501)
        .send({ message: "Error", error: "No product to delete" });
    }

    await Product.deleteOne({ _id: id });

    return res.status(200).send({ message: "DELETED", productToDelete });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};

//CRUD endpoints
router.get("/", findAllProducts);
router.post("/", addProduct);
router.get("/:id", findOneProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
