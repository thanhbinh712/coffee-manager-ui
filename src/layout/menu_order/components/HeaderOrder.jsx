import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Row, Col } from "antd";
import { Link, useLocation } from "react-router-dom";
import { LeftOutlined} from '@ant-design/icons';
const { Header } = Layout;
//let width = window.innerWidth - 200;
const HeaderLayout = (props) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
  }, []);
  
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%"}}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="1">
          <Link to="/">  <LeftOutlined />Trở về</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

HeaderLayout.propTypes = {};

export default HeaderLayout;
