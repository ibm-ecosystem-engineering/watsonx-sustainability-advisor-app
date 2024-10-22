import React from "react";
import "./main.css";
import "../../App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";


import axios from 'axios';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import QuestionForm from "../questionform/questionform.js";
import EditableTable from "../questionarie/questionarie.js";
import Collapse from "../questionarie/questionarie.js";
import HideShow from '../hideshow/hideshow.js'

export default function Main(props) {

  return (
    <div className="main">
        <EditableTable/>
    </div>
  );
}