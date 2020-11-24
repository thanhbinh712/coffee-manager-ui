import {Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, {useState } from "react";
import callApi from "../../../util/callerApi";
import IngredientList from "./IngredientList";
import Swal from "sweetalert2";
import axios from "axios";

const Imports = () => {
  const [visible, setVisible] = useState(false);
  const handleOk = (e) => {
    console.log(e);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddIngredient = () => {
    setVisible(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    callApi(
      "post",
      `${process.env.REACT_APP_URL_API}/api/ingredient`,
      null,null).then((res)=>{
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
          <label style={{fontWeight: "bold", fontSize: "17px"}}>DANH SÁCH PHIẾU NHẬP</label>
        </Col>
        <Col md={12} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={onAddIngredient}>
            Thêm phiếu nhập
 A         </Button>
        </Col>
      </Row>
      <Row style={{ margin: "20px 20px" }}>
        <Col md={24}>
          <IngredientList />
        </Col>
      </Row>
      <Modal
        title="THÊM MÓN MỚI"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-create-ingredient",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-create-ingredient"
            >
              <Form.Item
                label="Mã nguyên liệu"
                name="ingredient_code"
                rules={[{ required: true, message: "Mời nhập mã nguyên liệu!" }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Tên nguyên liệu"
                name="name"
                rules={[{ required: true, message: "Mời nhập tên nguyên liệu!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Đơn vị tính"
                name="unit"
                rules={[{ required: true, message: "Mời nhập đơn vị tính!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Định lượng"
                name="quantity"
                rules={[{ required: true, message: "Mời nhập định lượng!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giới hạn cảnh báo"
                name="warning_limited"
                rules={[{ required: true, message: "Mời nhập giới hạn cảnh báo!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số lượng tồn"
                name="inventory"
                rules={[{ required: true, message: "Mời nhập số lượng tồn!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
      </Modal>
    </React.Fragment>
  );
};

export default Imports;
