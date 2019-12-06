import React, { Component } from 'react';
import QuizPrint from './quizprint';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';

class Quiz extends Component {

    constructor(props) {
        super(props)
        this.state = {
            answers: [],
            result: 0,
            currentQuestion: 0,
            questionAnswered: false,
            quizIsOver: false
        }
    }


  checkAnswers = (correctAnswers, userAnswers) => {
    if (typeof correctAnswers === "string") {
      return (
        userAnswers.length === 1 &&
        userAnswers[0] === correctAnswers) ?
          true :
          false;
    }

    if (Array.isArray(correctAnswers)) {
      let correctAnswersForComparison = [...correctAnswers];
      let userAnswersForComparison = [...userAnswers];
      correctAnswersForComparison.sort();
      userAnswersForComparison.sort();
      return (
        correctAnswersForComparison.length===userAnswersForComparison.length &&
        correctAnswersForComparison.every((elem, i) => {
          return elem === userAnswersForComparison[i]
        })
      )
    }
  }

  onSubmit = () => {
    let {questions} = this.props;
    let {answers, result, currentQuestion} = this.state;
    let newResult = result;

    newResult += this.checkAnswers(questions[currentQuestion].correct, answers) ? 1 : 0;

    this.setState({
      questionAnswered: true,
      result: newResult
    })
  }

  onNext = () => {
    this.setState({
      answers: [],
      currentQuestion: this.state.currentQuestion+1,
      questionAnswered: false
    })
  }

  onFinish = () => {
    this.setState({
      quizIsOver: true
    })

    this.props.onFinishQuiz(this.state.result);
    this.props.history.push("./results")
  }

  onCheckboxClick = ( option ) => {
    let {answers} = this.state;
    let newAnswers;

    if (answers.indexOf( option ) === -1) {
      newAnswers = [...answers, option];
    } else {
      newAnswers = [...this.state.answers];
      newAnswers.splice(newAnswers.indexOf( option ), 1);
    }
    this.setState({
      answers: [...newAnswers]
    })
  }

  render() {
    let {questions} = this.props;
    let {currentQuestion, questionAnswered, answers} = this.state;


    let print = (questions.length !== 0) ?
      <QuizPrint
        key = {questions[currentQuestion].id}
        question={questions[currentQuestion]}
        total={questions.length}
        onCheckboxClick = {this.onCheckboxClick} /> :
      null;

      let hint = (questionAnswered === true) ?
        <div>
          {`The answer was
          ${this.checkAnswers(questions[currentQuestion].correct, answers) ?
            'correct!' :
            'incorrect!'}`
          }
        </div> :
        null

      let button = !(questionAnswered) ?
        <button
          type="button"
          onClick={this.onSubmit}>
            Submit
        </button> :

          (currentQuestion !== questions.length-1) ?
            <button
              type="button"
              onClick={this.onNext}>
                Next
            </button> :

            <button
              type="button"
              onClick={this.onFinish}>
                Finish
            </button>

    return(
      <div>
        {print}
        {hint}
        {button}
      </div>
    )
  }
}

export default withRouter(Quiz);
