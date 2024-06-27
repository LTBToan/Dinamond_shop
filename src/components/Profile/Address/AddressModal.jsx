import React from "react";
import { Modal, Form, Input, Radio, Button, Checkbox } from "antd";
// import "antd/dist/antd.css";

const AddressForm = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Địa chỉ mới"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      bodyStyle={{ padding: "20px" }}
    >
      <Form layout="vertical">
        <Form.Item label="Họ và tên">
          <Input />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input />
        </Form.Item>
        <Form.Item label="Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ cụ thể">
          <Input />
        </Form.Item>
        {/* <Form.Item label="Thêm vị trí">
          <div
            style={{
              width: "100%",
              height: "100px",
              backgroundColor: "#f0f0f0",
              textAlign: "center",
              lineHeight: "100px",
              color: "#888",
            }}
          >
            + Thêm vị trí
          </div>
        </Form.Item> */}
        <Form.Item label="Loại địa chỉ">
          <Radio.Group>
            <Radio value="Nhà Riêng">Nhà Riêng</Radio>
            <Radio value="Văn Phòng">Văn Phòng</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose}>Trở Lại</Button>
          <Button type="primary" htmlType="submit">
            Hoàn thành
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressForm;
