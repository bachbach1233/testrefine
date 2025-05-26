import React from "react";
import {
    DateField,
    DeleteButton,
    EditButton,
    MarkdownField,
    ShowButton,
    useTable,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { List, Space, Table } from "antd";

const ProductList: React.FC = () => {
    const { tableProps } = useTable({
        resource: "products",
        syncWithLocation: false,
    });

    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        resource: "categories",
        ids: tableProps?.dataSource?.map((item) => item?.categoryId?._id).filter(Boolean) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource && tableProps?.dataSource?.some((item) => item?.categoryId?._id),
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="_id">
                <Table.Column dataIndex="_id" title="ID" />
                <Table.Column dataIndex="name" title="Tên" />
                <Table.Column
                    dataIndex="description"
                    title="Mô tả"
                    render={(value: any) => {
                        if (!value) return "-";
                        return <MarkdownField value={value.slice(0, 80) + "..."} />;
                    }}
                />
                <Table.Column
                    dataIndex={["categoryId", "title"]}
                    title="Danh mục"
                    render={(value, record: any) =>
                        categoryIsLoading ? (
                            <>Loading...</>
                        ) : (
                            record?.categoryId?.title || "-"
                        )
                    }
                />
                <Table.Column dataIndex="stock" title="Số lượng" />
                <Table.Column dataIndex="price" title="Giá" />
                <Table.Column
                    dataIndex="createdAt"
                    title="Ngày tạo"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    title="Hành động"
                    dataIndex="actions"
                    render={(_, record: any) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record._id} />
                            <ShowButton hideText size="small" recordItemId={record._id} />
                            <DeleteButton hideText size="small" recordItemId={record._id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export default ProductList;