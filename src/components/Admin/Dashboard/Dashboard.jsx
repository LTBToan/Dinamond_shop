import {
  BookOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getProduct, getUser, getOrders } from "../../../dataControllers/index";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Select, Space, Statistic, Typography } from "antd";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DashboardCard({ title, value, icon, gradientColors }) {
  const gradientBackground = {
    background: `linear-gradient(to bottom right, ${gradientColors[0]}, ${gradientColors[1]})`,
  };
  const titleStyle = {
    color: "white",
    marginBottom: 0,
    fontWeight: "bold",
  };
  return (
    <Card style={{ width: "300px", ...gradientBackground }}>
      <Space direction="horizontal">
        {icon}
        <Statistic
          title={<Typography.Text style={titleStyle}>{title}</Typography.Text>}
          value={value}
        />
      </Space>
    </Card>
  );
}

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [interval, setInterval] = useState("month");
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(0);
  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res?.length);
    });
    getProduct().then((res) => {
      setProducts(res?.length);
    });
    getUser().then((res) => {
      setUser(res?.length);
    });
  }, []);

  const totalRevenue = orderData.reduce((a, b) => a + b.totalPrice, 0);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue in VND",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Users Created",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y1",
      },
    ],
  });
  console.log(chartData);

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        min: 0,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
      },
    },
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/all");
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching orders from API", error);
    }
  };

  const getChartData = (interval) => {
    const now = new Date();
    let startDate;
    let endDate;
    let labels = [];

    switch (interval) {
      case "week":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 3
        );
        endDate = now;
        labels = Array.from({ length: 10 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - (2 - i));
          return date.toISOString().split("T")[0];
        });
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        labels = Array.from({ length: endDate.getDate() }, (_, i) => {
          const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
          return date.toISOString().split("T")[0];
        });
        break;
      case "year":
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        endDate = now;
        labels = Array.from({ length: 12 }, (_, i) => {
          const date = new Date(now.getFullYear() - 1, i, 1);
          return date.toLocaleString("default", { month: "long" });
        });
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        labels = Array.from({ length: endDate.getDate() }, (_, i) => {
          const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
          return date.toISOString().split("T")[0];
        });
        break;
    }

    const filteredOrders = orderData.filter(
      (order) =>
        new Date(order.date) >= startDate && new Date(order.date) <= endDate
    );

    const filteredUsers = users.filter(
      (user) =>
        new Date(user.createdAt) >= startDate &&
        new Date(user.createdAt) <= endDate
    );

    const revenueData = labels.map((label, index) => {
      const currentDate = new Date(labels[index]);
      const nextDate = new Date(labels[index + 1] || currentDate);

      const revenue = filteredOrders.reduce((totalRevenue, order) => {
        const orderDate = new Date(order.date);
        if (orderDate >= currentDate && orderDate < nextDate) {
          return totalRevenue + order.totalPrice;
        }
        return totalRevenue;
      }, 0);

      return revenue;
    });

    const usersData = labels.map((label, index) => {
      const currentDate = new Date(labels[index]);
      const nextDate = new Date(labels[index + 1] || currentDate);

      const userCount = filteredUsers.reduce((count, user) => {
        const userDate = new Date(user.createdAt);
        if (userDate >= currentDate && userDate < nextDate) {
          return count + 1;
        }
        return count;
      }, 0);

      return userCount;
    });

    return { labels, revenueData, usersData, filteredUsers };
  };

  useEffect(() => {
    fetchData();
    fetchOrders();
  }, []);

  console.log("ORDER: ", orderData);

  useEffect(() => {
    const { labels, revenueData, usersData, filteredUsers } =
      getChartData(interval);
    setChartData({
      labels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: revenueData,
        },
        {
          ...chartData.datasets[1],
          data: usersData,
        },
      ],
    });
  }, [orderData, users, interval]);

  return (
    <div
      style={{ height: "599px", boxSizing: "border-box", overflowY: "auto" }}
    >
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{ fontSize: "20px", paddingRight: "16px" }}
            />
          }
          title={"Orders"}
          value={orders}
          gradientColors={["#FF512F", "#F09819"]}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                fontSize: "20px",
                paddingRight: "16px",
              }}
            />
          }
          title={"Products"}
          value={products}
          gradientColors={["#00CDAC", "#8DD5E9"]}
        />
        <DashboardCard
          icon={
            <UserOutlined style={{ fontSize: "20px", paddingRight: "16px" }} />
          }
          title={"Customer"}
          value={user}
          gradientColors={["#F857A6", "#FF5858"]}
        />
        <DashboardCard
          icon={
            <BookOutlined style={{ fontSize: "20px", paddingRight: "16px" }} />
          }
          title={"Revenue"}
          value={totalRevenue}
          gradientColors={["#2196F3", "#00C9FF"]}
        />
      </Space>
      <Select
        value={interval}
        onChange={(value) => setInterval(value)}
        style={{ width: 200, marginTop: 10, alignContent: "right" }}
      >
        <Select.Option value="week">Week</Select.Option>
        <Select.Option value="month">Month</Select.Option>
        <Select.Option value="year">Year</Select.Option>
      </Select>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          maxHeight: "200px",
        }}
      ></div>

      <div style={{ marginTop: "50px" }}>
        <Line data={chartData} options={chartOptions} height={70} />
      </div>
    </div>
  );
};

export default Dashboard;
