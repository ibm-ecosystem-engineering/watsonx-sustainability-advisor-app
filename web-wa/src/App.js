import logo from './logo.svg';
import './App.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Header from "./components/header/header";
import Main from "./components/main/main";
import WA from "./components/watsonassistant/watsonassistant";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Main/>
      <WA/>
    </div>
  );
}

export default App;
