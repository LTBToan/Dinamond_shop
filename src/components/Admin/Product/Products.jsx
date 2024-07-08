import { Space, Table, Image, Modal, Input, Switch, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../../dataControllers/productController";
import AddModal from "./Modal";
import axios from "axios";
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

function Products() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [testRecord, setTestRecord] = useState();
  const [searchInput, setSearchInput] = useState();
  const [editFormData, setEditFormData] = useState({
    categoryId: "",
    diamondId: "",
    shellId: "",
    accountId: "",
    materialId: "",
    description: "",
    productId: "",
    productName: "",
    productSize: "",
    imageLink: "",
    productPrice: "",
    quantity: "",
  });

  // useEffect(() => {
  //   setLoading(true);
  //   getProduct().then((res) => {
  //     setDataSource(res);
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newData = await getProduct();
      setDataSource(newData);
      setLoading(false);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const onUpdateProduct = async (record) => {
    setIsEditing(true);
    // let data = { ...editFormData, id: record };
    console.log(record);
    const productNew = await getProductById(record);
    console.log(productNew);
    setEditFormData(productNew);
    setTestRecord(record);
  };

  const onDeleteProduct = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this product?",
      okText: "Confirm",
      okType: "danger",
      onOk: () => {
        deleteProduct(record);
      },
    });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleSearch = (searchText) => {
    setSearchInput(searchText);
    getProduct().then((res) => {
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
  // const updateProduct1 = async (id, data) => {
  //   try {
  //     axios.put(`http://localhost:8080/api/products/get/${id}`, data);
  //   } catch (error) {
  //     console.log.error(error);
  //   }
  // };

  return (
    <Space size={20} direction="vertical">
      {/* <Typography.Title level={4}>Product</Typography.Title> */}
      <div>
        <Input.Search
          placeholder="Search by name, category..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px" }}
        />
        <AddModal>Add Product</AddModal>
      </div>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Category Id",
            key: "categoryId",
            dataIndex: "categoryId",
          },
          {
            title: "Product Id",
            key: "productId",
            dataIndex: "productId",
          },
          {
            title: "Product Name",
            key: "productName",
            dataIndex: "productName",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Product Size",
            key: "productSize",
            dataIndex: "productSize",
          },
          {
            title: "Product Price",
            key: "productPrice",
            dataIndex: "productPrice",
          },
          {
            title: "Quantity",
            key: "quantity",
            dataIndex: "quantity",
          },
          {
            title: "Action",
            key: "action",
            align: "center",
            dataIndex: "productId",
            render: (record) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  <EditOutlined
                    onClick={() => {
                      onUpdateProduct(record);
                    }}
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteProduct(record);
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
        <div style={{ lineHeight: "2.5" }}>
          Category Id:{" "}
          <Input
            value={editFormData?.categoryId}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, categoryId: e.target.value };
              });
            }}
          />
          Diamond Id:{" "}
          <Input
            value={editFormData?.diamondId}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, diamondId: e.target.value };
              });
            }}
          />
          Shell Id:{" "}
          <Input
            value={editFormData?.shellId}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, shellId: e.target.value };
              });
            }}
          />
          Account Id:{" "}
          <Input
            value={editFormData?.accountId}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, accountId: e.target.value };
              });
            }}
          />
          Material Id:{" "}
          <Input
            value={editFormData?.materialId}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, materialId: e.target.value };
              });
            }}
          />
          Description:{" "}
          <Input
            value={editFormData?.description}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, price: e.target.value };
              });
            }}
          />
          Product Id:{" "}
          <Input
            value={editFormData?.productId}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, productId: e.target.value };
              });
            }}
          />
          Product Name:{" "}
          <Input
            value={editFormData?.productName}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, productName: e.target.value };
              });
            }}
          />
          Image:{" "}
          <Input
            value={editFormData?.imageLink}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, imageLink: e.target.value };
              });
            }}
          />
          Product Price:{" "}
          <Input
            value={editFormData?.productPrice}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, productPrice: e.target.value };
              });
            }}
          />
          Quantity:{" "}
          <Input
            value={editFormData?.quantity}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, quantity: e.target.value };
              });
            }}
          />
        </div>
      </Modal>
    </Space>
  );
}
export default Products;
