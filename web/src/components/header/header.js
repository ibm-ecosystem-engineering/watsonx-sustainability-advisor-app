import React from "react";
import "./header.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import questionaireJsonData from "../data/GRI-Questionaire.json";

export default function Header(props) {
  return (
    <div className="header" >
        <Container fluid>
        <Row >
          <Col xs={10} >
            <span className="myheading1">{questionaireJsonData.project_title1}</span>
            <span className="myheading2">{questionaireJsonData.project_title2}</span>
            <span className="myheading1">{questionaireJsonData.project_title3}</span>
            <div className="mysubheading">{questionaireJsonData.project_subtitle}</div>
          </Col>
          <Col>
            <div className="logo-image">
              <Image  src={questionaireJsonData.imagename} alt="WatsonX"/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
