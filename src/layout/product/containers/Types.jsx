import {Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, {useState } from "react";
import callApi from "../../../util/callerApi";
import TypeList from "../components/TypeList";
import Swal from "sweetalert2";

const Types = () => {
  const [visible, setVisible] = useState(false);
  const handleOk = (e) => {
    console.log(e);
  };
  let user=JSON.parse(localStorage.getItem('user'));
  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddType = () => {
    setVisible(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    callApi(
      "post",
      `${process.env.REACT_APP_URL_API}/api/type`,
      values,null,user.accessToken).then((res)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        window.location.reload(false)
      })
    })
    .catch((err) => {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Thất bại',
            showConfirmButton: false,
            timer: 1500
          })
    });
  };
  return (
    <React.Fragment>
      <Row style={{ marginLeft: "20px" , marginRight: "700px", marginTop: "20px"}}>
        <Col md={12}>
          <label style={{fontWeight: "bold", fontSize: "17px"}}>DANH MỤC SẢN PHẨM</label>
        </Col>
        <Col md={12} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={onAddType}>
            Thêm danh mục
          </Button>
        </Col>
      </Row>
      <Row style={{ margin: "20px 20px" }}>
        <Col md={24}>
            <TypeList/>
        </Col>
      </Row>
      <Modal
        title="THÊM DANH MỤC"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-create-type",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-create-type"
            >
              <Form.Item
                label="Mã loại"
                name="type_code"
                rules={[{ required: true, message: "Mời nhập mã loại!" }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Tên loại"
                name="name"
                rules={[{ required: true, message: "Mời nhập tên loại!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
      </Modal>
    </React.Fragment>
  );
};

export default Types;
