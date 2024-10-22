import React from "react";
import "./questionarie.css";
import Config from "../../config.json";

import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Collapse from "react-bootstrap/Collapse";

import questionaireJsonData from "../data/GRI-Questionaire.json";
import { useState } from 'react'

const EditableTable = () => {

  const [questionaireData, setQuestionaireData] = useState(questionaireJsonData)

  const onChangeInputQuestion = (e, changeIndex) => {
    const { name, value } = e.target

    setQuestionaireData((prevData) => {
      const newData = { ...prevData }
      newData.questions[changeIndex].question = value
      return newData
    })
  }
  const onChangePrompt = (e) => {
    const { name, value } = e.target

    setQuestionaireData((prevData) => {
      const newData = { ...prevData }
      newData.prompt = value
      return newData
    })
  }
  const onClickShowDetails = (e, changeIndex, oldValue) => {
    setQuestionaireData((prevData) => {
      const newData = { ...prevData }
      newData.questions[changeIndex].isVisible = !oldValue
      return newData
    })
  }

  const handleClear = (event) => {
    event.preventDefault();

    setQuestionaireData((prevData) => {
      const newData = { ...prevData }
      for (let question of newData.questions) {
          question.response = "";
          question.scores = {};
          // question.isVisible = false;
          question.discovery_source = "";
          question.discovery_result = "";
          question.llm_input = "";
      }
      return newData
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    setQuestionaireData((prevData) => {
      const newData = { ...prevData }
      newData.loading = true;
      for (let question of newData.questions) {
          question.response = "";
          question.scores = {};
          // question.isVisible = false;
          question.discovery_source = "";
          question.discovery_result = "";
          question.llm_input = "";
      }
      return newData
    })

    const headers = { 
        'Authorization': 'Bearer xxxxx' ,
        'Access-Control-Allow-Origin': '*', 
    };

    var myURL = "http://localhost:3001";
    // var myURL = "http://9.30.215.40:3001";
    
    console.log("myURL -->" + myURL);



    axios.post(myURL + '/api/v1/discovery-query-multiple', questionaireData, { headers })
        .then(response => {
            console.log("Outhput of the API Call ---> " + response.data);
            questionaireData.questions = response.data.result;
            setQuestionaireData((prevData) => {
              const newData = { ...prevData }
              newData.questions = questionaireData.questions
              newData.loading = false;
              return newData
            })
        })
        .catch(error => {
            console.log(error);
            setQuestionaireData((prevData) => {
              const newData = { ...prevData }
              for (let question of newData.questions) {
                question.response = error;
                question.scores = {};
                newData.loading = false;
              }
              return newData
            })
        })
  }

  return (

<div className="full-page-style">
  <p></p>
    <div className="section-heading1">{questionaireJsonData.module_title}</div>
    <div className="section-heading2">{questionaireJsonData.module_subtitle}</div>
</div>

  );
}
export default EditableTable;
