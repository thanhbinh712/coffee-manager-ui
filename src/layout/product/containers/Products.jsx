import { Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import callApi from "../../../util/callerApi";
import ProductList from "./../components/ProductList";
import Swal from "sweetalert2";
const { Option } = Select;
const Products = () => {
  const [visible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const handleOk = (e) => {
    //    setVisible(false)
  };

  useEffect(() => {
    callApi("get", "http://localhost:8080/api/type", null, null, "").then(
      (res) => {
        setTypes(res.data);
      }
    );
  }, []);

  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddProduct = () => {
    setVisible(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
      callApi("post", "http://localhost:8080/api/product", values, null, JSON.parse(localStorage.getItem("user")).accessToken)
        .then((res) => {
          localStorage.setItem("type_code", JSON.stringify(res.data));
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
      <Row style={{ margin: "20px 20px" }}>
        <Col md={12}>
          <label>Danh sách món</label>
        </Col>
        <Col md={12} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={onAddProduct}>
            Thêm món
          </Button>
        </Col>
      </Row>
      <Row style={{ margin: "20px 20px" }}>
        <Col md={24}>
          <ProductList />
        </Col>
      </Row>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-create-product",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          id="category-editor-form-create-product"
        >
          <Form.Item
            label="Mã món"
            name="product_code"
            rules={[{ required: true, message: "Mời nhập mã món!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên món"
            name="name"
            rules={[{ required: true, message: "Mời nhập tên món!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Mời nhập giá!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Mời chọn hình!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại"
            name="types_type_code"
            rules={[{ required: true, message: "Mời chọn loại!" }]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {types.map((type, index) => (
                <Option value={type.type_code} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
              </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default Products;
