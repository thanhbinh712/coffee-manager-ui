import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tag } from "antd";
import callApi from "../../../util/callerApi";
import ProductsMenu from "../containers/ProductsMenu";
import NumberFormat from "react-number-format";
import "./order.scss";

const { Meta } = Card;

const MenuOrder = (props) => {
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newData, setNewData] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

  const onTypeClick = (values) => {
      callApi(
        "get",
        `${process.env.REACT_APP_URL_API}/api/type/product`,
        values.type_code,
        null,
        ""
      ).then((res) => {
        setProducts(res.data.data);
      });
};

  return (
    <React.Fragment>
      <Row style={{ marginTop: "80px", marginLeft: "10px" }}>
        <Col md={12}>
          {types.map((t, index) => (
            <Tag
              style={{ marginBottom: "10px" }}
              onClick={() => onTypeClick(t)}
            >
              {t.name}
            </Tag>
          ))}
          <ProductsMenu/>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MenuOrder;
