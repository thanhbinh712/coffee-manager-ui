import React, { useEffect, useState } from "react";
import callApi from "../../../util/callerApi";
import Swal from "sweetalert2";
import { Table, Button, Col, Input, Row, Modal, Form } from "antd";

const TypeList = (props) => {
  const [types, setTypes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (props.dataCreate) {
      let temp = types?types:[];
      temp.push({
        type_code: props.dataCreate.type_code,
        name: props.dataCreate.name,
      });
      setTypes([...temp]);
    }
  }, [props.dataCreate]);
  useEffect(() => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/type`,
      null,
      null,
      ""
    ).then((res) => {
      setLoading(false);
      setTypes(res.data.data);
    });
  }, []);
  const onUpdate = (record) => {
    setVisible(true);
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

  const onFinishFilter = (value) => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/type`,
      null,
      {name:value.name},
      ""
    ).then((res) => {
      setLoading(false);
      setTypes(res.data.data);
    });
  };

  const onFinish = (values) => { 
    callApi(
      "put",
      `${process.env.REACT_APP_URL_API}/api/type`,
      values,
      null,
      user.accessToken
    )
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          let temp=types;
          let index=temp.findIndex(t=>t.type_code===res.data.type_code);
          if(index!==-1){
            temp[index]=res.data;
            setTypes([...temp]);
            setVisible(false)
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
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
      if (result.value) {
        callApi(
          "delete",
          `${process.env.REACT_APP_URL_API}/api/type`,
          param,
          null,
          user.accessToken
        )
          .then((res) => {
            if (res.status === 500) {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Thất bại",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thành công",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                let temp=types;
                let index=temp.findIndex(t=>t.type_code===res.data.deleted);
                if(index!==-1){
                  temp.splice(index, 1);
                  setTypes([...temp]);
                }
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Đã có sản phẩm. Không thể xóa!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
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
      <Row>
        <Col md={16}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinishFilter}
            form={formFilter}
          >
            <Form.Item label="Tìm kiếm" name="name">
              <Input placeholder="Nhập tên để tìm!" />
            </Form.Item>
          </Form>
        </Col>
        <Col style={{ marginRight: "20px" }}>
          <Button type="primary" onClick={() => formFilter.submit()}>
            Tìm
          </Button>
        </Col>
      </Row>
      <Table bordered columns={columns} loading={loading} dataSource={types} />
    </React.Fragment>
  );
};

export default TypeList;
