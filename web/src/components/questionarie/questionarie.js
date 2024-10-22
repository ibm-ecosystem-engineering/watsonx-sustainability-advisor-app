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
    <Form className="justify-content-center" onSubmit={handleSubmit}>
    <div className="container0">

    <div className="container1">
      <div className="space-column"></div>
      <div className="space-column"></div>

      <div className="main-column">
            <p></p>
            <div class="section-heading1">{questionaireJsonData.module_title}</div>
            <div class="section-heading2">{questionaireJsonData.module_subtitle}</div>
            {questionaireData.loading ? (
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <div>&nbsp;</div>
              )}
      </div>
      <div className="space2-column"></div>
      <div className="button-column"></div>
      <div className="space-column"></div>
    </div>
    <div className="container1">
      <div className="space-column"></div>
      <div className="space-column"></div>
      <div className="main-column">
      <div>
              {questionaireData.questions.map((data, idx) => (
                <Form.Group as={Row}>
                    <div class="card">
                      <div> <span class="card-heading1">{data.id}</span>&nbsp;&nbsp;<span class="card-topic">{data.topic}</span></div>
                      <div><span class="card-subtopic">{data.subtopic}</span></div>
                      <div class="card-subtopic">{data.basequestion} </div>
                      <div class="card-heading2">Question</div>
                      <div class="card-item2">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="question-{idx}"
                          placeholder=""
                          value={data.question}
                          onChange={(e) => onChangeInputQuestion(e, idx)}
                        />
                      </div>
                      <div class="card-heading2">Response</div>
                      <div class="card-item2">
                        <Form.Control
                          as="textarea"
                          rows={6}
                          name="response-{idx}"
                          placeholder=""
                          value={data.response}
                        />
                      </div>
                      <div class="card-item3">
                          {/* <span>Confidence score : {data.scores['rougeLsum']}</span> */}
                      </div>
                      <div class="card-item3">
                            <Button variant="secondary" size="sm" type="button" onClick={(e) => onClickShowDetails(e, idx, data.isVisible)}>
                              Details
                            </Button>
                            <Collapse in={data.isVisible}>
                              <div id="example-collapse-text">
                                <div class="item-heading-discovery-source">Source :</div>
                                <div class="item-data-discovery-source"> {data.discovery_source}</div>
                                <p>&nbsp;</p>
                                <div className="item-heading-discovery-result">Context :</div>
                                <div className="item-data-discovery-result">{data.discovery_result}</div>
                                <p>&nbsp;</p>
                                <div className="item-heading-llm-input"> LLM Input: </div>
                                <div className="item-data-llm-input">{data.llm_input}</div>
                              </div>
                            </Collapse>
                      </div>
                  </div>
                </Form.Group>
              ))}
                <p></p>
                <p></p>

              <Button column sm={2} type="submit" className="btn-success"  disabled={questionaireData.loading} >
                Generate Answers
              </Button>
              <p></p>
              <p></p>
          </div>
      </div>
      <div className="space2-column"></div>
      <div className="button-column">
          <div>
              <div>
                <Row>
                <p></p>
                <p></p>
                  <Col sm={8}>
                        <Button type="submit" className="btn-success buttons" disabled={questionaireData.loading} >
                            &nbsp;&nbsp;Generate&nbsp;Answers
                        </Button>
                  </Col>
                  <p></p>
                </Row>
                <Row>
                  <Col sm={8}>
                        <Button  type="submit"  onClick={handleClear} className="btn-success buttons" >Clear&nbsp;Response</Button>
                  </Col>
                  <p></p>
                </Row>
              </div>
          </div>
          <div class="framework-panel">
              <div class="card-heading2">Frameworks</div>
              <div class="framework-sub-panel">
                <Row>
                  <Col class="framework-check" ><Form.Check disabled defaultChecked={true}  bsPrefix="border-primary"/>
                  </Col>
                  <Col class="framework-check" ><Image height="60px" src="./1-framework-gri.png" alt="WatsonX"/>
                  </Col>
                  <Col></Col>
                </Row>
                {/* <Row>
                  <Col class="framework-check" ><Form.Check />
                  </Col>
                  <Col class="framework-check" ><Image height="60px" src="./2-framework-pcaf.png" alt="WatsonX"/>
                  </Col>
                  <Col></Col>
                </Row> */}
                <Row>
                  <Col class="framework-check " ><Form.Check disabled={true} bsPrefix="border-primary " />
                  </Col>
                  <Col class="framework-check" ><Image height="60px" src="./3-framework-cdp.png" alt="WatsonX"/>
                  </Col>
                  <Col></Col>
                </Row>
                <Row>
                   <Col class="framework-check" ><Form.Check bsPrefix="border-success " disabled={true}  />
                  </Col>
                  <Col class="framework-check" ><Image height="60px" src="./4-framework-sasb.png" alt="WatsonX"/>
                  </Col>
                  <Col></Col>
                </Row>
              </div>
          </div>
      </div>
      <div className="space-column"></div>
    </div>
    </div>
    </Form>
  );
}
export default EditableTable;
