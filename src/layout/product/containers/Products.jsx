import { message, Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import callApi from "../../../util/callerApi";
import ProductList from "./../components/ProductList";
import Swal from "sweetalert2";
import axios from "axios";
const { Option } = Select;

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const Products = () => {
  const [visible, setVisible] = useState(false);
  const [file,setFile]=useState(null);
  const [types, setTypes] = useState([]);
  const handleOk = (e) => {
    console.log(e);
  };


  useEffect(() => {
    callApi("get", `${process.env.REACT_APP_URL_API}/api/type`, null, null, "").then(
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
    const formData = new FormData();
    formData.append("image", file);
    formData.append("product_code", values.product_code);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("types_type_code",values.types_type_code);
    axios.post('http://localhost:8080/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
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
      <Row style={{ marginLeft: "50px" , marginRight: "600px", marginTop: "20px"}}>
        <Col md={12}>
          <label style={{fontWeight: "bold", fontSize: "20px"}}>DANH SÁCH SẢN PHẨM</label>
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
        title="THÊM MÓN MỚI"
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
                <Input thousandSeparator={true} suffix={' VNĐ'} />
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
          <input type="file"  onChange={(evt) => {
                evt.preventDefault();
                console.log(evt.target.files[0]);
               setFile(evt.target.files[0])
            }}/>
        </div>
           
      </Modal>
    </React.Fragment>
  );
};

export default Products;
