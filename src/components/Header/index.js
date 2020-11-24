import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Avatar, Dropdown, Row, Col } from "antd";
import { MenuUnfoldOutlined,
   MenuFoldOutlined,
  DownOutlined } from "@ant-design/icons";

const { Header } = Layout;
let width = window.innerWidth - 200;
const HeaderLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
  }, []);
  const onLogOut = async () => {
    await localStorage.removeItem("user");
    window.location.reload(false);
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={onLogOut}>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="site-layout-sub-header-background header-width"
      style={{
        padding: 0,
        position: "fixed",
        zIndex: 1,
        background: "white",
        width: "86vw",
        flexWWrap: "nowrap",
      }}
    >
      <Row>
        <Col md={16}></Col>
        <Col md={6} style={{ textAlign: "right" }}>
          {" "}
          <Dropdown overlay={menu} trigger={["click"]}>
            <div style={{ color: "black" }}>
            <Avatar src="https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser--flat-color-icon--vector-icon-banner-templ-png-image_1491720.jpg" />  
              {user?.name}
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

HeaderLayout.propTypes = {};

export default HeaderLayout;
