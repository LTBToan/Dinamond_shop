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

const Option = [
  {
    value: "US",
    label: "User",
  },
  {
    value: "DS",
    label: "Dealer sale",
  },
  {
    value: "AD",
    label: "Admin",
  },
  {
    value: "MN",
    label: "Manager",
  },
  {
    value: "SS",
    label: "Sale store",
  },
];

const AddModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountId: "",
    name: "",
    fullname: "",
    email: "",
    role_id: "",
    address: "",
    phonenumber: "",
    password: "",
    role: "",
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
      ...formData,
      accountId: "",
      name: "",
      fullname: "",
      email: "",
      role_id: "",
      address: "",
      phonenumber: "",
      password: "",
      role: "",
    });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // const handleSwitchChange = (checked) => {
  //   setFormData({ ...formData, status: checked ? true : false });
  // };

  const handleSubmit = (event) => {
    setIsModalOpen(false);
    event.preventDefault();
    addProduct(formData);
    setFormData({
      ...formData,
      accountId: "",
      name: "",
      fullname: "",
      email: "",
      role_id: "",
      address: "",
      phonenumber: "",
      password: "",
      role: "",
    });
  };

  return (
    <>
      <Button
        style={{ float: "right", marginRight: "50px" }}
        type="primary"
        onClick={showModal}
        icon={<PlusCircleOutlined />}
      >
        Create User
      </Button>
      <Modal
        title="Create User"
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
          <Form.Item label="Account Id">
            <Input
              type="text"
              name="accountId"
              value={formData?.accountId}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="User Name">
            <Input
              type="text"
              name="username"
              value={formData?.username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Full Name">
            <Input
              name="fullname"
              value={formData?.fullname}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="text"
              name="email"
              value={formData?.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input
              type="text"
              name="password"
              value={formData?.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input
              type="text"
              name="phonenumber"
              value={formData?.phonenumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Role">
            <Select
              name="role"
              options={Option}
              value={formData?.role}
              onChange={(value) =>
                handleChange({ target: { name: "role", value } })
              }
            >
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item label="address">
            <Input
              type="text"
              name="address"
              value={formData?.address}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
