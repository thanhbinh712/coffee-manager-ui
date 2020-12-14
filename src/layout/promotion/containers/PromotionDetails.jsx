import React from "react";
import { Tabs, Col, Row, Button } from 'antd';
import Promotions from "./Promotions";
const { TabPane } = Tabs;


const PromotionDetails = () => {
  const callback = (key) =>{
    console.log(key);
  }

  return (
    <React.Fragment>
        <Promotions/>
    </React.Fragment>
  );
};

export default PromotionDetails;
