import Products from "../models/product.model.js";
import Category from "../models/category.model.js"; // Import mô hình Category

// Lấy danh sách sản phẩm
export const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find().populate("categoryId", "title");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate("categoryId", "title");
        if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock, categoryId } = req.body;

        // Kiểm tra xem categoryId có tồn tại không
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({ message: "Danh mục không tồn tại" });
        }

        const newProduct = new Products({ name, price, description, stock, categoryId });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, stock, categoryId } = req.body;

        // Kiểm tra xem categoryId có tồn tại không nếu được cung cấp
        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).json({ message: "Danh mục không tồn tại" });
            }
        }

        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            { name, price, description, stock, categoryId },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};