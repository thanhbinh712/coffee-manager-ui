import {Button, Col, Input, Row, Modal, Form, Select } from "antd";
import React, {useState, useEffect } from "react";
import callApi from "../../../util/callerApi";
import StaffList from "../ManagerStaff/StaffList";
import Swal from "sweetalert2";

const { Option } = Select;

const Staffs = () => {
  const [visible, setVisible] = useState(false);
  const [newData, setNewData] = useState(null);
  const [roles, setRoles] = useState([]);
  const handleOk = (e) => {
    console.log(e);
  };
  
  useEffect(() => {
    callApi("get", `${process.env.REACT_APP_URL_API}/api/auth/get_role`, null, null, "").then(
      (res) => {
        setRoles(res.data);
      }
    );
  }, []);

  let user=JSON.parse(localStorage.getItem('user'));
  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddStaff = () => {
    setVisible(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    callApi(
      "post",
      `${process.env.REACT_APP_URL_API}/api/auth/users`,
      values,null,user.accessToken).then((res)=>{
      setNewData(res.data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        setVisible(false);
      })
    })
    .catch((err) => {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Email đã được sử dụng!',
            showConfirmButton: false,
            timer: 1500
          })
    });
  };
  
  return (
    <React.Fragment>
     <Row style={{ marginRight: "300px", marginTop:"100px", marginLeft:"20px" }}>
        <div style={{textAlign:"center",fontWeight: "bold", fontSize: "30px"}}>
          DANH SÁCH NHÂN VIÊN
        <Button
          type="primary"
          onClick={onAddStaff}
          style={{ marginLeft: "10px" }}
        >
          Thêm nhân viên
        </Button>
        </div>
      </Row>
      <Row style={{ margin: "20px 20px" }}>
        <Col md={24}>
            <StaffList dataCreate={newData}/>
        </Col>
      </Row>
      <Modal
        title="THÊM NHÂN VIÊN"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          form: "category-editor-form-create-user",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              id="category-editor-form-create-user"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Mời nhập email!" },
                { type: "email", message: "Không đúng định dạng" },]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Mời nhập mật khẩu!" }]}
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
                <Select placeholder="Chọn giới tính">
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
    </React.Fragment>
  );
};

export default Staffs;
