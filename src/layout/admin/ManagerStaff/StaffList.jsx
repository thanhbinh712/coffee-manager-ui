import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import callApi from "./../../../util/callerApi";
import {
  Button,
  message, 
  Table, 
  Row, 
  Col, 
  Input, 
  Tag,
  Modal,
  Form,
  Select,
} from "antd";
import moment from "moment";
import Swal from "sweetalert2";
import {
  EditOutlined,
  DeleteOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
const { Option } = Select;

const StaffList = (props) => {
  const [users,setUsers]=useState([]);
  const [roles, setRoles] = useState([]);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [initFilter,setInitFilter] = useState({page:1,perPage:10});
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  let user=JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (props.dataCreate) {
      let temp = users?users:[];
      temp.push(props.dataCreate);
      setUsers([...temp]);
    }
  }, [props.dataCreate]);
  useEffect(()=>{
      callApi("get", `${process.env.REACT_APP_URL_API}/api/auth/get_role`, null, null, "").then(
        (res) => {
          setRoles(res.data);
        }
      );
    setLoading(true);
    callApi("get", `${process.env.REACT_APP_URL_API}/api/auth/users`, null, { page: 1, perPage: 10 }, "").then(res=>{
      setLoading(false);
      setUsers(res.data.data);
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

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleOk = (e) => {
    //    setVisible(false)
  };
  
  const renderStatus = (deleted) => {
    if (!deleted) {
      return <Tag color="green">Hoạt động</Tag>;
    } else {
      return <Tag color="red">Đã khóa</Tag>;
    }
  };
  const onUpdate = (record) => {
    setVisible(true);
    console.log(record);
    form.setFieldsValue({
      id: record.id,
      email: record.email,
      password: "",
      name: record.name,
      gender: renderGender(record.gender),
      address: record.address,
      phone: record.phone,
      roles_role_code: record?.detail_role?.role_code,
    });
  };

  const onActive = (record) => {
    let param = {
      id: record.id,
      roles_role_code: record.roles_role_code,
      status_delete: 0,
    };
    console.log(param);
    Swal.fire({
      title: "Bạn có chắc muốn Kích hoạt không?",
      text: "Bạn không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Kích hoạt",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if(result.value){
        callApi(
          "put",
          `${process.env.REACT_APP_URL_API}/api/auth/delete_user`,
          null,param,user.accessToken)
      }
    });
  }

  const onDelete = (record) => {
    let param = {
      id: record.id,
      roles_role_code: record.roles_role_code,
      status_delete: 1,
    };
    console.log(param);
    Swal.fire({
      title: "Bạn có chắc muốn khóa không?",
      text: "Bạn không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Khóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if(result.value){
        callApi(
          "put",
          `${process.env.REACT_APP_URL_API}/api/auth/delete_user`,
          null,param,user.accessToken)
      }
    });
  };

  const onFinishFilter=(value)=>{
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/auth/users`,
      null,
      { page: 1, perPage: 10,name:value.name },
      ""
    ).then((res) => {
      setLoading(false);
      setUsers(res.data.data);
      setTotal(res.data.total);
    });
  }

  const onFinish = (values) => {
    callApi(
      "put",
      `${process.env.REACT_APP_URL_API}/api/auth/users`,
      values,null,user.accessToken).then((res)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        let temp=users;
          let index=temp.findIndex(u=>u.id===res.data.id);
          if(index!==-1){
            temp[index]=res.data;
            setUsers([...temp]);
            setVisible(false)
          }
      });
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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const columns = [
    {
        title: 'ID',
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
      title:"Thao tác",
      key: "action",
      align: "center",
      render: (text, record) => (
        <React.Fragment>
           <Button
            type="primary"
            style={{ marginLeft: 5 }}
            icon={<EditOutlined/>}
            onClick={() => onUpdate(record)}
          >
          </Button>
          {record.deleted ? (
             <Button 
             type="success" 
             icon={<UnlockOutlined />}
             onClick={() => onActive(record)}>
           </Button>
          ) : (
            <Button 
            type="danger" 
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}>
          </Button>
          )}
         
        </React.Fragment>
      ),
      
    },
  ];
  const onChangeSize = (page, pageSize) => {
    setCurrent(parseInt(page.current));
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/auth/users`,
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
     <Row>
      <Col md={18}>
      <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinishFilter}
            form={formFilter}
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
       <Modal
        title="SỬA THÔNG TIN NHÂN VIÊN"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-update-user",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-update-user"
              form={form}
            >
               <Form.Item
                label="ID"
                name="id"
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: "Mời nhập tên!" },
               ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
              >
                <Select>
                  <Option value={false}>Nữ</Option>
                  <Option value={true}>Nam</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: "Mời nhập số điện thoại!" },
                ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Mời nhập địa chỉ!" }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Chức vụ"
                name="roles_role_code"
                rules={[{ required: true, message: "Mời chọn chức vụ!" }]}
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
                  {roles.map((role, index) => (
                    <Option value={role.role_code} key={index}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

            </Form>
      </Modal>
  </React.Fragment>;;
};

StaffList.propTypes = {};

export default StaffList;
