import {
  Button,
  Form,
  Image,
  Input,
  Layout,
  Modal,
  Select,
  Spin,
  Table,
  Upload,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { MdAddCircle, MdCheckCircle, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import axiosInstance from "../../../ax";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";

const { Content } = Layout;

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();

  // Fetch products and categories on load
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axiosInstance.get("/api/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/api/categories", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (productResponse.data?.products) {
          setProducts(productResponse.data.products);
        }
        if (categoryResponse.data?.data) {
          setCategories(
            categoryResponse.data.data.map((category) => ({
              id: category.id,
              name: category.name,
            }))
          );
        }
      } catch (error) {
        console.error(error);
        notification.error({
          message: "Error",
          description: "Failed to fetch data.",
        });
      } finally {
        setLoadingProducts(false);
        setLoadingCategories(false);
      }
    };

    fetchInitialData();
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
      const response = await axiosInstance.post(
        `/api/create/product/${values.categoryId}`,
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
        setProducts([...products, response.data.product]);
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

  const formatToRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "decimal",
      currency: "IDR",
    }).format(value);

  // Edit product
  const handleEditProduct = async (values) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    const newImage = values.imageProduct?.[0]?.originFileObj;
    if (newImage) {
      formData.append("imageProduct", newImage);
    }

    try {
      const response = await axiosInstance.put(
        `/api/update/product/${productToEdit.id}`,
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

        const updatedProduct = {
          ...response.data.updateProduct,
          category: productToEdit.category, // jaga agar ga ilang di tampilan
        };

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productToEdit.id ? updatedProduct : product
          )
        );

        setModalVisible(false);
        form.resetFields();
        setProductToEdit(null);
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
      await axiosInstance.delete(`/api/delete/product/${id}`, {
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

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rp. ${formatToRupiah(price)}`,
    },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (id) => categories.find((c) => c.id === id)?.name || "Unknown",
    },
    {
      title: "Product Image",
      dataIndex: "imageProduct",
      key: "imageProduct",
      render: (imageProduct) => (
        <Image
          src={`http://localhost:3888/public/${imageProduct}?t=${new Date().getTime()}`}
          alt="Product"
          width={100}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (record) => (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setModalType("editProduct");
              setProductToEdit(record);
              form.setFieldsValue({
                name: record.name,
                description: record.description,
                price: record.price,
                stock: record.stock,
                categoryId: record.categoryId,
                imageProduct: [],
              });
              setModalVisible(true);
            }}
            type="primary"
            icon={<AiOutlineEdit className="text-lg" />}
            className="font-poppins h-10"
            style={{ backgroundColor: "#16A34A" }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            type="primary"
            danger
            style={{ marginLeft: 8 }}
            icon={<RiDeleteBin5Line className="text-lg" />}
            className="font-poppins h-10"
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
      <Layout className="font-poppins" style={{ backgroundColor: "#475569" }}>
        <Header />
        <div className="p-6">
          <Content
            style={{ margin: "16px", padding: 24, background: "#fff" }}
            className="rounded-2xl"
          >
            <h1 className="text-3xl font-poppins tracking-tighter select-none">
              Products Management.
            </h1>

            <div className="gap-4 flex my-4">
              <Button
                type="primary"
                onClick={() => {
                  setModalType("product");
                  form.resetFields();
                  setProductToEdit(null);
                  setModalVisible(true);
                }}
                className="font-poppins h-10"
                icon={<AiOutlinePlus className="text-lg" />}
              >
                Create Product
              </Button>
            </div>
            {loadingProducts || loadingCategories ? (
              <Spin size="large" />
            ) : (
              <Table
                dataSource={products}
                columns={columns}
                rowKey="id"
                bordered
                className="shadow-lg"
                pagination={{ pageSize: 4 }}
                rowClassName={(_, index) =>
                  `transition-all ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`
                }
                components={{
                  body: {
                    cell: (props) => (
                      <td
                        {...props}
                        className="font-poppins text-gray-700 text-sm"
                      />
                    ),
                  },
                  header: {
                    cell: (props) => (
                      <th
                        {...props}
                        className="font-poppins text-gray-900 bg-gray-100"
                      />
                    ),
                  },
                }}
              />
            )}
          </Content>
        </div>
      </Layout>

      {/* Modal */}
      <Modal
        title={
          modalType === "product" ? (
            <div className="flex items-center gap-2 mb-4">
              <MdAddCircle className="text-3xl fill-green-600" />
              <h1 className=" text-2xl font-semibold tracking-tight">
                Add Product
              </h1>
            </div>
          ) : modalType === "editProduct" ? (
            <div className="flex items-center gap-2 mb-4">
              <MdOutlineModeEdit className="text-3xl fill-amber-600" />
              <h1 className=" text-2xl font-semibold tracking-tight">
                Edit Product
              </h1>
            </div>
          ) : (
            ""
          )
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setProductToEdit(null);
        }}
        footer={null}
        width={500}
        className="font-poppins"
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
              <Input
                className="font-poppins h-11"
                placeholder="Enter product name"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input.TextArea
                rows={6}
                placeholder="Enter product description"
                className="font-poppins"
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  { required: true, message: "Please input product price!" },
                ]}
              >
                <Input
                  type="number"
                  className="font-poppins h-11"
                  placeholder="Rp.0"
                />
              </Form.Item>

              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: "Please input stock!" }]}
              >
                <Input
                  type="number"
                  className="font-poppins h-11"
                  placeholder="0"
                />
              </Form.Item>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select
                  placeholder="Select a category"
                  className="font-poppins h-11"
                >
                  {categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      <p className="font-poppins text-slate-500">
                        {category.name}
                      </p>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="imageProduct"
                label="Product Image"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={
                  modalType === "product"
                    ? [{ required: true, message: "Please upload image!" }]
                    : []
                }
              >
                <Upload
                  name="imageProduct"
                  listType="picture"
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <Button
                    type="dashed"
                    className="text-slate-400 font-poppins h-10"
                    icon={<FcAddImage className="text-lg" />}
                  >
                    Upload Image
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="font-poppins h-11"
                style={{ width: "100%", backgroundColor: "#16a34a" }}
              >
                <MdCheckCircle className="text-xl" />
                {modalType === "editProduct" ? "Update Product" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    </Layout>
  );
};

export default ProductAdmin;
