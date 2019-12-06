import React, { Component } from 'react';

  class QuizPrint extends Component {
    render() {
      let {question, total} = this.props;
      return (
        <div>
          <div>
            {`Question ${question.id} of ${total}`}
          </div>
          <h4>{question.q}</h4>
          <ul>
            {Object.keys(question.options).map((option) =>
              <li key={option} >
                <input
                  id={option}
                  type = 'checkbox'
                  onClick={(e) => this.props.onCheckboxClick(e.target.id)}/>
                <label htmlFor={option} >
                  {question.options[option]}
                </label>
              </li>
            )}
         </ul>
       </div>
      )
    }
  }

export default QuizPrint;
