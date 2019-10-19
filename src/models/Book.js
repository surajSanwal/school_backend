import mongoose, { Schema } from "mongoose";

var bookSchema = new Schema({
  title: { type: String, required: true },
  publisher: { type: Array },
  author: { type: Array },
  isbn: { type: Number, required: true },
  pages: { type: Number },
  price: { type: Number },
  edition: { type: Number },
  category: { type: Array }
});

export default mongoose.model("books", bookSchema);
