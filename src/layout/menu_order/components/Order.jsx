import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Layout, Row, Table, Tabs, Tag } from "antd";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useLocation } from "react-router-dom";
import callApi from "../../../util/callerApi";
import { getOrder } from "./../../../actions/api-client";
import {createOrder} from "./../../../actions/api-client"
const { TabPane } = Tabs;
const { Meta } = Card;
const { Header } = Layout;

const Order = () => {
  const location = useLocation();
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [tables, setTables] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [tableOrderName, setTableOrderName] = useState(null);
  const [tableOrderCode, setTableOrderCode] = useState(null);
  const [color,setColor]=useState("all");
   useEffect(() => {
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/area`,
      null,
      null,
      ""
    ).then((res) => {
      setAreas(res.data);
    });
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/area/table`,
      null,
      { page: 1, perPage: 16 },
      ""
    ).then((res) => {
      setLoading(false);
      setTables(res.data);
      //setTotal(res.data.total);
    });
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/type`,
      null,
      null,
      ""
    ).then((res) => {
      setTypes(res.data.data);
    });
    setLoading(true);
    callApi(
      "get",
      `${process.env.REACT_APP_URL_API}/api/product`,
      null,
      { page: 1, perPage: 16 },
      ""
    ).then((res) => {
      setLoading(false);
      setProducts(res.data.data);
      setTotal(res.data.total);
    });
  }, []);

  const callback = (key) => {
    console.log(key);
  };
  const formatListProduct=(data)=>{
    let temp=[];
    for (const iterator of data) {
      temp.push({
        number:iterator.number,
        products_product_code: iterator.product_code
      })
    }
    return temp
  }
  const onAddOrder = () => {
    let tables_table_code = tableOrderCode;
    Swal.fire({
      title: "Xác nhận gọi món",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Huỷ bỏ",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return  createOrder({tables_table_code,listProducts:formatListProduct(productList)})
          .then((response) => {
            return response;
          })
          .catch((error) => {
            Swal.fire("Thêm thất bại", "", "error");
            return error;
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (
        result &&
        result.value &&
        result.value.status &&
        parseInt(result.value.status) === 200
      ) {
        Swal.fire("Thêm thành công", "", "success").then(() => {
          setProductList([]);
          setTableOrderName(null)
        });
      }
    });
  };

  const onAddProductOrder = (value) => {
    let temp= productList;
    let index=temp.findIndex(t=>t.product_code===value.product_code);
    if(index!==-1){
      temp[index].number+=1
    }
    else{
      temp.push({
        ...value,
        number: 1
      });
    }
    setProductList([...temp]);
    console.log(temp);
  };

  const onAddTableOrder = (value) => {
      setTableOrderCode(value.table_code);
      setTableOrderName(value.name);
      // let filter = value.table_code;
      // callApi(
      //   "get",
      //   `${process.env.REACT_APP_URL_API}/api/get_order`,
      //   null,
      //   {filter},
      //   ""
      // ).then((res) => {
      //   setLoading(false);
      //   setProductList(res.data);
      // });
  };

  const callbackArea = (key) => {
    let filter={
      areas_area_code:key.area_code
    }
    if(key==="all"){
      callApi(
        "get",
        `${process.env.REACT_APP_URL_API}/api/area/table`,
        null,
        null,
        ""
      ).then((res) => {
        setLoading(false);
        setTables(res.data);
        setColor("all")
      });
    }
    else {
      callApi(
        "get",
        `${process.env.REACT_APP_URL_API}/api/area/table`,
        null,
        filter,
        ""
      ).then((res) => {
        setLoading(false);
        setTables(res.data);
        setColor(key.area_code)
      });
    }
    
  };

  const callbackType = (key) => {
    let filter={
      types_type_code:key.type_code,
    }
    if(key==="all"){
      callApi(
        "get",
        `${process.env.REACT_APP_URL_API}/api/type/product`,
        null,
        null,
        ""
      ).then((res) => {
        setLoading(false);
        setProducts(res.data);
        setColor("all")
      });
    }
    else {
      callApi(
        "get",
        `${process.env.REACT_APP_URL_API}/api/type/product`,
        null,
        filter,
        ""
      ).then((res) => {
        setLoading(false);
        setProducts(res.data);
        setColor(key.type_code)
      });
    }
  };

  const columns = [
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SL",
      
      key: "number",
      render: (text,record) =>record&& record.number?record.number:0
    },
    {
        title: "Giá",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Thành tiền",
        dataIndex: "total",
        key: "total",
        render: (text, record) => (
            <NumberFormat value={record.total} displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
          ),
      },
    {
      key: "action",
      align: "center",
      render: (text, record) => (
        <React.Fragment>

        </React.Fragment>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div
        style={{
          height: "70px",
          backgroundColor: "#001529",
        }}
      >
        <div>
        <a
          href="/"
          style={{
            marginLeft: "10px",
            marginTop: "30px",
            textDecoration: "none",
            color: "white",
          }}
        >
          {" "}
          <LeftOutlined /> Back{" "}
        </a>
        </div>
      </div>
      <Row style={{ marginTop: "10px" }}>
        <Col md={12}>
          <Tabs onChange={callback} type="card" style={{ marginLeft: "20px" }}>
            <TabPane tab="Chọn bàn" key="1">
              <Row style={{ marginLeft: "10px" }}>
                <Tag style={{ marginBottom: "10px" }} color={color==="all"&&"red"}  onClick={() => callbackArea("all")}>Tất cả</Tag>
                {areas.map((a, index) => (
                  <Tag style={{ marginBottom: "10px" }} color={color===a.area_code&&"red"} onClick={() => callbackArea(a)}>{a.name}</Tag>
                ))}
              </Row>
              <Row style={{ marginLeft: "10px" }}>
                {tables.map((tb, index) => (
                  <Card
                    hoverable
                    style={{ width: 140, marginRight: 10, marginBottom: 10 }}
                    onClick = {() => onAddTableOrder(tb)}
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "60px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100px",
                      }}
                    >
                      {tb.name}
                    </div>
                    <Meta title={tb.status} />
                  </Card>
                ))}
              </Row>
            </TabPane>
            <TabPane tab="Thực đơn" key="2">
              <Row style={{ marginLeft: "10px" }}>
                <Tag style={{ marginBottom: "10px" }} color={color==="all"&&"red"}  onClick={() => callbackType("all")}>Tất cả</Tag>
                {types.map((t, index) => (
                  <Tag style={{ marginBottom: "10px" }} color={color===t.type_code&&"red"} onClick={() => callbackType(t)}>{t.name}</Tag>
                ))}
                <Row style={{ marginLeft: "10px" }}>
                  {products.map((p, index) => (
                    <Card
                      hoverable
                      style={{ width: 140, marginRight: 10, marginBottom: 10  }}
                      onClick = {() => onAddProductOrder(p)}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          backgroundImage: `url(${process.env.REACT_APP_URL_API}/image/${p.image})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100px",
                        }}
                      ></div>
                      <Meta title={p.name} />
                      <NumberFormat
                        value={p.price}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </Card>
                  ))}
                </Row>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
        <Col md={12}>
          <Tabs
            //onChange={callback}
            type="card"
            style={{ marginLeft: "20px", color: "black" }}
          >
            <TabPane tab="Gọi món" key={1}>
              <Col>
              <div style={{
                border: "1px solid gray",
                marginRight:"20px"
              }}>
              <div
                style={{
                  backgroundColor: "#81BEF7",
                  textAlign: "center",
                }}
              > 
                <label style={{
                  marginTop:"20px", 
                  color:"white",
                  fontWeight: "bold",
                }}>
                  BINH'S COFFEE  
                </label>
                <div style={{textAlign: "left"}}>
                <label style={{
                  marginTop:"10px",
                  marginBottom:"10px", 
                  color:"white",
                  marginLeft: "20px",
                }}>
                  BÀN:    {tableOrderName}
                </label>
                </div>
              </div>
              <Table 
                columns = {columns}
                dataSource = {productList}
              >

              </Table>
              <div style={{
                  height: "50px",
                  textAlign: "left",
                  fontWeight: "bold",
                  marginLeft: "20px"
                }}>
                  Tổng tiền: 
              </div>
              <div style={{marginBottom: "20px"}}>
              <Button style={{ marginLeft: 20, 
                    borderRadius:"5px",
                    fontWeight: "bold",
                    backgroundColor: "gray",
                    color:"white"
                    }}>
                      In
                </Button>
                <Button style={{ marginLeft: 20, 
                    borderRadius:"5px",
                    backgroundColor: "green",
                    fontWeight: "bold",
                    width: 100,
                    color:"white"
                    }}>
                      Thanh toán
                </Button>
                <Button style={{ marginLeft: 20, 
                    borderRadius:"5px",
                    backgroundColor: "orange",
                    color:"white",
                    fontWeight: "bold",
                    }}
                    onClick={onAddOrder}
                    >
                     Thông báo
                </Button>
                <Button style={{ marginLeft: 20, 
                    borderRadius:"5px",
                    backgroundColor: "#81BEF7",
                    color:"white",
                    fontWeight: "bold",
                    }}>
                     Chuyển bàn
                </Button>
                </div>
              </div>
              </Col>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Order;
