import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Row, Col } from "antd";
import { Link, useLocation } from "react-router-dom";
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
    // <Header
    //   className="site-layout-sub-header-background header-width"
    //   style={{
    //     padding: 0,
    //     position: "fixed",
    //     zIndex: 1,
    //     background: "#001529",
    //     width: "89vw",
    //     flexWWrap: "nowrap",
    //   }}
    // >
    //   <Row>
    //     <Col md={16}><a href="/admin/order">Order</a>
    //     <a href="/admin/menu_table">Table</a>
    //     </Col>
    //     <Col md={6} style={{ textAlign: "right" }}>
    //       {" "}
    //       <Dropdown overlay={menu} trigger={["click"]}>
    //         <div style={{ color: "white" }}>
    //         <Avatar src="https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser--flat-color-icon--vector-icon-banner-templ-png-image_1491720.jpg" />
    //           {user?.name}
    //         </div>
    //       </Dropdown>
    //     </Col>
    //   </Row>
    // </Header>
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      {/* <div
        style={{
          width: "120px",
          height: "31px",
          margin: "16px 24px 0px 0",
          float: "left",
          textAlign: "center",
          color: "white",
        }}
      >
      </div> */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="1">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="2">
        <Link to="/bartender">Order</Link>
        </Menu.Item> 
        <Menu.Item key="3">
        <Link to="/order">Quản lý</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Dropdown overlay={menu} trigger={["click"]}>
            <div style={{ color: "white" }}>
              <Avatar src="https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser--flat-color-icon--vector-icon-banner-templ-png-image_1491720.jpg" />
              {user?.name}
            </div>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

HeaderLayout.propTypes = {};

export default HeaderLayout;
