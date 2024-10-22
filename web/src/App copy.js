import React, { Component } from 'react';
import './app.scss';
import { Content, Theme } from '@carbon/react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoanList from './pages/LoanList';
import RepoPage from './pages/RepoPage';
import AppHeader from './components/AppHeader/AppHeader';
import LoanDetails from './pages/LoanDetails';
// import ChatApp from './pages/ChatApp/ChatApp';
import ChatHistoryWindowApp from './pages/ChatApp/ChatHistoryWindowApp';

import AssistDetails from './pages/AssistDetails/AssistDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <Main/>

      
    </div>
  );
}

export default App;

class App extends Component {
  componentDidMount() {
    this.showWA();
  }

  showWA() {}
  render() {
    return (
      <BrowserRouter>
        <Theme theme="g100">
          <AppHeader />
        </Theme>
        <Content>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/assist" component={AssistDetails} />
            <Route exact path="/chatApp" component={ChatHistoryWindowApp} />
            <Route exact path="/loan" component={LoanList} />
            <Route exact path="/loanDetail" component={LoanDetails} />
            <Route path="/repos" component={RepoPage} />
          </Switch>
        </Content>
      </BrowserRouter>
    );
  }
}

export default App;
