import {
  Button,
  Table,
  Col,
  Input,
  Row,
  Modal,
  Form,
  Select,
  DatePicker,
  Space,
} from "antd";
import React, { useState, useEffect } from "react";
import callApi from "../../../util/callerApi";
import PromotionList from "../components/PromotionList";
import Swal from "sweetalert2";
const { RangePicker } = DatePicker;
const { Option } = Select;

const Promotions = () => {
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOk = (e) => {
    console.log(e);
  };

  useEffect(() => {
    callApi("get", `${process.env.REACT_APP_URL_API}/api/type`, null, null, "").then(
      (res) => {
        setTypes(res.data.data);
      }
    );
  }, []);
  
  const handleProductCancel = (e) => {
    setProductVisible(false);
  };

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  const onOk = (value) => {
    console.log('onOk ', value);
  }

  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddPromotion = () => {
    setVisible(true);
  };

  const onAddProduct = () => {
    setProductVisible(true);
  }
  
  const onAddTypeCode = (value) => {
      console.log(value);
      callApi(
        "get",
        `${process.env.REACT_APP_URL_API}/api/type/product`,
        null,
        {types_type_code:value},
        ""
      ).then((res) => {
        setProducts(res.data);
      });
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    callApi(
      "post",
      `${process.env.REACT_APP_URL_API}/api/promotion`,
      null,
      null,
      ""
    )
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload(false);
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

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "% KM",
      dataIndex: "price_unit",
      key: "price_unit",
    },
    {
      title: "Giá KM",
      dataIndex: "price_discount",
      key: "price_discount",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <React.Fragment>
          <Button type="danger">Xóa</Button>
          <Button type="primary" style={{ marginLeft: 5 }}>
            Sửa
          </Button>
          {/* <Modal
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
              onFinish={onFinish}
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
          </Modal> */}
        </React.Fragment>
      ),
    },
  ];
console.log("abc",types)

  return (
    <React.Fragment>
      <Row style={{ marginRight: "300px", marginTop:"100px", marginLeft:"20px" }}>
        <div style={{textAlign:"center",fontWeight: "bold", fontSize: "30px"}}>
          DANH SÁCH KHUYẾN MÃI
        <Button
          type="primary"
          onClick={onAddPromotion}
          style={{ marginLeft: "10px" }}
        >
          Thêm khuyến mãi
        </Button>
        </div>
      </Row>
      <Row style={{ marginTop: "20px" }}>
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên khuyến mãi"
            name="name"
            rules={[{ required: true, message: "Mời nhập tên khuyến mãi!" }]}
          >
            <Input />
          </Form.Item>
            <RangePicker
            style={{marginLeft: 80}}
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
            />
            <div style={{marginTop:20, fontWeight: "bold", textAlign:"center"}} >
            <label>Sản phẩm khuyến mãi</label>
            <Button style={{marginLeft:10}} type="primary" onClick={onAddProduct} >
              Thêm sản phẩm
            </Button>
            <Table
            columns={columns}
            //loading={loading}
          //  dataSource={ingredientList}
          ></Table>
            </div>
        </Form>
      </Modal>

      <Modal
        title="SẢN PHẨM KHUYẾN MÃI"
        visible={productVisible}
        onOk={handleOk}
        onCancel={handleProductCancel}
        okButtonProps={{
          form: "category-editor-form-add-product",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinishAddIngredient}
          id="category-editor-form-add-product"
          form={form}
        >
          <Form.Item
            label="Loại"
            name="type_code"
            rules={[{ required: true, message: "Mời chọn loại!" }]}
          >
            <Select
              placeholder="--Chọn loại--"
              showSearch
              style={{ width: "100%" }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={onAddTypeCode}
            >
              {types.map((t, index) => (
               
                <Option value={t.type_code} key={index}>
                  {t.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Sản phẩm"
            name="product_code"
            rules={[{ required: true, message: "Mời chọn loại!" }]}
          >
            <Select
              placeholder="--Chọn sản phẩm--"
              showSearch
              style={{ width: "100%" }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {products.map((product, index) => (
                <Option value={product.product_code} key={index}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="% giảm"
            name="percent"
            rules={[{ required: true, message: "Mời nhập đơn giá!" }]}
          >
            <Input placeholder="Phần trăm"/>
          </Form.Item> 
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default Promotions;
