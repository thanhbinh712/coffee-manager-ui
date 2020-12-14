import React, { useEffect, useState } from "react";
import callApi from "../../../util/callerApi";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { Table, message, Button, Col, Input, Row, Modal, Form } from "antd";

const ImportList = (props) => {
  const [imports, setImports] = useState([]);
  const [visible, setVisible] = useState(false);
  const [import_details, setImportDetails] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (props.dataCreate) {
      let temp = imports ? imports : [];
      temp.push(props.dataCreate);
      setImports([...temp]);
    }
  }, [props.dataCreate]);

  useEffect(() => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/get_import`,
      null,
      null,
      ""
    ).then((res) => {
      setLoading(false);
      setImports(res.data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/get_import_details`,
      null,
      null,
      ""
    ).then((res) => {
      setLoading(false);
      setImportDetails(res.data);
    });
  }, []);

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleOk = (e) => {
    //    setVisible(false)
  };

  const onShowImport = (record) => {
    let filter = record.imports_import_code;
    setVisible(true);
    form.setFieldsValue({
      import_code: record.import_code,
      users_id: record.detail_user_import?.id,
      users_name: record.detail_user_import?.name,
      total: record.detail_user_import?.total,
    })
      callApi(
        "get",
        `${process.env.REACT_APP_URL_API}/api/get_import_details`,
       null,
       {filter},
        ""
      ).then((res) => {
        setLoading(false);
        setImportDetails(res.data);
      });
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columnsIngredient = [
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
    },
  ];

  const columns = [
    {
      title: "Mã phiếu nhập",
      dataIndex: "import_code",
      key: "import_code",
    },
    {
      title: "ID Nhân viên",
      key: "users_id",
      render: (text, record) => <a>{record?.detail_user_import?.id}</a>,
    },
    {
      title: "Họ tên",
      key: "users_name",
      render: (text, record) => <a>{record?.detail_user_import?.name}</a>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text, record) => (
        <NumberFormat
          value={record.total}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" VNĐ"}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (text, record) => (
        <React.Fragment>
          <Button type="danger" onClick={() => onShowImport(record)}>
            Xem chi tiết
          </Button>
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
            // onFinish={onFinishFilter}
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
        dataSource={imports}
      />
       <Modal
            title="Thông tin phiếu nhập"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              form: "category-editor-form-show-import",
              key: "submit",
              htmlType: "submit",
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              id="category-editor-form-show-import"
              form={form}
            >
              <Form.Item label="Mã phiếu nhập" name="import_code">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Nhân viên" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="users_id"
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="users_name"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  <Input disabled />
                </Form.Item>
                <label>Danh sách nguyên liệu</label>
              </Form.Item>
              <Table
                columns={columnsIngredient}
                dataSource={import_details}
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
    </React.Fragment>
  );
};

export default ImportList;
