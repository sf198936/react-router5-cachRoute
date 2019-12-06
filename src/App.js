import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Quiz from './components/quiz';
import Item from './components/item';
import Results from './components/results';
import questions from './data/questions.json'
import './App.css';
import {
    Provider,
    KeepAlive,
} from 'react-keep-alive';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

class App extends Component {
  state = {
    questions: []
  }

  componentDidMount () {
    //imitating fetch here
    this.setState({
      questions: [...questions]
    })
  }

  onFinishQuiz = (result) => {
    this.setState({
      result: result
    })
  }
  to=()=>{
      console.log(this.props)
  }

  render() {
      console.log(<Router/>)
    return (



      <Router>


                  <div className="App clear">
                      <div className="left">
                          <Link to="quiz/1" >1</Link>
                          <br/>
                          <Link to="/results" >results</Link>
                          <br/>
                          <Link to="/" >HOME</Link>
                          <br/>
                      </div>


                      <div className="right ">
                              <CacheSwitch>



                              <Route exact path='/' render={ ({match}) =>
                                  <div>

                                          <Link to="quiz/1" >Start quiz</Link>

                                  </div>}


                              />

                              <CacheRoute exact path='/results' render={ ({match}) =>


                                      <Results
                                          correctAnswers={this.state.result}
                                          total={this.state.questions.length}
                                      />
                                    }
                              />
                              <Route path='/:id' render={ ({match}) =>
                                  <Item
                                      key={match.url}
                                  />}
                              />

                              <Route path='/quiz/:id?' render={ ({match}) =>
                                  <Quiz
                                      key={match.url}
                                      questions={this.state.questions}
                                      onFinishQuiz={this.onFinishQuiz}
                                  />}
                              />

                          </CacheSwitch>
                      </div>


                  </div>






      </Router>


    );
  }
}

export default App;
