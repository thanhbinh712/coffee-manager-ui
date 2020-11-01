import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import callApi from "./../../util/callerApi";
import {Button, Table} from "antd"
const Screen1 = (props) => {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    callApi("get", "http://localhost:8080/api/auth/users", null, null, "").then(res=>{
      setUsers(res.data)
    })
  },[]);
  const onUpdate=(record)=>{
    console.log(record)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'gender',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render:(text,record)=><Button type="primary" onClick={()=>onUpdate(record)}>Xem</Button>
    },
  ];
  return <React.Fragment><Table dataSource={users} columns={columns} />
  </React.Fragment>;;
};

Screen1.propTypes = {};

export default Screen1;
