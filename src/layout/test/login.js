import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import callApi from "./../../util/callerApi";
import "./login.css";
import { Form, Input, Button, Checkbox, Row, Col, Image, Layout } from "antd";
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from "react-router-dom";

toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.TOP_LEFT
})

const { Content } = Layout;
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
      callApi("post", process.env.REACT_APP_URL_API+"/api/auth/login", values, null, "")
        .then((res) => {
          //setUsers(res.data);//lưu thhoong tin trên local storege
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.reload(false)
        })
        .catch((err) => toast('Email hoặc mật khẩu sai'));
    };
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <Layout className="form-signin-custom" style={{height:"100vh",width:"100%"}}>
        <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4 px-2">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white- border-0">
              <div className="rounded-t mb-0 px-7 py-10">
        <Content>
        <Row>
          <Col md={8}></Col>
          <Col md={8} style={{ marginTop: "30vh" }}>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
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
        </div>
        </div>
        </div>
        </div>
        </div>
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
