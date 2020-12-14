import {  Upload, message, Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import callApi from "../../../util/callerApi";
import TableList from "./../components/TableList";
import Swal from "sweetalert2";
const { Option } = Select;

const Tables = () => {
  const [visible, setVisible] = useState(false);
  const [areas, setAreas]= useState([]);
  const handleOk = (e) => {
    console.log(e);
  };
  let user=JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    callApi("get", `${process.env.REACT_APP_URL_API}/api/area`, null, null, "").then(
      (res) => {
        setAreas(res.data);
      }
    );
  }, []);

  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddTable = () => {
    setVisible(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    callApi(
        "post",
        `${process.env.REACT_APP_URL_API}/api/table`,
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
      <Row style={{marginRight: "300px"}}>
          <label style={{fontWeight: "bold", fontSize: "20px"}}>DANH SÁCH BÀN</label>
          <Button type="primary" onClick={onAddTable} style={{marginLeft: "10px"}}>
            Thêm bàn
        </Button>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col md={24}>
          <TableList />
        </Col>
      </Row>
      <Modal
        title="THÊM BÀN MỚI"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-create-table",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          id="category-editor-form-create-table"
        >
          <Form.Item
            label="Mã bàn"
            name="table_code"
            rules={[{ required: true, message: "Mời nhập mã bàn!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên bàn"
            name="name"
            rules={[{ required: true, message: "Mời nhập tên bàn!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số chỗ"
            name="seat_number"
            rules={[{ required: true, message: "Mời nhập số chỗ!" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Mời nhập trạng thái!" }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Khu vực"
            name="areas_area_code"
            rules={[{ required: true, message: "Mời chọn khu vực!" }]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {areas.map((area, index) => (
                <Option value={area.area_code} key={index}>
                  {area.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default Tables;
