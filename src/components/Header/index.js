import React, { useState } from "react";
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;
const HeaderLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Header
      className="site-layout-sub-header-background"
      style={{ padding: 0 }}
    />
  );
};

HeaderLayout.propTypes = {};

export default HeaderLayout;
