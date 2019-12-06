import React, { Component } from 'react';
import {BrowserRouter as Router, Link, withRouter} from 'react-router-dom';
import {
    Provider,
    KeepAlive,
} from 'react-keep-alive';

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[
                11111,
                222222,
                333333,
                44444,
                5555,
                6666,
                777,
                888,
                999,
                1010,
                111112,
                1212,
                1313,
                1414,
                1515,
                1616,
                1717,
                1818,
            ]

        }
    }
  render() {
      console.log(this.props)


    return (

      <div className="ullist">

        <h4>{this.props&&this.props.match.params.id}</h4>
        <div>
          detail
            <input type="checkbox"/>
            <input type="text"/>
            <input type="radio"/>
        </div>



        <b onClick={()=>{
            console.log(this.props)
            this.props.history.push("/results")

        }}>Back to results</b>
      </div>


    )
  }
}

export default withRouter(Item);
