import Categories from "../models/category.model.js";

// Lấy danh sách danh mục
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh mục theo ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Danh mục không tìm thấy" });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo danh mục mới
export const createCategory = async (req, res) => {
    try {
        const { title } = req.body;
        const newCategory = new Categories({ title });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Categories.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedCategory) return res.status(404).json({ message: "Danh mục không tìm thấy" });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Categories.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: "Danh mục không tìm thấy" });
        res.status(200).json({ message: "Danh mục đã được xóa thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};