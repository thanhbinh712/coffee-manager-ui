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

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [initFilter,setInitFilter] = useState({page:1,perPage:10});
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  useEffect(() => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/ingredient`,
      null,
      { page: 1, perPage: 10 },
      ""
    ).then((res) => {
      setLoading(false);
      setIngredients(res.data.data);
      setTotal(res.data.total);
    });
  }, []);
  const onUpdate = (record) => {
    setVisible(true);
    console.log(record);
    form.setFieldsValue({
      ingredient_code: record.ingredient_code,
      name: record.name,
      unit: record.unit,
      quantity: record.quantity,
      warning_limited: record.warning_limited,
      inventory: record.inventory,
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
      `${process.env.REACT_APP_URL_API}/api/ingredient`,
      null,
      { page: 1, perPage: 10,name:value.name },
      ""
    ).then((res) => {
      setLoading(false);
      setIngredients(res.data.data);
      setTotal(res.data.total);
      setInitFilter({ page: 1, perPage: 10,name:value.name })
    });
    //    setVisible(false)
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
      title: "Mã",
      dataIndex: "ingredient_code",
      key: "ingredient_code",
    },
    {
      title: "Tên nguyên liệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
    },
    {
        title: "Định lượng",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Giới hạn cảnh báo",
        dataIndex: "warning_limited",
        key: "warning_limited",
      },
      {
        title: "Số lượng tồn",
        dataIndex: "inventory",
        key: "inventory",
      },
    {
      title: "Action",
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
            title="Sửa nguyên liệu"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              form: "category-editor-form-update-ingredient",
              key: "submit",
              htmlType: "submit",
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              //onFinish={onFinish}
              id="category-editor-form-update-ingredient"
              form={form}
            >
              <Form.Item
                label="Mã nguyên liệu"
                name="ingredient_code"
                rules={[{ required: true, message: "Mời nhập mã nguyên liệu!" }]}
              >
                <Input disabled />
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
      ),
    },
  ];
  const onChangeSize = (page, pageSize) => {
    setCurrent(parseInt(page.current));
    setLoading(true);
    callApi(
      "get",
      "http://localhost:8080/api/ingredient",
      null,
      { page: parseInt(page.current), perPage: 10 },
      ""
    ).then((res) => {
      setLoading(false);
      setIngredients(res.data.data);
      setTotal(res.data.total);
      setInitFilter({ page: parseInt(page.current), perPage: 10 })
    });
  };
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
        dataSource={ingredients}
        pagination={{
          total: total,
          defaultPageSize: 10,
          position: [/*"topRight"*,*/ "bottomRight"],
          current: current,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]} đến ${range[1]} trên tổng số  ${total} nguyên liệu`,
        }}
        onChange={onChangeSize}
      />
    </React.Fragment>
  );
};

export default IngredientList;
