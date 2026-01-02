import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import Ticker from './components/Ticker';
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';



export default class App extends Component {
  state = {
    progress: 0,
    mode: 'light',
    isListening: false
  }

  componentDidMount() {
    document.body.setAttribute('data-theme', 'light');
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  toggleMode = () => {
    const newMode = this.state.mode === 'light' ? 'dark' : 'light';
    this.setState({ mode: newMode });
    document.body.setAttribute('data-theme', newMode);
  }

  toggleVoice = () => {
    this.setState({ isListening: !this.state.isListening });
    if (!this.state.isListening) {
      alert("Voice Command Activated! (Simulation: Say 'Sports' to navigate)");
    }
  }

  headlines = [
    { title: "Bitcoin hits new all-time high!" },
    { title: "SpaceX successfully lands Starship." },
    { title: "AI revolutionizes coding assistants." },
    { title: "Global weather patterns shifting rapidly." }
  ];

  render() {
    return (
      <Router>
        <NavBar
          mode={this.state.mode}
          toggleMode={this.toggleMode}
          isListening={this.state.isListening}
          toggleVoice={this.toggleVoice}
        />
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
        />
        <Ticker headlines={this.headlines} />

        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" category="general" />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" category="health" />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" category="technology" />} />
    
          <Route exact path="/saved" element={<News setProgress={this.setProgress} key="saved" savedMode={true} />} />
        </Routes>
      </Router>
    )
  }
}
