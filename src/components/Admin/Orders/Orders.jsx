import { Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders, getOrderDetails } from "../../../dataControllers/index";
import { createInventory } from "../../../dataControllers/inventoryController";
import axios from "axios";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newData = await getOrders();
      setDataSource(newData);
      setLoading(false);
    };
    fetchData();
  }, [load]);
  const handleOrderClick = (record) => {
    setSelectedOrder(record);
    console.log(record);
    getOrderDetails(record).then((details) => {
      setOrderDetails(details);
      console.log(details);
      setModalVisible(true);
    });
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const updateOrder = async (id, data) => {
    try {
      await axios.patch(`http://localhost:8080/api/orders/update/${id}`, {
        statusId: 1,
      });
      setLoad(!load);
    } catch (error) {
      console.log(error);
    }
  };
  const updateOrder1 = async (id, data) => {
    try {
      await axios.patch(`http://localhost:8080/api/orders/update/${id}`, {
        statusId: 3,
      });
      setLoad(!load);
    } catch (error) {
      console.log.error(error);
    }
  };
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Order Id",
            dataIndex: "orderId",
          },
          {
            title: "Account Id",
            dataIndex: "accountId",
          },
          {
            title: "Total Price",
            dataIndex: "totalPrice",
            render: (value) => <span>{value.toLocaleString()}₫‌</span>,
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "Date",
            dataIndex: "date",
            render: (date) => <span>{moment(date).format("DD/MM/YYYY")}</span>,
          },
          {
            title: "Status",
            dataIndex: "statusId",
          },
          {
            title: "Action",
            render: (record) => (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  <InfoCircleOutlined
                    onClick={() => {
                      handleOrderClick(record);
                    }}
                  />
                  <CheckOutlined
                    onClick={() => {
                      updateOrder(record.orderId);
                      createInventory(record);
                    }}
                  />
                  <CloseOutlined
                    onClick={() => {
                      updateOrder1(record.orderId);
                    }}
                    style={{ color: "red" }}
                  />
                </div>
              </>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 6,
        }}
      ></Table>
      <Modal
        title={`Order Details - Order ID: ${
          selectedOrder ? selectedOrder.orderId : ""
        }`}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Table
          columns={[
            { title: "Products Id", dataIndex: "productsId" },
            { title: "Products Size", dataIndex: "productsSize" },
            { title: "Quantity", dataIndex: "quantity" },
            { title: "Price", dataIndex: "price" },
          ]}
          dataSource={orderDetails}
          pagination={false}
        />
      </Modal>
    </Space>
  );
}
export default Orders;
