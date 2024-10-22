import logo from './logo.svg';
import './App.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";


import { Route, Switch, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
// import ChatApp from './pages/ChatApp/ChatApp';


// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Main/>
//     </div>
//   );
// }

// export default App;

class App extends Component {
  componentDidMount() {
    this.showWA();
  }

  showWA() {}
  render() {
    return (
      <BrowserRouter>
        <Theme theme="g100">
          <Header />
        </Theme>
        <Content>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/main" component={Main} />
          </Switch>
        </Content>
      </BrowserRouter>
    );
  }
}

export default App;