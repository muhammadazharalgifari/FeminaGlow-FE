import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Spin,
  notification,
  Button,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sider from "../../component/SIdeBar";
import Header from "../../component/Header";
import BreadcrumbComponent from "../../component/Breadcrumb";

const { Content } = Layout;

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch products on load
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if no token is present
        return;
      }

      try {
        const response = await axios.get("http://localhost:3888/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          notification.error({
            message: "Error",
            description: "No products data found.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to fetch products.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  // Add new product
  const handleAddProduct = async (values) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    formData.append("imageProduct", values.imageProduct[0].originFileObj);

    try {
      const response = await axios.post(
        `http://localhost:3888/api/create/product/${values.categoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        notification.success({
          message: "Success",
          description: response.data.message,
        });
        setProducts([...products, response.data.product]); // Tambahkan produk baru ke state
        setModalVisible(false); // Tutup modal
        form.resetFields(); // Reset form
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add product.",
      });
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3888/api/delete/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notification.success({
        message: "Product deleted successfully",
        description: "The product has been deleted successfully.",
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete product.",
      });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rp. ${price.toLocaleString()}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Image",
      dataIndex: "imageProduct",
      key: "imageProduct",
      render: (imageProduct) => (
        <img
          src={`http://localhost:3888/public/${imageProduct}`}
          alt="Product"
          width={100}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button
            onClick={() => navigate(`/admin/products/edit/${record.id}`)}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            type="primary"
            danger
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsed={false} /> {/* Sidebar */}
      <Layout>
        <Header /> {/* Header */}
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <BreadcrumbComponent />
          <div>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add Product
            </Button>
            <h2 className="">Product List</h2>
          </div>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table
              dataSource={products}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          )}
        </Content>
      </Layout>
      <Modal
        title="Add Product"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()} // Submit form ketika tombol OK ditekan
      >
        <Form form={form} onFinish={handleAddProduct} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please input stock!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category ID"
            rules={[{ required: true, message: "Please input category ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="imageProduct"
            label="Product Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              { required: true, message: "Please upload product image!" },
            ]}
          >
            <Upload
              name="imageProduct"
              listType="picture"
              beforeUpload={() => false} // Mencegah unggah langsung
              maxCount={1}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProductAdmin;
