import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import { Image } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";
const { Sider } = Layout;
const height = window.innerHeight;
const SiderLayout = (props) => {
  const location=useLocation()
  return (
    <Sider
      style={{
        height: height,
        background: "white"
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
        <image width={40} src = "https://kinhdoanhcafe.com/wp-content/uploads/2013/04/thiet-ke-logo-cho-quan-ca-phe-600x600.png"/>
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="/admin/home" icon={<UserOutlined />}>
          <Link to="/admin/home">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="/admin/product" icon={<VideoCameraOutlined />}>
          <Link to="/admin/product">Món ăn</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

SiderLayout.propTypes = {};

export default SiderLayout;
