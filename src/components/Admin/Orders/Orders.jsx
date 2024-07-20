import { Input, Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  getOrders,
  getOrderDetails,
  getOrdersById,
} from "../../../dataControllers/index";
import axios from "axios";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [testRecord, setTestRecord] = useState();
  const [editFormData, setEditFormData] = useState({
    orderId: "",
    accountId: "",
    totalPrice: "",
    address: "",
    date: "",
    statusId: "",
    products: "",
  });

  // useEffect(() => {
  //   setLoading(true);
  //   getOrders().then((res) => {
  //     setDataSource(res);
  //     setLoading(false);
  //   });
  // }, []);
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
  // const handleUpdateClick = async (record) => {
  //   setIsEditing(true);
  //   // let data = { ...editFormData, id: record };
  //   console.log(record);
  //   const productNew = await getOrdersById(record);
  //   console.log(productNew);
  //   setEditFormData(productNew);
  //   setTestRecord(record);
  // };
  // const resetEditing = () => {
  //   setIsEditing(false);
  //   setEditFormData(null);
  // };
  const updateOrder = async (id, data) => {
    try {
      const updatedData = { ...data, statusId: 1 };
      await axios.put(
        `http://localhost:8080/api/orders/update/${id}`,
        updatedData
      );
      setLoad(!load);
    } catch (error) {
      console.log.error(error);
    }
  };
  const updateOrder1 = async (id, data) => {
    try {
      const updatedData = { ...data, statusId: 3 };
      await axios.put(
        `http://localhost:8080/api/orders/update/${id}`,
        updatedData
      );
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
            render: (record) => (
              <>
                <div>
                  {/* <a
                    onClick={() => handleOrderClick(record)}
                    style={{
                      color: "white",
                      backgroundColor: "rgb(38, 122, 245)",
                      padding: "10px 10px",
                      borderRadius: "5px",
                      textDecoration: "none",
                      display: "inline-block",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    View Details
                  </a> */}
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
                        updateOrder(record);
                      }}
                    />
                    <CloseOutlined
                      onClick={() => {
                        updateOrder1(record);
                      }}
                      style={{ color: "red" }}
                    />
                  </div>
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
      {/* <Modal
        title="Update Status"
        open={isEditing}
        okText="Confirm"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          updateOrder(testRecord, editFormData);
          resetEditing();
        }}
      >
        <div style={{ lineHeight: "2.5" }}>
          <Input
            value={editFormData?.orderId}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, orderId: e.target.value };
              });
            }}
          />

          <Input
            value={editFormData?.statusId}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, statusId: e.target.value };
              });
            }}
          />
        </div>
      </Modal> */}
    </Space>
  );
}
export default Orders;
