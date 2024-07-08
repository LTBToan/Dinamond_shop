import { Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders, getOrderDetails } from "../../../dataControllers/index";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);
  const handleOrderClick = (record) => {
    setSelectedOrder(record);
    console.log(record);
    getOrderDetails(record.orderId).then((details) => {
      setOrderDetails(details);
      console.log(details);
      setModalVisible(true);
    });
  };
  const closeModal = () => {
    setModalVisible(false);
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
            // render: (value) => <span>${value}</span>,
          },
          {
            title: "Total Price",
            dataIndex: "totalPrice",
            // render: (value) => <span>${value}</span>,
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "date",
            dataIndex: "date",
          },
          {
            title: "Status Id",
            dataIndex: "statusId",
          },
          {
            title: "Action",
            dataIndex: "orderId",
            render: (orderId, record) => (
              <a
                onClick={() => handleOrderClick(record)}
                style={{
                  color: "white",
                  backgroundColor: "rgb(38, 122, 245)",
                  padding: "10px 10px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                View Details
              </a>
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
