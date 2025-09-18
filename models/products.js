import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String },
  images: { type: [String] },
  price: { type: Number },
  discount: { type: Number },
  sizes: { type: [Number] },
  stockBySize: {
    type: Map,
    of: Number,
  },
  gender: { type: String, enum: ["Hombre", "Mujer", "Unisex"] },
  color: { type: String },
  style: { type: String },
  material: { type: String },
  sole: { type: String },
  description: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

export default mongoose.model("Product", productSchema, "Products");
