import React from "react";
import { Col } from "react-bootstrap";
import { UsergroupDeleteOutlined, SnippetsOutlined } from "@ant-design/icons";
import "../styles.css";

const GeneralInfo = ({ listRoute }) => {
  return (
    <Col span={4} className="general-info">
      <div className="title">
        <SnippetsOutlined className="title__icon" />
        <span className="title__content">Thông tin chung</span>
      </div>
      <div className="general-info__content">
        <div className="content--group">
          <UsergroupDeleteOutlined className="content--group__icon" />{" "}
          <span className="content-group__span">
            Khách hàng <strong>{listRoute.length ?? 0}</strong>
          </span>
        </div>
      </div>
    </Col>
  );
};

export default GeneralInfo;
