import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import callApi from "./../../util/callerApi";
import "./login.css";
import { Form, Input, Button, Checkbox, Row, Col, Image, Layout } from "antd";
import {Redirect} from "react-router-dom";
const { Footer, Content } = Layout;
const Login = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {}, []);
  //   const onUpdate=(record)=>{
  //     console.log(record)
  //   }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const Demo = () => {
    const onFinish = (values) => {
      console.log("Success:", values);
      callApi("post", "http://localhost:8080/api/auth/login", values, null, "")
        .then((res) => {
          //setUsers(res.data);//lưu thhoong tin trên local storege
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.reload(false)
        })
        .catch((err) => console.log(err));
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <Layout className="form-signin-custom" style={{height:"100vh",width:"100%"}}>
        <Content>
        <Row>
          <Col md={8}></Col>
          <Col md={8} style={{ marginTop: "30vh" }}>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              {...layout}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Mời nhập email!" },
                  { type: "email", message: "Không đúng định dạng" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Mời nhập mật khẩu!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Nhớ mật khẩu</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        </Content>
      </Layout>
    );
  };
  return (
    <React.Fragment>
      <Demo />
    </React.Fragment>
  );
};

Login.propTypes = {};

export default Login;
