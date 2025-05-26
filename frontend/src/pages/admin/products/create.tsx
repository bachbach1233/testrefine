import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

const ProductCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm({
        resource: "products",
        action: "create",
        redirect: "list",
    });

    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        optionLabel: "title",
        optionValue: "_id", // Sử dụng _id thay vì id
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên sản phẩm!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mô tả sản phẩm!",
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Danh mục"
                    name="categoryId" // Sử dụng categoryId thay vì category.id
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn danh mục!",
                        },
                    ]}
                >
                    <Select {...categorySelectProps} placeholder="Chọn danh mục" />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    name="stock"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số lượng!",
                        },
                    ]}
                >
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá sản phẩm!",
                        },
                    ]}
                >
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
            </Form>
        </Create>
    );
};

export default ProductCreate;