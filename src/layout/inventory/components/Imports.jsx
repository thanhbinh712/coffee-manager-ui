import { Button, Col, Input, Row, Modal, Form, Table, Select } from "antd";
import React, { useState, useEffect } from "react";
import callApi from "../../../util/callerApi";
import ImportList from "./ImportList";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
const { Option } = Select;

const Imports = () => {
  const [visible, setVisible] = useState(false);
  const [ingredientVisible, setIngredientVisible] = useState(false);
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newData, setNewData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [import_details, setImportDetails] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [form] = Form.useForm();
  const [formImport] = Form.useForm();
  const handleOk = (e) => {
    console.log(e);
  };
  useEffect(() => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/ingredient`,
      null,
      null,
      ""
    ).then((res) => {
      setLoading(false);
      setIngredients(res.data.data);
      // setTotal(res.data.total);
    });
  }, []);
  const handleCancel = (e) => {
    setVisible(false);
  };
  const handleIngredientCancel = (e) => {
    setIngredientVisible(false);
  };
  const onAddImport = () => {
    
    formImport.setFieldsValue({
      import_code:"PN"+moment(new Date()).format('YYYYMMDD-HHmm'),
      name: user?.name,
      users_id: user?.id,
    });
    setVisible(true);
  };


  const onAddIngredient = () => {
    setIngredientVisible(true);

  };

  const onAddImportIngredient = (value) => {
    let temp= ingredientList;
    let index=temp.findIndex(t=>t.ingredient_code===value.ingredient_code);
    if(index!==-1){
      temp[index].number+=1
    }
    else{
      temp.push({
        ...value,
        number: 1
      });
    }
    setIngredientList([...temp]);
    console.log(temp);
  };

  const onFinishAddIngredient = (value) => {
    let temp= ingredientList;
    let index=temp.findIndex(t=>t.ingredient_code===value.ingredient_code);
    if(index!==-1){
      temp[index].number+=value.number;
    }
    else{
      temp.push({
        ...value,
        number: value.number
      });
    }
    setIngredientList([...temp]);
    console.log(temp);
    
    setIngredientVisible(false);

    formImport.setFieldsValue({
      total:calculateTotalPrice(temp)
    });
  };

  const calculateTotalPrice = (value) => {
      let totalPrice = 0;
      for (let i = 0; i < value.length; i++) {
        totalPrice += parseInt(value[i].price_unit)*parseInt(value[i].number);
    }
    return totalPrice;
  }

  const calculateEachPrice = (value) => {
    let price = 0;
    price = (value.price_unit)*parseInt(value.number)
    return price;
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  let user = JSON.parse(localStorage.getItem("user"));
  const onFinish = (values) => {
    callApi(
      "post",
      `${process.env.REACT_APP_URL_API}/api/auth/create_import`,
      {...values,listIngredients:[...ingredientList]},
      null,
      user.accessToken
    )
      .then((res) => {
        setNewData(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setVisible(false);
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
      title: "Mã",
      dataIndex: "ingredients_ingredient_code",
      key: "ingredients_ingredient_code",
    },
    {
      title: "Tên nguyên liệu",
      dataIndex: "name",
      key: "name", 
    },
    {
      title: "Đơn vị tính",
      dataIndex: "price_unit",
      key: "price_unit",
    },
    {
      title: "Số lượng",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (text, record) => calculateEachPrice(record)
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

  return (
    <React.Fragment>
      <Row style={{ marginRight: "300px" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px" }}>
          DANH SÁCH PHIẾU NHẬP
        </label>
        <Button
          type="primary"
          onClick={onAddImport}
          style={{ marginLeft: "10px" }}
        >
          Thêm phiếu nhập
        </Button>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col md={24}>
          <ImportList dataCreate={newData}/>
        </Col>
      </Row>
      <Modal
        style={{ width: "100%" }}
        title="THÊM PHIẾU NHẬP"
        titleBackground="blue"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-create-import",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={formImport}
          id="category-editor-form-create-import"
        >
          <Form.Item
            label="Mã phiếu nhập"
            name="import_code"
            rules={[{ required: true, message: "Mời nhập mã phiếu nhập!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Nhân viên" style={{ marginBottom: 0 }}>
            <Form.Item
              name="users_id"
              rules={[{ required: true }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input disabled />
            </Form.Item>
            {/* <Row style={{ marginLeft:"40px"}}> */}
            <label>Danh sách nguyên liệu</label>
            <Button type="primary" onClick={onAddIngredient}>
              Thêm nguyên liệu
            </Button>
            {/* </Row> */}
          </Form.Item>
          <Table
            columns={columns}
            //loading={loading}
           dataSource={ingredientList}
          ></Table>
          <Form.Item
            style={{ marginTop: "5px" }}
            label="Thành tiền"
            name="total"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="THÊM NGUYÊN LIỆU"
        visible={ingredientVisible}
        onOk={handleOk}
        onCancel={handleIngredientCancel}
        okButtonProps={{
          form: "category-editor-form-add-ingredient",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinishAddIngredient}
          id="category-editor-form-add-ingredient"
          form={form}
        >
          <Form.Item
            label="Nguyên liệu"
            name="ingredients_ingredient_code"
            rules={[{ required: true, message: "Mời chọn nguyên liệu!" }]}
          >
            <Select
              placeholder="--Chọn nguyên liệu--"
              showSearch
              style={{ width: "100%" }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {ingredients.map((ingredient, index) => (
                <Option value={ingredient.ingredient_code} key={index}>
                  {ingredient.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="number"
            rules={[{ required: true, message: "Mời nhập số lượng!" }]}
          >
            <Input placeholder="Số lượng"/>
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="price_unit"
            rules={[{ required: true, message: "Mời nhập đơn giá!" }]}
          >
            <Input placeholder="Đơn giá"/>
          </Form.Item>
          <Form.Item
            label="Thành tiền"
            name="total_price"
          >
            <Input placeholder="0"/>
          </Form.Item>  
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default Imports;
