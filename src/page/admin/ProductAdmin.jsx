import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Layout,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { FcAddImage, FcCancel } from "react-icons/fc";
import { MdAddCircle, MdCheckCircle, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import axiosInstance from "../../../ax";
import Header from "../../component/Header";
import Sider from "../../component/SideBar";

const { Content } = Layout;

const ProductAdmin = () => {
  const [form] = Form.useForm();
  const [productToEdit, setProductToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromoActive, setIsPromoActive] = useState(false);
  const [fileList, setFileList] = useState([]);
  const queryClient = useQueryClient();

  // Fetch data produk dan kategori
  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/products");
      return data.products;
    },
  });

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/categories");
      return data.data;
    },
  });

  // Mutation untuk tambah produk
  const createProduct = useMutation({
    mutationFn: async ({ formData, categoryId }) => {
      const response = await axiosInstance.post(
        `/api/create/product/${categoryId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      message.success("Produk berhasil ditambahkan!");
      queryClient.invalidateQueries(["products"]);
      resetModal();
    },
    onError: (error) => {
      message.error(
        `Gagal menambahkan produk: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  // Mutation untuk edit produk
  const updateProduct = useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await axiosInstance.put(
        `/api/update/product/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      message.success("Produk berhasil diperbarui!");
      queryClient.invalidateQueries(["products"]);
      resetModal();
    },
    onError: (error) => {
      message.error(
        `Gagal memperbarui produk: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  // Mutation untuk hapus produk
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/api/delete/product/${id}`);
    },
    onSuccess: () => {
      message.success("Produk berhasil dihapus!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      message.error(
        `Gagal menghapus produk: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const isLoading = createProduct.isLoading || updateProduct.isLoading;

  // Reset modal
  const resetModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
    setFileList([]);
    setIsPromoActive(false);
    form.resetFields();
  };

  // Handle submit form (tambah/edit)
  const handleFinish = async (values) => {
    const isEdit = Boolean(productToEdit);

    if (!isEdit && fileList.length === 0) {
      message.error("Gambar produk wajib diunggah!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("categoryId", values.categoryId);
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("price", values.price);
      formData.append("stock", values.stock);

      const isPromo = isPromoActive ? "true" : "false";
      formData.append("isPromo", isPromo);

      if (isPromoActive) {
        formData.append("promoPrice", values.promoPrice || "");
        formData.append(
          "promoStart",
          values.promoStart ? dayjs(values.promoStart).toISOString() : ""
        );
        formData.append(
          "promoEnd",
          values.promoEnd ? dayjs(values.promoEnd).toISOString() : ""
        );
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("imageProduct", fileList[0].originFileObj);
      }

      if (isEdit) {
        await updateProduct.mutateAsync({ id: productToEdit.id, formData });
      } else {
        await createProduct.mutateAsync({
          formData,
          categoryId: values.categoryId,
        });
      }

      form.resetFields();
      setFileList([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan produk:", error);

      const errMsg =
        error?.response?.data?.error ||
        error?.message ||
        "Terjadi kesalahan saat menyimpan produk.";
      message.error(`Gagal menyimpan produk: ${errMsg}`);
    }
  };

  // Handle edit produk
  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsPromoActive(product.isPromo || false);

    if (product.imageProduct) {
      setFileList([
        {
          uid: "-1",
          name: product.imageProduct,
          status: "done",
          url: `http://localhost:3888/public/${product.imageProduct}`,
        },
      ]);
    }

    form.setFieldsValue({
      ...product,
      promoPrice: product.promoPrice,
      promoStart: product.promoStart ? dayjs(product.promoStart) : null,
      promoEnd: product.promoEnd ? dayjs(product.promoEnd) : null,
      isPromo: product.isPromo || false,
    });

    setIsModalOpen(true);
  };

  // Handle hapus produk
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Hapus Produk",
      content: "Apakah Anda yakin ingin menghapus produk ini?",
      okText: "Ya",
      cancelText: "Batal",
      onOk: () => deleteProduct.mutate(id),
    });
  };

  // Format harga ke Rupiah
  const formatToRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
    setFileList([]);
    form.resetFields();
    setIsPromoActive(false);
  };

  // Kolom tabel
  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "Product Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Category",
      dataIndex: "categoryId",
      render: (id) =>
        categories?.find((cat) => cat.id === id)?.name || "Tidak diketahui",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => formatToRupiah(price),
    },
    { title: "Stock", dataIndex: "stock" },
    {
      title: "Promo",
      render: (_, record) =>
        record.isPromo && record.promoEnd ? (
          <div className="text-green-600">{`${formatToRupiah(
            record.promoPrice
          )} *Promo until date ${dayjs(record.promoEnd).format(
            "DD/MM/YYYY"
          )}*`}</div>
        ) : (
          <div className="flex items-center gap-2">
            <FcCancel className="text-5xl" />
            <span className="text-xs text-red-700">
              Regular Price, No Promo!
            </span>
          </div>
        ),
    },
    {
      title: "Product Image",
      dataIndex: "imageProduct",
      render: (img) => (
        <Image
          src={`http://localhost:3888/public/${img}`}
          alt="Produk"
          width={80}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            style={{ backgroundColor: "#16A34A" }}
            icon={<AiOutlineEdit className="text-lg" />}
            onClick={() => handleEdit(record)}
            className="font-poppins h-10"
          >
            Edit
          </Button>

          <Button
            type="primary"
            icon={<RiDeleteBin5Line className="text-lg" />}
            danger
            onClick={() => handleDelete(record.id)}
            className="font-poppins h-10"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout className="font-poppins" style={{ backgroundColor: "#475569" }}>
        <Header />
        <div className="p-6">
          <Content
            style={{
              margin: "16px",
              padding: 24,
              overflow: "initial",
              background: "#fff",
            }}
            className="rounded-2xl"
          >
            <h1 className="text-3xl font-poppins tracking-tighter select-none">
              Products Management.
            </h1>

            <div className="gap-4 flex my-4">
              <Button
                type="primary"
                onClick={() => setIsModalOpen(true)}
                icon={<AiOutlinePlus className="text-lg " />}
                className="font-poppins h-10"
              >
                Create Product
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={products}
              loading={loadingProducts}
              bordered
              rowKey="id"
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
              scroll={{ x: 1200 }}
            />
          </Content>
        </div>
      </Layout>

      {/* Modal Tambah/Edit Produk */}
      <Modal
        title={
          productToEdit ? (
            <div className="flex items-center gap-2 mb-6 font-poppins">
              <MdOutlineModeEdit className="text-3xl fill-amber-600" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Edit Product
              </h1>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-6 font-poppins">
              <MdAddCircle className="text-3xl fill-green-600" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Add Product
              </h1>
            </div>
          )
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={550}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ isPromo: false }}
          className="font-poppins space-y-4"
        >
          <div className="grid grid-cols-1 gap-4">
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                { required: true, message: "Please enter product name!" },
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
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter product description"
                className="font-poppins"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select
                placeholder="Select category"
                className="font-poppins h-11"
              >
                {categories?.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    <span className="font-poppins text-slate-500">
                      {cat.name}
                    </span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please enter product price!" },
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
              rules={[{ required: true, message: "Please enter stock!" }]}
            >
              <Input
                type="number"
                className="font-poppins h-11"
                placeholder="0"
              />
            </Form.Item>
          </div>

          {isPromoActive && (
            <div className="grid grid-cols-3 gap-2">
              <Form.Item
                name="promoPrice"
                label="Promo Price"
                rules={[
                  { required: true, message: "Please enter promo price!" },
                  {
                    validator: (_, value) => {
                      const price = form.getFieldValue("price");
                      if (value && value >= price) {
                        return Promise.reject(
                          new Error("Promo price must be lower than price")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  className="font-poppins h-11"
                  placeholder="Rp.0"
                />
              </Form.Item>

              <Form.Item
                name="promoStart"
                label="Start Promo"
                rules={[
                  { required: true, message: "Please enter start date!" },
                ]}
              >
                <DatePicker className="w-full font-poppins h-11" />
              </Form.Item>

              <Form.Item
                name="promoEnd"
                label="End Promo"
                rules={[
                  { required: true, message: "Please enter end date!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const start = getFieldValue("promoStart");
                      if (!value || !start) return Promise.resolve();
                      if (value.isBefore(start)) {
                        return Promise.reject(
                          new Error("End date must be after start date")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker className="w-full font-poppins h-11" />
              </Form.Item>
            </div>
          )}

          <div className="grid grid-cols-2">
            <Form.Item name="isPromo" valuePropName="checked">
              <div className="flex flex-col items-center gap-4">
                <span className="font-poppins text-slate-600">Use Promo</span>
                <Switch
                  className="w-1/4"
                  checked={isPromoActive}
                  onChange={(checked) => {
                    setIsPromoActive(checked);
                    form.setFieldsValue({ isPromo: checked });

                    if (!checked) {
                      form.setFieldsValue({
                        promoPrice: undefined,
                        promoStart: undefined,
                        promoEnd: undefined,
                      });
                    }
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item>
              <div className="flex flex-col items-center gap-2">
                <span className="font-poppins text-slate-600">
                  Product Image
                </span>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={(file) => {
                    setFileList([
                      {
                        uid: file.uid || file.name,
                        name: file.name,
                        status: "done",
                        originFileObj: file,
                        url: URL.createObjectURL(file),
                      },
                    ]);
                    return false;
                  }}
                  onRemove={() => setFileList([])}
                >
                  {fileList.length >= 1 ? null : (
                    <FcAddImage className="text-4xl" />
                  )}
                </Upload>
              </div>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%", backgroundColor: "#16a34a" }}
              className="font-poppins h-11"
            >
              <MdCheckCircle className="text-xl" />
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProductAdmin;
