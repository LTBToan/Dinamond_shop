import React, { useState } from "react";
import { Button, Form, Modal, Input, Select, Switch } from "antd";
import { addProduct } from "../../../dataControllers/productController";
import { generateId } from "../../../assistants/Generators";
import { PlusCircleOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

// const options = [
//   {
//     value: "Table",
//     label: "Table",
//   },
//   {
//     value: "Sofa",
//     label: "Sofa",
//   },
//   {
//     value: "Bed",
//     label: "Bed",
//   },
//   {
//     value: "Chair",
//     label: "Chair",
//   },
//   {
//     value: "Lighting",
//     label: "Lighting",
//   },
//   {
//     value: "Shelf",
//     label: "Shelf",
//   },
//   {
//     value: "Outdoor",
//     label: "Outdoor",
//   },
// ];

const AddModal = ({ load, setLoad }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    productSize: "",
    productPrice: "",
    quantity: "",
    description: "",
    imageLink: "",
    categoryId: "",
    diamondId: "",
    shellId: "",
    accountId: "",
    materialId: "",
  });

  const showModal = () => {
    setIsModalOpen(true);

    setFormData({
      ...formData,
      product_id: generateId(30, ""),
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      productId: "",
      productName: "",
      productSize: "",
      productPrice: "",
      quantity: "",
      description: "",
      imageLink: "",
      categoryId: "",
      diamondId: "",
      shellId: "",
      accountId: "",
      materialId: "",
    });
    setSelectedImage(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      // console.log("URL: ", imageUrl);
      setFormData({
        ...formData,
        image_url: file,
      });
    }
  };

  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, status: checked ? true : false });
  };

  const handleSubmit = async (event) => {
    setIsModalOpen(false);
    event.preventDefault();
    await addProduct(formData);
    setLoad(!load);
    setFormData({
      ...formData,
      productId: "",
      productName: "",
      productSize: "",
      productPrice: "",
      quantity: "",
      description: "",
      imageLink: "",
      categoryId: "",
      diamondId: "",
      shellId: "",
      accountId: "",
      materialId: "",
    });
    setSelectedImage(null);
  };

  return (
    <>
      <Button
        style={{ float: "right", marginRight: "50px" }}
        type="primary"
        onClick={showModal}
        icon={<PlusCircleOutlined />}
      >
        New Product
      </Button>
      <Modal
        title="Input Information Product"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        centered
      >
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          {/* <Form.Item>
            <Input
              type="text"
              name="productId"
              value={formData?.productId}
              onChange={handleChange}
            />
          </Form.Item> */}
          {/* <Form.Item label="Category">
            <Select
              value={formData?.category_name}
              options={options}
              style={{ width: 200 }}
              onChange={(value) => {
                setFormData((pre) => {
                  return { ...pre, category_name: value };
                });
              }}
               onChange={handleChange}
            >
          </Form.Item> */}
          <Form.Item label="Product Name">
            <Input
              type="text"
              name="productName"
              value={formData?.productName}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Product Size">
            <Input
              type="number"
              name="productSize"
              value={formData?.productSize}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Product Price">
            <Input
              type="number"
              name="productPrice"
              value={formData?.productPrice}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Quantity">
            <Input
              type="number"
              name="quantity"
              value={formData?.quantity}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              type="text"
              name="description"
              value={formData?.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Image Link">
            <Input
              type="text"
              name="imageLink"
              value={formData?.imageLink}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Category Id">
            <Input
              type="text"
              name="categoryId"
              value={formData?.categoryId}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Diamond Id">
            <Input
              type="text"
              name="diamondId"
              value={formData?.diamondId}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Shell Id">
            <Input
              type="text"
              name="shellId"
              value={formData?.shellId}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Account Id">
            <Input
              type="text"
              name="accountId"
              value={formData?.accountId}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Material Id">
            <Input
              type="text"
              name="materialId"
              value={formData?.materialId}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
