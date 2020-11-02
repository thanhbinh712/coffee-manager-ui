import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import callApi from "../../../util/callerApi";
import { Button, Col, Input, Row, Modal, Form, Select , Table, Image} from "antd";
const { Option } = Select;
const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [form]=Form.useForm();
  useEffect(() => {
    callApi("get", "http://localhost:8080/api/product", null, null, "").then(
      (res) => {
        setProducts(res.data);
      }
    );
  }, []);
  const onUpdate = (record) => {
    setVisible(true);
    console.log(record);
    form.setFieldsValue({
      product_code:record.product_code,
      name:record.name,
      price:record.price,
      description:record.description,
      image:record.image,
      types_type_code:record.types_type_code,
    })
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleOk = (e) => {
    //    setVisible(false)
  };

  const onFinish = () => {
    //    setVisible(false)
  };

  const onDelete = (record) => {};

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns = [
    {
      title: "Product code",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) =>(
        <img src = {`http://localhost:8080/image/${record.image}`} width="50vh" height = "50vh">
        </img>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => 
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
            title="Sửa món"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              form: "category-editor-form-update-product",
              key: "submit",
              htmlType: "submit",
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-update-product"
              form={form}
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
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
    },
  ];
  return (
    <React.Fragment>
      <Table dataSource={products} columns={columns} />
    </React.Fragment>
  );
};

export default ProductList;
