import React from "react";

import axios from 'axios';

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class QuestionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '', 
            model: '', 
            prompt: '', 
            result: '', 
            agree: false,
            touched: {
                query: false,
                model: false,
                prompt: false,
                result: false
            }
        };
        this.updateQuery = this.updateQuery.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.updatePrompt = this.updatePrompt.bind(this);

        this.updateResult = this.updateResult.bind(this);
        this.updateAgreement = this.updateAgreement.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state.query = this.default_data.query;
        this.state.model = this.default_data.model;
        this.state.prompt = this.default_data.prompt;

      }
      default_data = {   
        "query": "How much are the Scope 3 Emissions",
        "model": "google/flan-t5-xl",
        "prompt": "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\\\\n {context}\\\\nQuestion: {question}\\\\nHelpful Answer: "  
    };

      handleGenAI() {
        const headers = { 
            'Authorization': 'Bearer xxxx' ,
            'Access-Control-Allow-Origin': '*', 
        };

        const mydata = {   
            "dataset": "retail",
            "query": "",
            "model_id": "{}}",
            "parameters": {
                "decoding_method": "greedy",
                "temperature": 0.5,
                "repetition_penalty": 2,
                "min_new_tokens": 50,
                "max_new_tokens": 200
            },
            "prompt": ""  
        };

        
        mydata.query = this.state.query;
        mydata.model_id = this.state.model;
        mydata.prompt = this.state.prompt;
        console.log("mydata -->" + JSON.stringify(mydata));

        const myURL = process.env.APP_URL
        console.log("myURL -->" + myURL);
        axios.post(myURL + '/api/v1/query', mydata, { headers })
            .then(response => {
                console.log(response.data);
                this.setState({result: response.data.result});
            })
            .catch(error => {
                console.log(error);
                this.setState({result: error});
            })
      }

      handleBlur = (field) => (event) => {
        this.setState ({
          touched: {...this.state.touched, [field]: true}
        })
      }

      validateFields(query, result) {
        const error = {
          query: '',
          result: '',
        }
    
        if (this.state.touched.query && query.length < 2) {
          error.query = "Query should be longer than 2 characters."
        } 
    
        // if (this.state.touched.result && email.split('').filter( x => x === '@').length !== 1) {
        //   error.email = "E-mail address should contain an '@' character."
        // }
    
        return error;
      }

      updateQuery(event) {
        this.setState({
          query: event.target.value
        })
        console.log(this.state.query);
      } 

      updateModel(event) {
        this.setState({
          model: event.target.value
        })
        console.log(this.state.model);
      } 

      updatePrompt(event) {
        this.setState({
          prompt: event.target.value
        })
        console.log(this.state.prompt);
      } 
      
      updateResult(event) {
        this.setState({
          result: event.target.value
        })
        console.log(this.state.result);
      } 

      updateAgreement(event) {
        this.setState({
          agree: event.target.checked
        })
      }

      handleSubmit(event) {
        event.preventDefault();
        event.preventDefault();
        this.setState({result: ""});
        // alert(`Current state is ${JSON.stringify(this.state)}`);
    
        this.handleGenAI ();

        // axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
        // .then(response => {
        //   console.log(response)
        // })
        // .catch(error => {
        //   console.log(error)
        // })
    }
    
    render() {

        const error = this.validateFields(this.state.query, this.state.result);

        return (
            <div>
                <h4>Sustainablity frameworks questionarie !</h4>
                <p>
                    Type your Sustainablity frameworks questionarie here to leverage WatsonX AI to respond from the large volume of previous reports from the Envizi using the Foundational models.
                </p>
                <Form className="justify-content-center" onSubmit={this.handleSubmit} > 
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Model
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                as="textarea"
                                rows={1} 
                                placeholder=""
                                value={this.state.model}
                                onChange={this.updateModel}
                                onBlur={this.handleBlur('model')}
                            />
                            <p>{error.model}</p>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Prompt
                        </Form.Label>
                        <Col sm={8}>
                        <Form.Control 
                            as="textarea"
                            rows={8} 
                            placeholder=""
                            value={this.state.prompt}
                            onChange={this.updatePrompt}
                            onBlur={this.handleBlur('prompt')}
                        />
                        <p>{error.prompt}</p>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Query
                        </Form.Label>
                        <Col sm={8} className="no-margin">
                            <Form.Control
                                as="textarea"
                                rows={3} 
                                placeholder="Query"
                                value={this.state.query}
                                onChange={this.updateQuery}
                                onBlur={this.handleBlur('query')}
                            />
                            <p>{error.query}</p>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Answer
                        </Form.Label>
                        <Col sm={8}>
                        <Form.Control 
                            as="textarea"
                            rows={3} 
                            placeholder="result"
                            value={this.state.result}
                            onChange={this.updateResult}
                            onBlur={this.handleBlur('result')}
                        />
                        <p>{error.result}</p>
                        </Col>
                    </Form.Group>
                    {/* <Form.Group as={Row} controlId="formBasicCheckbox">
                        <Col sm={{ span: 8, offset: 2 }}>
                            <Form.Check
                            type="checkbox"
                            query="agree"
                            checked={this.state.agree}
                            onChange={this.updateAgreement}
                            label="By checking this box, you agree to be contacted by us when we launch the app."
                            />
                        </Col>
                    </Form.Group>  */}
                    <Button
                        column
                        sm={2}
                        type="submit"
                        className="rounded-pill btn-success"
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default QuestionForm;