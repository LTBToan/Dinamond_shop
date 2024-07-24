import { Space, Table, Image, Modal, Input, Switch, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getInventoryItem,
  deleteInventory,
} from "../../../dataControllers/inventoryController";
import axios from "axios";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [testRecord, setTestRecord] = useState();
  const [searchInput, setSearchInput] = useState();
  const [load, setLoad] = useState(false);
  const [editFormData, setEditFormData] = useState({
    quantity: 0,
    status: 1,
  });

  useEffect(() => {
    setLoading(true);
    getInventoryItem().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, [load]);

  const onDeleteProduct = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this product?",
      okText: "Confirm",
      okType: "danger",
      onOk: () => {
        deleteInventory(record);
        setLoad(!load);
      },
    });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleSearch = (searchText) => {
    setSearchInput(searchText);
    getInventoryItem().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter(
            (item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.category_name
                .toLowerCase()
                .includes(searchText.toLowerCase())
          )
        );
      }
    });
  };

  const updateDelivery = async (id) => {
    try {
      // await axios.patch(`http://localhost:8080/api/deliveries/update/${id}`, {
      //   statusId: 2,
      // });
      await axios.patch(`http://localhost:8080/api/orders/update/${id}`, {
        statusId: 2,
      });
      setLoad(!load);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDelivery1 = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/orders/update/${id}`, {
        statusId: 3,
      });
      setLoad(!load);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Space size={20} direction="vertical">
      {/* <Typography.Title level={4}>Delivery Order</Typography.Title> */}
      <div>
        <Input.Search
          placeholder="Search by name, category..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px" }}
        />
      </div>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Delivery Id",
            key: "deliveryId",
            dataIndex: "deliveryId",
          },
          // {
          //   title: "Picture",
          //   key: "image_url",
          //   dataIndex: "image_url",
          //   render: (link) => {
          //     return <Image src={link} width={45} />;
          //   },
          // },
          {
            title: "OrderId",
            key: "orderId",
            dataIndex: "orderId",
          },
          {
            title: "AccountId",
            key: "accountId",
            dataIndex: "accountId",
            // render: (value) => <span>${value}</span>,
          },
          {
            title: "Address",
            key: "address",
            dataIndex: "address",
          },
          {
            title: "Status",
            key: "statusId",
            dataIndex: "statusId",
            render: (status) => (
              <span
                style={{
                  backgroundColor: status === 0 ? "gray" : "green",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                {status === 0 ? "In Delivery" : "Delivered"}
              </span>
            ),
          },
          {
            title: "Action",
            key: "action",
            align: "center",
            dataIndex: "orderId",
            render: (record) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  <CheckOutlined
                    onClick={() => {
                      updateDelivery(record);
                      // createInventory(record);
                    }}
                  />
                  <CloseOutlined
                    onClick={() => {
                      updateDelivery1(record);
                    }}
                    style={{ color: "red" }}
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteProduct(record);
                      console.log("Delete: ", record);
                    }}
                    style={{ color: "red" }}
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      <Modal
        title="Edit Product"
        open={isEditing}
        okText="Confirm"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          updateProduct(testRecord, editFormData);
          resetEditing();
        }}
      >
        <div style={{ lineHeight: "3" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            Quantity:{"   "}
            <Input
              style={{ marginLeft: "10px", width: "300px" }}
              value={editFormData?.quantity}
              onChange={(e) => {
                setEditFormData((pre) => {
                  return { ...pre, quantity: e.target.value };
                });
              }}
            />
          </div>
          Status:{" "}
          <Switch
            style={{ marginLeft: "20px" }}
            value={editFormData?.status}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, status: e ? 1 : 0 };
              });
            }}
          />
        </div>
      </Modal>
    </Space>
  );
}
export default Inventory;
