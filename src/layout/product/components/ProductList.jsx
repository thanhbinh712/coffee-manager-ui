import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import callApi from "../../../util/callerApi";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Table,
  message,
  Button,
  Col,
  Input,
  Row,
  Modal,
  Form,
  Select,
} from "antd";
const { Option } = Select;

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [types, setTypes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [initFilter, setInitFilter] = useState({ page: 1, perPage: 10 });
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  useEffect(() => {
    if (props.dataCreate) {
      let temp = products ? products : [];
      temp.push(props.dataCreate);
      setProducts([...temp]);
    }
  }, [props.dataCreate]);
  useEffect(() => {
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/type`,
      null,
      null,
      ""
    ).then((res) => {
      setTypes(res.data.data);
    });
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/product`,
      null,
      { page: 1, perPage: 10 },
      ""
    ).then((res) => {
      setLoading(false);
      setProducts(res.data.data);
      setTotal(res.data.total);
    });
  }, []);
  const onUpdate = (record) => {
    setVisible(true);
    console.log(record);
    form.setFieldsValue({
      product_code: record.product_code,
      name: record.name,
      price: record.price,
      description: record.description,
      image: record.image,
      types_type_code: record?.detail_type?.type_code,
    });
    console.log(record.image);
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
      `${process.env.REACT_APP_URL_API}/api/product`,
      null,
      { page: 1, perPage: 10, name: value.name },
      ""
    ).then((res) => {
      setLoading(false);
      setProducts(res.data.data);
      setTotal(res.data.total);
    });
  };

  const onFinish = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("image", file);
    // formData.append("_method", "put");
    formData.append("product_code", values.product_code);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("types_type_code", values.types_type_code);
    axios
      .post(`${process.env.REACT_APP_URL_API}/api/update_product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          let temp = products;
          let index = temp.findIndex(
            (p) => p.product_code === res.data.product_code
          );
          if (index !== -1) {
            temp[index] = res.data;
            setProducts([...temp]);
            setVisible(false);
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
      product_code: record.product_code,
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
          `${process.env.REACT_APP_URL_API}/api/product`,
          param,
          null,
          ""
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
                let temp = products;
                let index = temp.findIndex(
                  p => p.product_code === res.data.deleted
                );
                if (index !== -1) {
                  temp.splice(index, 1);
                  setProducts([...temp]);
                }
              });
            }
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
      }
    });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`${process.env.REACT_APP_URL_API}/image/${record.image}`}
          width="50vh"
          height="50vh"
        ></img>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <NumberFormat
          value={record.price}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" VNĐ"}
        />
      ),
    },
    {
      title: "Loại",
      // dataIndex: "types_type_code",
      key: "types_type_code",
      render: (text, record) => <a>{record?.detail_type?.name}</a>,
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
        </React.Fragment>
      ),
    },
  ];
  const onChangeSize = (page, pageSize) => {
    setCurrent(parseInt(page.current));
    setLoading(true);
    callApi(
      "get",
      "http://localhost:8080/api/product",
      null,
      { page: parseInt(page.current), perPage: 10 },
      ""
    ).then((res) => {
      setLoading(false);
      setProducts(res.data.data);
      setTotal(res.data.total);
      setInitFilter({ page: parseInt(page.current), perPage: 10 });
    });
  };
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
            // dataSource={ingredients}
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
      <Table
        bordered
        columns={columns}
        loading={loading}
        dataSource={products}
        pagination={{
          total: total,
          defaultPageSize: 10,
          position: [/*"topRight"*,*/ "bottomRight"],
          current: current,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]} đến ${range[1]} trên tổng số  ${total} sản phẩm`,
        }}
        onChange={onChangeSize}
      />
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
          //initialValues={{ remember: true }}
          onFinish={onFinish}
          id="category-editor-form-update-product"
          form={form}
        >
          <Form.Item
            label="Mã món"
            name="product_code"
            rules={[{ required: true, message: "Mời nhập mã món!" }]}
          >
            <Input disabled />
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
            <Input thousandSeparator={true} suffix={" VNĐ"} />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
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
        <div>
          <input
            type="file"
            name="image"
            onChange={(evt) => {
              evt.preventDefault();
              console.log(evt.target.files[0]);
              setFile(evt.target.files[0]);
            }}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ProductList;
