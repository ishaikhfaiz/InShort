import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import LoadingBar from 'react-top-loading-bar'
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  state= {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>

        <LoadingBar
          height={3}
          color='red'
          progress={this.state.progress}
        />
        <Router>
          <NavBar />

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={8} country="in" category="General" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={8} country="in" category="Business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={8} country="in" category="Entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={8} country="in" category="Health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={8} country="in" category="Science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={8} country="in" category="Sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={8} country="in" category="Technology" />} />
          </Routes>
        </Router>

      </div>
    )
  }
}
