import React from "react";
import "./App.css";
import HeaderLayout from "./components/Header/index";
import SiderLayout from "./components/slider/index";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import Staffs from "./layout/admin/ManagerStaff/Staffs";
import PublicRoute from "./router/PublicRouter";
import {PrivateRoute} from "./router/PrivateRouter";
import Login from "./layout/test/login";
import Inventory from "./layout/inventory/containers/Inventory";
import UploadImage from "./layout/product/components/UploadImage";
import ProductTypes from "./layout/product/containers/ProductTypes";
import AreaTables from "./layout/areas/containers/AreaTables";
import PromotionDetails from "./layout/promotion/containers/PromotionDetails";
import DashBoard from "./layout/admin/DashBoard/DashBoard";
import CustomerHeader from "./components/HeaderCustomer/HeaderCustomer";
import HomePage from "./views/HomePage/containers/Index";
import MenuOrder from "./layout/menu_order/containers/MenuOrder";
import Order from "./layout/menu_order/components/Order";
import HeaderOrder from "./layout/menu_order/components/HeaderOrder";
import MenuAreas from "./layout/menu_order/containers/MenuAreas";
import Bartender from "./layout/batender/Bartender";
function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Login} path="/login" exact />
          {/*customer*/}
          <Route exact path="/">
            <div className = "super_container">
              <HomePage/>
            </div>
          </Route>
          <Route path="/order">
            {/* <HeaderOrder/> */}
              <Order/>
          </Route>
          <Route path="/bartender">
              <Bartender/>
            </Route>

        {/*admin*/}
        <Route path="/admin">
          <Layout>
            <SiderLayout />
            <Layout className="site-layout">
              <HeaderLayout />
              <Switch>
                <PrivateRoute exact path="/admin/home" component={Staffs} />
                <PrivateRoute exact path="/admin/upload" component={UploadImage} />
                <PrivateRoute exact path="/admin/product" component={ProductTypes} />
                <PrivateRoute exact path="/admin/inventory" component={Inventory} />
                <PrivateRoute exact path="/admin/area" component={AreaTables} />
                <PrivateRoute exact path="/admin/promotion" component={PromotionDetails} />
                <PrivateRoute exact path="/admin/dashboard" component={DashBoard} />
                <PrivateRoute exact path="/admin/order" component={MenuOrder} />
                <PrivateRoute exact path="/admin/menu_table" component={MenuAreas} />
              </Switch>
            </Layout>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
