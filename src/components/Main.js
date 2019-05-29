import React, { Component } from "react";
import store from "../utils/store";

import Waiting from "./Waiting";
import Question from "./Question";

import CONST from "../utils/consts";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.TIME_TO_ANSWER = CONST.TIME_TO_ANSWER;

    this.state = store.getGlobalState();

    this.updateState = this.updateState.bind(this);
  }
  componentWillMount() {
    store.subscribe(this.updateState);
  }
  componentWillUnmount() {
    store.unsubscribe(this.updateState);
  }
  updateState() {
    this.setState(store.getGlobalState());
  }
  render() {
    return (
      <div>
        {this.state.screen === CONST.STATE.WAITING &&
        <Waiting />
        }
        {this.state.screen === CONST.STATE.QUESTION &&
        <Question />
        }
      </div>
    )
  }
}