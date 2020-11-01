import React from "react";
import "./App.css";
import HeaderLayout from "./components/Header/index";
import SiderLayout from "./components/slider/index";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import Screen1 from "./layout/test/screen1";
import PublicRoute from "./router/PublicRouter";
import {PrivateRoute} from "./router/PrivateRouter";
import Login from "./layout/test/login";
import Products from "./layout/product/containers/Products";
function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Login} path="/login" exact />
          {/*customer*/}
          <Route exact path="/">
            {/* <div class="super_container">
              <HeaderCustomer />
              <Main />
              <Footer />
            </div> */}
          </Route>

        {/*admin*/}
        <Route path="/admin">
          <Layout>
            <SiderLayout />
            <Layout className="site-layout">
              <HeaderLayout />
              <Switch>
                <PrivateRoute exact path="/admin/home" component={Screen1} />
                <PrivateRoute exact path="/admin/product" component={Products} />
              </Switch>
            </Layout>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
