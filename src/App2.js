import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch,withRouter, Link} from 'react-router-dom';
import Quiz from './components/quiz';
import Results from './components/results';
import questions from './data/questions.json'
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: []
        }
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
    return (
      <Router>

              <div className="App">
                  <b to="quiz/1" onClick={()=>{this.to()}}>Start quiz</b>
                  <Switch>



                      <Route exact path='/quiz/results' render={ () =>
                          <Results
                              correctAnswers={this.state.result}
                              total={this.state.questions.length}
                          />}
                      />

                      <Route path='/quiz/:id?' render={ ({match}) =>
                          <Quiz
                              key={match.url}
                              questions={this.state.questions}
                              onFinishQuiz={this.onFinishQuiz}
                          />}
                      />

                  </Switch>
              </div>

          

      </Router>
    );
  }
}

export default App ;
