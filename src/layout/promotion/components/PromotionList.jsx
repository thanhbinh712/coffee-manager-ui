import React, { useEffect, useState } from "react";
import callApi from "../../../util/callerApi";
import Swal from "sweetalert2";
import moment from "moment";
import {
  Table,
  message,
  Button,
  Col,
  Input,
  Row,
  Modal,
  Form,
  Tag,
} from "antd";

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  useEffect(() => {
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/promotion`,null, null,"").then(
        (res) => {
      setLoading(false);
      setPromotions(res.data);
    });
  }, []);

  const renderStatus = (status) => {
    if (status === 0) {
      return <Tag color="blue">Chưa bắt đầu</Tag>;
    } 
    else if(status === 1){
      return <Tag color="green">Đang diễn ra</Tag>;
    }
    else if(status === 2){
      return <Tag color="red">Đã kết thúc</Tag>;
    }
  };

  const onUpdate = (record) => {
    setVisible(true);
    console.log(record);
    form.setFieldsValue({
      promotion_code: record.promotion_code,
      name: record.name,
      start_date: record.start_date,
      finish_date: record.finish_date,
      status: record.status,
    });
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  let user=JSON.parse(localStorage.getItem('user'));
  const handleOk = (e) => {
    //    setVisible(false)
  };

  const onFinish = (value) => {
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/promotion`,
      null,
      null,
      ""
    ).then((res) => {
    setPromotions(res.data);
    });
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
      title: "Mã khuyến mãi",
      dataIndex: "promotion_code",
      key: "promotion_code",
    },
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "Ngày bắt đầu",
        dataIndex: "start_date",
        key: "start_date",
        render: (text, record) =>
          record.start_date
            ? moment(record.start_date).format("DD/MM/YYYY")
            : "",
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "finish_date",
        key: "finish_date",
        render: (text, record) =>
          record.finish_date
            ? moment(record.finish_date).format("DD/MM/YYYY")
            : "",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (text, record) => <label>{renderStatus(record?.status)}</label>
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
            title="Sửa khuyến mãi"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              form: "category-editor-form-update-promotion",
              key: "submit",
              htmlType: "submit",
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              //onFinish={onFinish}
              id="category-editor-form-update-promotion"
              form={form}
            >
              <Form.Item
                label="Mã khuyến mãi"
                name="promotion_code"
                rules={[{ required: true, message: "Mời nhập mã khuyến mãi!" }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Tên khuyến mãi"
                name="name"
                rules={[{ required: true, message: "Mời nhập tên khuyến mãi!" }]}
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
           // onFinish={onFinishFilter}
            form={formFilter}
            // dataSource={ingredients}
          >
            <Form.Item
              label="Tìm kiếm"
              name="name"
            >
              <Input placeholder="Nhập tên để tìm!" />
            </Form.Item>
          </Form>
          </Col>
          <Col style={{marginRight:"20px"}}>
          <Button type="primary" onClick={()=>formFilter.submit()}>
            Tìm 
          </Button>
          </Col>
      </Row>
      <Table
        style={{ marginLeft:20, marginRight:20 }}
        bordered
        columns={columns}
        loading={loading}
        dataSource={promotions}
      />
    </React.Fragment>
  );
};

export default PromotionList;
