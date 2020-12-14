import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import callApi from "../../../util/callerApi";
import "./order.scss";

const MenuAreas = () => {
  const [areas, setAreas] = useState([]);
  const [tables, setTables] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
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
      `${process.env.REACT_APP_URL_API}/api/table`,
      null,
      { page: 1, perPage: 16 },
      ""
    ).then((res) => {
      setLoading(false);
      setTables(res.data.data);
      setTotal(res.data.total);
    });
  }, []);

  const renderTableStatus = (status) =>{
    if(status === 0){
      return "Bàn trống";
    }
    if(status === 1){
      return "Đã order";
    }
    if(status === 2){
      return "Pha chế";
    }
  }

  return (
    <div>
      <Row style={{ marginTop: "100px", marginLeft: "10px" }}>
      <Col md={8}>
        <Row gutter={[16, 16]}>
          {areas.map((a, index) => (
            <Col key={index} md={6}>
              <div>
                <a
                  href=""
                  style={{
                    width: "100%",
                    height: "50px",
                    border: "1px solid",
                    borderRadius: "5px",
                    textAlign: "center",
                    color: "black",
                    textDecoration: "none",
                    backgroundColor: "white",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100px",
                  }}
                  
                > <span>{a.name} </span></a>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
    <Row style={{ marginTop: "10px", marginLeft: "10px" }}>
      <Col md={12}>
        <Row gutter={[16, 16]}>
          {tables.map((t, index) => (
            <Col key={index} md={6}>
              <div className="box">
                <div
                  style={{
                    width: "100%",
                    height: "100px",
                    border: "1px solid #001529",
                    textAlign: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100px",
                  }}
                  
                > {t.name} </div>
                <div
                  style={{
                    width: "100%",
                    height: "30px",
                    border: "1px solid #001529",
                    backgroundColor: "#001529",
                    color: "white",
                    textAlign: "center",  
                    }
                  }
                >
                  <p text={() => renderTableStatus(t.status)}/>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
    </div>
  );
};

export default MenuAreas;
