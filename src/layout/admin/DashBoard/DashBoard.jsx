import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
const Dashboard = (props) => {
  return (
    <React.Fragment>
      <Row
        gutter={[16, 16]}
        style={{ marginTop: 200, marginLeft: 10, marginRight: 10 }}
      >
        <Col md={12} style={{ textAlign: "center" }}>
          Thống kê sản phẩm
        </Col>
        <Col md={12} style={{ textAlign: "center" }}>
          Thống kê khách hàng
        </Col>
      </Row>
    </React.Fragment>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
