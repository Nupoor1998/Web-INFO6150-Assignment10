import React from "react";
import "../App.css";
import WeatherContainer from "./WeatherContainer";
import Hourly from "./Hourly";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" exact component={WeatherContainer} />
              <Route path="/forecast/:day" component={Hourly} />
            </Switch>
          </div>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
