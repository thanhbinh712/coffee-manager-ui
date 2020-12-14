import {Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, {useState } from "react";
import callApi from "../../../util/callerApi";
import IngredientList from "./IngredientList";
import Swal from "sweetalert2";
import axios from "axios";

const Ingredients = () => {
  const [newData, setNewData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const handleOk = (e) => {
    console.log(e);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddIngredient = () => {
    setVisible(true);
  };
  // const onFinishFilter=(value)=>{
  //   setLoading(true);
  //   callApi(
  //     "get",
  //     `${process.env.REACT_APP_URL_API}/api/ingredient`,
  //     null,
  //     { page: 1, perPage: 10,name:value.name },
  //     ""
  //   ).then((res) => {
  //     setLoading(false);
  //     setIngredients(res.data.data);
  //     setTotal(res.data.total);
  //   });
  // }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  let user=JSON.parse(localStorage.getItem('user'));
  const onFinish = (values) => {
    callApi("post", process.env.REACT_APP_URL_API+"/api/ingredient", values, null, user.accessToken).then((res)=>{
      setNewData(res.data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        setVisible(false);
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
  const [formFilter] = Form.useForm();
  return (
    <React.Fragment>
      <Row style={{marginRight: "300px"}}>
          <label style={{fontWeight: "bold", fontSize: "20px"}}>DANH SÁCH NGUYÊN LIỆU</label>
          <Button type="primary" onClick={onAddIngredient} style={{marginLeft: "10px"}}>
            Thêm nguyên liệu
        </Button>
      </Row>
      <Row style={{marginRight:"20px"}}>
        <Col md={24}>
          <IngredientList dataCreate={newData}/>
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

export default Ingredients;
