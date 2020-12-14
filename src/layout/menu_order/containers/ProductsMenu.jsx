import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tag } from "antd";
import callApi from "../../../util/callerApi";
import NumberFormat from "react-number-format";
import "./order.scss";

const { Meta } = Card;

const ProductsMenu = () => {
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleProductClick = (values) => {
    console.log(values);
    setOrders(values);
  };

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

  return (
    <React.Fragment>
          <Row className="now-list-restaurant" gutter={[16, 16]}>
            {products.map((p, index) => (
              <Col key={index} xs={12} md={6}>
                <div
                  hoverable
                  onClick={() => handleProductClick(p)}
                  className="container box"
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100px",
                      border: "1px solid #001529",
                      backgroundImage: `url(${process.env.REACT_APP_URL_API}/image/${p.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "1px solid #001529",
                      backgroundColor: "#001529",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <NumberFormat
                      value={p.price}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p>{p.name}</p>
                  </div>
                </div>
              </Col>
            ))}
      </Row>
    </React.Fragment>
  );
};

export default ProductsMenu;
