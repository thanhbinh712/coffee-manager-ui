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
    Select,
} from "antd";

const { Option } = Select;

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [current, setCurrent] = useState(1);
  const [initFilter,setInitFilter] = useState({page:1,perPage:10});
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  useEffect(() => {
    callApi("get", `${process.env.REACT_APP_URL_API}/api/area`, null, null, "").then(
        (res) => {
            setAreas(res.data);
        }
      );
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/table`,
      null,
      { page: 1, perPage: 10 },
      ""
    ).then((res) => {
      setLoading(false);
      setTables(res.data.data);
      setTotal(res.data.total);
    });
  }, []);
  const onUpdate = (record) => {
    setVisible(true);
    console.log(record);
    form.setFieldsValue({
      table_code: record.table_code,
      name: record.name,
      seat_number: record.seat_number,
      status: record.status,
      areas_area_code: record?.detail_area?.area_code,
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
      `${process.env.REACT_APP_URL_API}/api/table`,
      null,
      { page: 1, perPage: 10,name:value.name },
      ""
    ).then((res) => {
      setLoading(false);
      setTables(res.data.data);
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
      dataIndex: "table_code",
      key: "table_code",
    },
    {
      title: "Tên bàn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số chỗ",
      dataIndex: "seat_number",
      key: "seat_number",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
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
            title="Sửa thông tin bàn"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              form: "category-editor-form-update-table",
              key: "submit",
              htmlType: "submit",
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-update-table"
              form={form}
            >
              <Form.Item
                label="Mã"
                name="table_code"
                rules={[{ required: true, message: "Mời nhập mã bàn!" }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Tên bàn"
                name="name"
                rules={[{ required: true, message: "Mời nhập tên bàn!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số chỗ"
                name="seat_number"
                rules={[{ required: true, message: "Mời nhập số chỗ!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[{ required: true, message: "Mời nhập đơn vị tính!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Khu vực"
                name="areas_area_code"
                rules={[{ required: true, message: "Mời chọn khu vực!" }]}
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
                  {areas.map((area, index) => (
                    <Option value={area.area_code} key={index}>
                      {area.name}
                    </Option>
                  ))}
                </Select>
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
      "http://localhost:8080/api/table",
      null,
      { page: parseInt(page.current), perPage: 10 },
      ""
    ).then((res) => {
      setLoading(false);
      setTables(res.data.data);
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
        dataSource={tables}
        pagination={{
          total: total,
          defaultPageSize: 10,
          position: [/*"topRight"*,*/ "bottomRight"],
          current: current,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]} đến ${range[1]} trên tổng số  ${total} bàn`,
        }}
        onChange={onChangeSize}
      />
    </React.Fragment>
  );
};

export default TableList;
