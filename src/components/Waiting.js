import React, { Component } from "react";

export default class Waiting extends Component {
  render() {
    const titleStyle = {
      position: "absolute",
      left: "50%",
      top: "30%",
      transform: "translate3d(-47%, 0, 0)",
      textAlign: "center",
      width: "100%",
      color: "#000",
      margin: 0
    };
    
    return (
      <div>
        <div style={titleStyle}>Waiting for next question</div>
        <div className="loader"/>
      </div>
    )
  }
}