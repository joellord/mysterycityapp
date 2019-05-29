import React, { Component } from "react";
import Realtime from "../utils/ably";
import store from "../utils/store";
import CONST from "../utils/consts";

export default class Question extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, store.getGlobalState().questionData, {timer: CONST.TIME_TO_ANSWER});

    this.handleAnswer = this.handleAnswer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
  }

  componentWillMount() {
    this.decreaseTimer();
  }

  decreaseTimer() {
    if (this.state.timer === 0) {
      store.updateGlobalState({screen: CONST.STATE.WAITING});
    } else {
      this.setState({timer: this.state.timer - 1});
      setTimeout(this.decreaseTimer, 1000);
    }
  }

  handleAnswer(value) {
    console.log(value);
    Realtime.sendAnswer({id: this.props.id, value});
    store.updateGlobalState({screen: CONST.STATE.WAITING});
  }

  render() {
    const buttonStyle = {
      border: "#6c6ca0 solid 1px",
      borderRadius: "8vw",
      height: "15vw",
      width: "90vw",
      background: "#eeeeee",
      fontSize: "5vw",
      marginBottom: "3vw"
    };
    return (
      <div>
        <h2>{this.state.question}</h2>

        <div>Time left: {this.state.timer} seconds</div>

        {this.state.choices.map(a => {
          return (
            <div>
              <button style={buttonStyle} onClick={() => this.handleAnswer(a.value)}>{a.text}</button>
            </div>
          )
        })}
      </div>
    )
  }
}