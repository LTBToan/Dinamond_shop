import { Avatar, Space, Table, Input, Modal, Select, Switch } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  // InfoCircleOutlined,
  // PlusCircleOutlined,
  // WarningFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getUser,
  getUserById,
  // updateUser,
  deleteUser,
  addUser,
} from "../../../dataControllers/userController";
import axios from "axios";
import AddModal from "./Modals";
const options = [
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

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [testRecord, setTestRecord] = useState(null);
  // const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState();
  // const [banData, setBanData] = useState({
  //   status: 0,
  // });

  const [editFormData, setEditFormData] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newData = await getUser();
      setDataSource(newData);
      setLoading(false);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const onDeleteUser = (record) => {
    console.log(record);
    Modal.confirm({
      title: "Are you sure, you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteUser(record);
      },
      refetchInterval: 5000,
    });
  };

  // const onBanUser = (record) => {
  //   setTestRecord(record);
  //   Modal.confirm({
  //     title: "BAN THIS ACCOUNT?",
  //     okText: "Ban",
  //     okType: "danger",
  //     onOk: () => {
  //       banUser(record, banData);
  //     },
  //   });
  // };
  const onEditUser = async (record) => {
    setIsEditing(true);
    // let data = { ...setEditFormData };
    // console.log(record);
    const userDetails = await getUserById(record); // Nếu bạn cần lấy dữ liệu từ server
    // console.log(userDetails);
    setEditFormData(userDetails);
    setTestRecord(record);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  // const handleCardClick = (request) => {
  //   addUser(request).then((res) => {
  //     console.log("ID ", res);
  //     setSelectedRequest(res);
  //     console.log("DA: ", selectedRequest);
  //   });
  //   setModalVisible(true);
  // };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSearch = (searchText) => {
    setSearchInput(searchText);
    getUser().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter((item) =>
            item.fullName.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    });
  };

  // const handleSwitchChange = (checked) => {
  //   setEditFormData({ ...editFormData, status: checked ? 1 : 0 });
  // };

  const updateUser1 = async (id, data) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}`, data);
    } catch (error) {
      console.log.error(error);
    }
  };
  return (
    <Space size={20} direction="vertical">
      {/* <Typography.Title level={4}>Users</Typography.Title> */}
      <div>
        <Input.Search
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px" }}
        />
        <AddModal>Create User</AddModal>
      </div>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Name",
            dataIndex: "username",
          },
          {
            title: "Fullname",
            dataIndex: "fullname",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "Phone",
            dataIndex: "phonenumber",
          },
          {
            title: "Password",
            dataIndex: "password",
          },
          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Action",
            align: "center",
            dataIndex: "accountId",
            render: (record) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  {/* <PlusCircleOutlined
                    onClick={() => {
                      handleCardClick(record);
                    }}
                  /> */}
                  <EditOutlined
                    onClick={() => {
                      onEditUser(record);
                      // handleCardClick(record);
                    }}
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteUser(record);
                      // onBanUser(record);
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
        title="Edit User"
        open={isEditing}
        centered
        okText="Confirm"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          updateUser1(testRecord, editFormData);
          resetEditing();
        }}
      >
        <div style={{ lineHeight: "2.5" }}>
          Name:{" "}
          <Input
            value={editFormData?.username}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, username: e.target.value };
              });
            }}
          />
          Full Name:{" "}
          <Input
            value={editFormData?.fullname}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, fullname: e.target.value };
              });
            }}
          />
          Email:{" "}
          <Input
            value={editFormData?.email}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          Address:{" "}
          <Input
            value={editFormData?.address}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
          Phone:{" "}
          <Input
            value={editFormData?.phonenumber}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, phonenumber: e.target.value };
              });
            }}
          />
          Password:{" "}
          <Input
            value={editFormData?.password}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, password: e.target.value };
              });
            }}
          />
          Role:{" "}
          <Select
            value={editFormData?.role}
            options={options}
            style={{ width: 100, margin: "20px 20px 0px 0px" }}
            onChange={(value) => {
              setEditFormData((pre) => {
                return { ...pre, role_id: value };
              });
            }}
          />
        </div>
      </Modal>

      <Modal
        title="Create New User"
        open={modalVisible}
        onCancel={closeModal}
        okText="Confirm"
        width={1000}
        centered
        // title="Edit User"
        // open={isEditing}
        // centered
        // okText="Confirm"
        // onCancel={() => {
        //   resetEditing();
        // }}
        onOk={() => {
          addUser(testRecord, editFormData);
          resetEditing();
        }}
      >
        {/* {selectedRequest && (
          <Modal
            dataSource={selectedRequest}
            columns={[
              {
                title: "Username",
                dataIndex: "fullName",
                key: "fullName",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Role",
                dataIndex: "role_id",
                key: "role_id",
              },
              {
                title: "Phone",
                dataIndex: "phone",
                key: "phone",
              },
              {
                title: "Date Joined",
                dataIndex: "create_at",
                key: "date",
              },
            ]}
            pagination={false}
          />
        )}
      </Modal> */}
        <div style={{ lineHeight: "2.5" }}>
          Name:{" "}
          <Input
            value={editFormData?.username}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, username: e.target.value };
              });
            }}
          />
          Full Name:{" "}
          <Input
            value={editFormData?.fullname}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, fullname: e.target.value };
              });
            }}
          />
          Email:{" "}
          <Input
            value={editFormData?.email}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          Address:{" "}
          <Input
            value={editFormData?.address}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
          Phone:{" "}
          <Input
            value={editFormData?.phonenumber}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, phonenumber: e.target.value };
              });
            }}
          />
          Password:{" "}
          <Input
            value={editFormData?.password}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, password: e.target.value };
              });
            }}
          />
          Role:{" "}
          <Select
            value={editFormData?.role}
            options={options}
            style={{ width: 100, margin: "20px 20px 0px 0px" }}
            onChange={(value) => {
              setEditFormData((pre) => {
                return { ...pre, role_id: value };
              });
            }}
          />
        </div>
      </Modal>
    </Space>
  );
}
export default Users;
