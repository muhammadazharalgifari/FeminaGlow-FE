import {
  Button,
  Form,
  Image,
  Input,
  Layout,
  Modal,
  notification,
  Table,
  Upload,
} from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { MdAddCircle, MdCheckCircle } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../ax";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";

const CategoryAdmin = () => {
  const [category, setCategory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // fetch categories
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response = await axiosInstance.get("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data.data) {
          setCategory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        notification.error({
          message: "Failed to Fetch Categories",
          description: error.response?.data?.message || "Something went wrong",
        });
      }
    };

    fetchInitialData();
  }, [navigate]);

  // handle add category
  const handleAddCategory = async (values) => {
    const token = localStorage.getItem("token");

    if (!token) {
      notification.error({
        message: "Session Expired",
        description: "Please log in again",
      });
      return;
    }

    try {
      const formData = createFormData(values);

      const response = await axiosInstance.post("/api/category", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201 && response.data?.category) {
        notification.success({ message: "Category Added Successfully" });
        setCategory((prevCategory) => [
          ...prevCategory,
          response.data.category,
        ]);
        setModalVisible(false);
        form.resetFields();
      } else {
        notification.error({
          message: "Failed to Add Category",
          description: "Please try again",
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      notification.error({
        message: "Failed to Add Category",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  // create form data
  const createFormData = (values) => {
    const formData = new FormData();
    formData.append("name", values.name.trim());
    formData.append("description", values.description.trim());

    if (values.imageCategory && values.imageCategory.fileList?.[0]) {
      formData.append(
        "imageCategory",
        values.imageCategory.fileList[0].originFileObj
      );
    }

    return formData;
  };

  // handle delete category
  const handleDeleteCategory = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      notification.error({
        message: "Session Expired",
        description: "Please log in again",
      });
      return;
    }

    try {
      const response = await axiosInstance.delete(
        `/api/delete/category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        notification.success({ message: "Category Deleted Successfully" });
        setCategory((prevCategory) =>
          prevCategory.filter((category) => category.id !== id)
        );
      } else {
        notification.error({
          message: "Failed to Delete Category",
          description: "Please try again",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      notification.error({
        message: "Failed to Delete Category",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  // table 
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category Image",
      dataIndex: "imageCategory",
      key: "imageCategory",
      render: (imageCategory) => (
        <Image
          width={100}
          src={`http://localhost:3888/public/${imageCategory}`}
          alt="image"
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Action",
      key: "actions",
      render: (record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteCategory(record.id)}
          icon={<RiDeleteBin5Line className="text-lg" />}
          className="font-poppins h-10"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider />
        <Layout className="font-poppins" style={{ backgroundColor: "#475569" }}>
          <Header />
          <div className="p-6">
            <Content
              style={{ margin: "16px", padding: 24, background: "#fff" }}
              className="rounded-2xl"
            >
              <h1 className="text-3xl font-poppins tracking-tighter select-none">
                Categories
              </h1>

              <div className="gap-4 flex my-4">
                <Button
                  type="primary"
                  onClick={() => setModalVisible(true)}
                  className="font-poppins h-10"
                  icon={<AiOutlinePlus className="text-lg" />}
                >
                  Create Category
                </Button>
              </div>
              <Table
                dataSource={category}
                columns={columns}
                rowKey="_id"
                bordered
                pagination={{ pageSize: 4 }}
                className="shadow-lg"
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
            </Content>
          </div>
        </Layout>
      </Layout>

      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          onFinish={handleAddCategory}
          initialValues={{ name: "", description: "" }}
          className="font-poppins"
        >
          <div className="flex items-center gap-2 mb-6">
            <MdAddCircle className="text-3xl fill-green-600" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Add Category
            </h1>
          </div>

          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please enter category name!" }]}
            labelCol={{ span: 24 }}
          >
            <Input
              className="h-11 font-poppins"
              placeholder="Enter category name."
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter category description!" },
            ]}
            labelCol={{ span: 24 }}
          >
            <Input.TextArea
              rows={6}
              placeholder="Enter category description."
              className="font-poppins"
            />
          </Form.Item>

          <Form.Item
            label="Category Image"
            name="imageCategory"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please upload category image!" },
            ]}
          >
            <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
              <Button
                type="dashed"
                className="text-slate-400 font-poppins h-10"
                icon={<FcAddImage className="text-lg" />}
              >
                Upload Image
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="font-poppins h-11"
              style={{ width: "100%", backgroundColor: "#16a34a" }}
              htmlType="submit"
            >
              <MdCheckCircle className="text-xl" />
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryAdmin;
