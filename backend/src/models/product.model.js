import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        stock: {
            type: Number,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories", // Tham chiếu đến mô hình Category
            required: true, // Bắt buộc mỗi sản phẩm phải có danh mục
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Products", productSchema);