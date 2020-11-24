import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Anchor } from "antd";
import "./index";
import { Image } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  PlusSquareOutlined,
  CalculatorOutlined,
  DashboardOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";
const { Sider } = Layout;
const height = window.innerHeight;
const SiderLayout = (props) => {
  const location = useLocation();
  return (
    <Anchor>
      <Sider
        style={{
          height: "100vh",
          background: "#001529",
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">
          <img
            width="100%"
            src="https://kinhdoanhcafe.com/wp-content/uploads/2013/04/thiet-ke-logo-cho-quan-ca-phe-600x600.png"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/admin/home" icon={<UserOutlined />}>
            <Link to="/admin/home">Quản lý nhân viên</Link>
          </Menu.Item>
          <Menu.Item key="/admin/product" icon={<ShoppingOutlined />}>
            <Link to="/admin/product">Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="/admin/inventory" icon={<CalculatorOutlined />}>
            <Link to="/admin/inventory">Quản lý kho</Link>
          </Menu.Item>
          <Menu.Item key="/admin/area" icon={<AreaChartOutlined />}>
            <Link to="/admin/area">Quản lý khu vực</Link>
          </Menu.Item>
          <Menu.Item key="/admin/promotion" icon={<PlusSquareOutlined />}>
            <Link to="/admin/promotion">Quản lý khuyến mãi</Link>
          </Menu.Item>
          <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin/dashboard">Thống kê</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Anchor>
  );
};

SiderLayout.propTypes = {};

export default SiderLayout;
