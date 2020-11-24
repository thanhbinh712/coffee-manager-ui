import React, { useEffect, useState } from "react";
import callApi from "../../../util/callerApi";
import Swal from "sweetalert2";
import {
  Table,
  message,
  Button,
  Col,
  Input,
  Row,
  Modal,
  Form,
} from "antd";

const AreaList = () => {
  const [areas, setAreas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  useEffect(() => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/area`,null, null,"").then(
        (res) => {
      setLoading(false);
      setAreas(res.data);
    });
  }, []);
  const onUpdate = (record) => {
    setVisible(true);
    console.log(record);
    form.setFieldsValue({
      area_code: record.area_code,
      name: record.name,
    });
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleOk = (e) => {
    //    setVisible(false)
  };

  const onFinish = (value) => {
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/area`,
      null,
      null,
      ""
    ).then((res) => {
      setAreas(res.data);
    });
  };

  const onDelete = (record) => {
    let param = {
      status_delete: 1,
    };
    Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "Bạn không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      window.location.reload(false);
    });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns = [
    {
      title: "Mã khu vực",
      dataIndex: "area_code",
      key: "area_code",
    },
    {
      title: "Tên khu vực",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (text, record) => (
        <React.Fragment>
          <Button type="danger" onClick={() => onDelete(record)}>
            Xóa
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 5 }}
            onClick={() => onUpdate(record)}
          >
            Sửa
          </Button>
          <Modal
            title="Sửa khu vực"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              form: "category-editor-form-update-area",
              key: "submit",
              htmlType: "submit",
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              //onFinish={onFinish}
              id="category-editor-form-update-area"
              form={form}
            >
              <Form.Item
                label="Mã khu vực"
                name="area_code"
                rules={[{ required: true, message: "Mời nhập mã khu vực!" }]}
              >
                <Input disabled />
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
      ),
    },
  ];

  return (
    <React.Fragment>
      <Row style={{ marginLeft: "190px"}}>
        <Col md={12}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={formFilter}
          >
            <Form.Item
              label="Tìm kiếm"
              name="name"
              rules={[
                {message: "Nhập tên để tìm!" },
              ]}
            >
              <Input />
            </Form.Item>
            
          </Form>
        </Col>
        <Col md={2} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={()=>formFilter.submit()} >
            Tìm 
          </Button>
        </Col>
      </Row>
      <Table
        bordered
        columns={columns}
        loading={loading}
        dataSource={areas}
      />
    </React.Fragment>
  );
};

export default AreaList;
