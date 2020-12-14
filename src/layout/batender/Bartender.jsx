import React, { useState, useEffect } from "react";
import { Row, Table, Button } from "antd";
import { getOrder } from "./../../actions/api-client";
import moment from "moment";

const Bartender = () => {
  const [order, setOrders] = useState([]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //       getOrder().then((res) => {
  //           setOrders(res.data);
  //         })
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const columns = [
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        record &&
        record.detail_product_order &&
        record.detail_product_order.name
          ? record.detail_product_order.name
          : "",
    },
    {
      title: "Số lượng",
      dataIndex: "number",
      key: "number",
    },
    {
        title: "Bàn",
        key: "table_name",
        render: (text, record) =>
        record &&
        record.detail_table_order &&
        record.detail_table_order.name
          ? record.detail_table_order.name
          : "",
      },
    {
      title: "Thời gian",
      key: "createdAt",
      render: (text, record) =>
        record && record.createdAt
          ? moment(record.createdAt).format("DD/MM/YYYY HH:mm:ss")
          : null,
    },
    {
      title: "Công thức",
      name: "recipe",
      render: (text, record) => (
        <React.Fragment>
          <div
            style={{
              textAlign: "center",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Xóa
          </div>
        </React.Fragment>
      ),
    },
    {
      title: "Trạng thái",
      key: "action",
      align: "center",
      render: (text, record) => (
        <React.Fragment>
          <Button type="primary" style={{ marginLeft: 5 }}>
            Đang thực hiện
          </Button>
          <Button type="danger">Đã xong</Button>
        </React.Fragment>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        DANH SÁCH MÓN CẦN PHA CHẾ
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={order}
        style={{ marginLeft: 20, marginRight: 20 }}
      ></Table>
    </React.Fragment>
  );
};

export default Bartender;
