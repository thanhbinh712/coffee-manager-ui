import React from "react";
import "./App.css";
import HeaderLayout from "./components/Header/index";
import SiderLayout from "./components/slider/index";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import Staffs from "./layout/admin/ManagerStaff/Staffs";
import PublicRoute from "./router/PublicRouter";
import {PrivateRoute} from "./router/PrivateRouter";
import Footer from "./components/Footer/index";
import Login from "./layout/test/login";
import Inventory from "./layout/inventory/containers/Inventory";
import UploadImage from "./layout/product/components/UploadImage";
import ProductTypes from "./layout/product/containers/ProductTypes";
import AreaTables from "./layout/areas/containers/AreaTables";
import PromotionDetails from "./layout/promotion/containers/PromotionDetails";
import DashBoard from "./layout/admin/DashBoard/DashBoard";
import CustomerHeader from "./components/HeaderCustomer/HeaderCustomer";
function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Login} path="/login" exact />
          {/*customer*/}
          <Route exact path="/">
            <div className = "super_container">
              <CustomerHeader/>
              {/* <Footer/> */}
            </div>
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
              </Switch>
            </Layout>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
