import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import callApi from "./../../../util/callerApi";
import {Button, Table, Row, Col, Form, Input, Tag} from "antd";
import moment from "moment";
const StaffList = (props) => {
  const [users,setUsers]=useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [initFilter,setInitFilter] = useState({page:1,perPage:10});
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  useEffect(()=>{
    setLoading(true);
    callApi("get", "http://localhost:8080/api/auth/users", null, null, "").then(res=>{
      setLoading(false);
      setUsers(res.data);
      setTotal(res.data.total);
    })
  },[]);
  const renderGender = (gender) => {
    if (gender === 0) {
      return "Nữ";
    } else {
      return "Nam";
    }
  };
  
  const renderStatus = (deleted) => {
    if (!deleted) {
      return <Tag color="green">Hoạt động</Tag>;
    } else {
      return <Tag color="red">Đã khóa</Tag>;
    }
  };
  const onUpdate=(record)=>{
    console.log(record)
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const columns = [
    {
        title: 'Mã nhân viên',
        dataIndex: 'id',
        key: 'id',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
        title: 'Phái',
        render: (text, record) => <label>{renderGender(record?.gender)}</label>
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
        title: 'SĐT',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => renderStatus(record.deleted),
    },

    {
        title: "Ngày tạo",
        key: "createdAt",
        render: (text, record) =>
          record.createdAt
            ? moment(record.createdAt).format("YYYY-MM-DD HH:MM")
            : "",
      },  
    {
      title: 'Thao tác',
      key: 'action',
      render:(text,record)=>(
        <React.Fragment>
            <Button type="primary" onClick={()=>onUpdate(record)}>Xem</Button>
        </React.Fragment>
      ),
      
    },
  ];
  const onChangeSize = (page, pageSize) => {
    setCurrent(parseInt(page.current));
    setLoading(true);
    callApi(
      "get",
      "http://localhost:8080//api/auth/get_user",
      null,
      { page: parseInt(page.current), perPage: 10 },
      ""
    ).then((res) => {
      setLoading(false);
      setUsers(res.data.data);
      setTotal(res.data.total);
      setInitFilter({ page: parseInt(page.current), perPage: 10 })
    });
  };
  return <React.Fragment>
       {/* <Row style={{ marginLeft: "400px" , marginRight: "20px", marginTop: "100px"}}>
        <Col md={12}>
          <label style={{fontWeight: "bold", color: "blue", fontSize: "20px"}}>DANH SÁCH NHÂN VIÊN</label>
        </Col>
        <Col md={12} style={{ textAlign: "right" }}>
          <Button type="primary" >
            Thêm 
          </Button>
        </Col>
      </Row> */}
      <Row style={{ marginLeft: "190px"}}>
        <Col md={12}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // form={formFilter}
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
        dataSource={users}
        pagination={{
          total: total,
          defaultPageSize: 10,
          position: [/*"topRight"*,*/ "bottomRight"],
          current: current,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]} đến ${range[1]} trên tổng số  ${total} nhân viên`,
        }}
        onChange={onChangeSize}
      />
  </React.Fragment>;;
};

StaffList.propTypes = {};

export default StaffList;
