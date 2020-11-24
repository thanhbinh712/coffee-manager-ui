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

const TypeList = () => {
  const [types, setTypes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  let user=JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/type`,null, null,"").then(
        (res) => {
      setLoading(false);
      setTypes(res.data);
    });
  }, []);
  const onUpdate = (record) => {
    setVisible(true);
    console.log(record);
    form.setFieldsValue({
      type_code: record.type_code,
      name: record.name,
    });
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleOk = (e) => {
    //    setVisible(false)
  };

  const onFinish = (values) => {
    callApi(
      "put",
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

  const onDelete = (record) => {
    let param = {
      type_code: record.type_code,
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
      if(result.values){
        callApi(
          "delete",
          `${process.env.REACT_APP_URL_API}/api/type`,
          param,null,user.accessToken).then((res)=>{
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
      }
    });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns = [
    {
      title: "Mã loại",
      dataIndex: "type_code",
      key: "type_code",
    },
    {
      title: "Tên loại",
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
            title="Sửa danh mục"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              form: "category-editor-form-update-type",
              key: "submit",
              htmlType: "submit",
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-update-type"
              form={form}
            >
              <Form.Item
                label="Mã loại"
                name="type_code"
                rules={[{ required: true, message: "Mời nhập mã loại!" }]}
              >
                <Input disabled />
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
        dataSource={types}
      />
    </React.Fragment>
  );
};

export default TypeList;
