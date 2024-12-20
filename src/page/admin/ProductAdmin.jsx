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
  Select,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sider from "../../component/SIdeBar";
import Header from "../../component/Header";
import BreadcrumbComponent from "../../component/Breadcrumb";

const { Content } = Layout;

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // Track modal type (add product, add category, or edit product)
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Track category to delete
  const [productToEdit, setProductToEdit] = useState(null); // Track product to edit
  const navigate = useNavigate();

  // Fetch products and categories on load
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if no token is present
        return;
      }

      try {
        // Fetch Products
        const productResponse = await axios.get(
          "http://localhost:3888/api/products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (productResponse.data && productResponse.data.products) {
          setProducts(productResponse.data.products);
        } else {
          notification.error({
            message: "Error",
            description: "No products data found.",
          });
        }

        // Fetch Categories
        const categoryResponse = await axios.get(
          "http://localhost:3888/api/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (categoryResponse.data && categoryResponse.data.data) {
          const categoryList = categoryResponse.data.data.map((category) => ({
            id: category.id,
            name: category.name,
          }));
          setCategories(categoryList); // Update state with filtered data
        } else {
          notification.error({
            message: "Error",
            description: "No categories data found.",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch data.",
        });
      } finally {
        setLoadingProducts(false); // Stop loading spinner for products
        setLoadingCategories(false); // Stop loading spinner for categories
      }
    };

    fetchInitialData();
  }, [navigate]);

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) {
      notification.warning({
        message: "Select Category",
        description: "Please select a category to delete.",
      });
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:3888/api/delete/category/${categoryToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Category deleted successfully",
        });
        setCategories(
          categories.filter((category) => category.id !== categoryToDelete)
        );
        setCategoryToDelete(null); // Reset category selection after deletion
      } else {
        notification.error({
          message: "Failed to delete category",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      notification.error({
        message: "Error deleting category",
        description: error.message,
      });
    }
  };

  // Add new category
  const handleAddCategory = async (values) => {
    const token = localStorage.getItem("token");
    const data = {
      name: values.name,
    };

    try {
      const response = await axios.post(
        "http://localhost:3888/api/category",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        notification.success({
          message: "Category created successfully!",
        });
        setCategories([...categories, response.data.category]); // Add new category
        setModalVisible(false);
        form.resetFields();
      } else {
        notification.error({
          message: "Failed to create category.",
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      notification.error({
        message: "Error adding category",
        description: error.message,
      });
    }
  };

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
          },
        }
      );

      if (response.data.status === "success") {
        notification.success({
          message: "Success",
          description: response.data.message,
        });
        setProducts([...products, response.data.product]); // Add new product to state
        setModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      notification.error({
        message: "Error",
        description: "Failed to add product.",
      });
    }
  };

  // Edit product
  const handleEditProduct = async (values) => {

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    formData.append("imageProduct", values.imageProduct[0].originFileObj);

    try {
      const response = await axios.put(
        `http://localhost:3888/api/update/product/${productToEdit.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        notification.success({
          message: "Success",
          description: response.data.message,
        });

        // Update product list with the updated product without reloading the page
        setProducts(
          products.map((product) =>
            product.id === productToEdit.id ? response.data.product : product
          )
        );

        // Close the modal and reset the form
        setModalVisible(false);
        form.resetFields();
        setProductToEdit(null); // Reset the productToEdit state
      }
    } catch (error) {
      console.error("Error editing product:", error);
      notification.error({
        message: "Error",
        description: "Failed to edit product.",
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
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rp. ${price.toLocaleString()}`,
    },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (id) => categories.find((c) => c.id === id)?.name || "Unknown",
    },
    { title: "User", dataIndex: "userId", key: "userId" },
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
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setModalType("editProduct");
              setProductToEdit(record); // Set the product to be edited
              form.setFieldsValue({
                name: record.name,
                description: record.description,
                price: record.price,
                stock: record.stock,
                categoryId: record.categoryId,
              });
              setModalVisible(true);
            }}
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
      <Sider collapsed={false} />
      <Layout>
        <Header />
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <BreadcrumbComponent />
          <div className="gap-4 flex">
            <Button
              type="primary"
              onClick={() => {
                setModalType("product");
                setModalVisible(true);
              }}
            >
              Add Product
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setModalType("category");
                setModalVisible(true);
              }}
            >
              Add Category
            </Button>

            <div className="flex gap-3">
              <Button
                type="primary"
                danger
                onClick={handleDeleteCategory}
                disabled={!categoryToDelete}
                style={{ marginLeft: 8 }}
              >
                Delete Category
              </Button>

              {/* Dropdown to select category to delete */}
              <Select
                value={categoryToDelete}
                onChange={(value) => setCategoryToDelete(value)}
                style={{ width: 200 }}
                placeholder="Select a category to delete"
              >
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          {loadingProducts || loadingCategories ? (
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
        title={
          modalType === "product"
            ? "Add Product"
            : modalType === "editProduct"
            ? "Edit Product"
            : "Add Category"
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        {modalType === "product" || modalType === "editProduct" ? (
          <Form
            form={form}
            onFinish={
              modalType === "editProduct" ? handleEditProduct : handleAddProduct
            }
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                { required: true, message: "Please input product name!" },
              ]}
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
              rules={[
                { required: true, message: "Please input product price!" },
              ]}
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
              label="Category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select a category">
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
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
                beforeUpload={() => false}
                maxCount={1}
              >
                <Button>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        ) : (
          <Form form={form} onFinish={handleAddCategory} layout="vertical">
            <Form.Item
              name="name"
              label="Category Name"
              rules={[
                { required: true, message: "Please input category name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Layout>
  );
};

export default ProductAdmin;
