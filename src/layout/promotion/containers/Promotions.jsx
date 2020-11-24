import {Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, {useState } from "react";
import callApi from "../../../util/callerApi";
import PromotionList from "../components/PromotionList";
import Swal from "sweetalert2";

const Promotions = () => {
  const [visible, setVisible] = useState(false);
  const handleOk = (e) => {
    console.log(e);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddPromotion = () => {
    setVisible(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    callApi(
      "post",
      `${process.env.REACT_APP_URL_API}/api/promotion`,
      null,null,"").then((res)=>{
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
          <label style={{fontWeight: "bold", fontSize: "17px"}}>DANH SÁCH KHUYẾN MÃI</label>
        </Col>
        <Col md={12} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={onAddPromotion}>
            Thêm khuyến mãi
          </Button>
        </Col>
      </Row>
      <Row style={{ margin: "20px 20px" }}>
        <Col md={24}>
            <PromotionList />
        </Col>
      </Row>
      <Modal
        title="THÊM KHUYẾN MÃI"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-create-promotion",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-create-promotion"
            >
              <Form.Item
                label="Mã khuyến mãi"
                name="promotion_code"
                rules={[{ required: true, message: "Mời nhập mã khuyến mãi!" }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Tên khuyến mãi"
                name="name"
                rules={[{ required: true, message: "Mời nhập tên khuyến mãi!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
      </Modal>
    </React.Fragment>
  );
};

export default Promotions;
