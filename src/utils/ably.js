import * as Ably from "ably";
// import Emitter from "es6-event-emitter";
import store from "./store";
import CONST from "./consts";

class Realtime {
  constructor() {
    const ably = new Ably.Realtime("Mudfsw.2PtFoA:Z7ADxjWk_TnM-quN");
    this.mainChannel = ably.channels.get("mysterycity");

    this.mainChannel.subscribe("general", msg => {
      switch(msg.data.code) {
        case "NEW_QUESTION":
          store.updateGlobalState({
            screen: CONST.STATE.QUESTION,
            questionData: msg.data
          });
          break;
        default:
          console.error("data code not found", msg);
      }
    });
  }

  sendAnswer(answer) {
    this.mainChannel.publish("general", {code: "ANSWER", id: answer.id, value: answer.value});
  }

}

let instance = new Realtime();
export default instance;