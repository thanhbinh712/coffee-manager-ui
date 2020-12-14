import {Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, {useState } from "react";
import callApi from "../../../util/callerApi";
import AreaList from "../components/AreaList";
import Swal from "sweetalert2";

const Areas = () => {
  const [visible, setVisible] = useState(false);
  const handleOk = (e) => {
    console.log(e);
  };
  let user=JSON.parse(localStorage.getItem('user'));
  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddArea = () => {
    setVisible(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    callApi(
      "post",
      `${process.env.REACT_APP_URL_API}/api/area`,
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
   
  };
  return (
    <React.Fragment>
      <Row style={{marginRight: "300px"}}>
          <label style={{fontWeight: "bold", fontSize: "20px"}}>DANH MỤC KHU VỰC</label>
          <Button type="primary" onClick={onAddArea} style={{marginLeft: "10px"}}>
            Thêm khu vực
        </Button>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col md={24}>
            <AreaList/>
        </Col>
      </Row>
      <Modal
        title="THÊM KHU VỰC"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-create-area",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-create-area"
            >
              <Form.Item
                label="Mã khu vực"
                name="area_code"
                rules={[{ required: true, message: "Mời nhập mã khu vực!" }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Tên khu vực"
                name="name"
                rules={[{ required: true, message: "Mời nhập tên khu vực!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
      </Modal>
    </React.Fragment>
  );
};

export default Areas;
