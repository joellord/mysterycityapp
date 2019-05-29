import EventEmitter from "es6-event-emitter";
import CONST from "./consts";

let initialState = {
  screen: CONST.STATE.WAITING
};

class Store extends EventEmitter {
  state;

  constructor(initialState) {
    super();
    this.state = initialState;
  }

  getGlobalState() {
    return this.state;
  }

  updateGlobalState(newState) {
    this.state = Object.assign({}, this.state, newState);
    this.trigger("stateChanged");
  }

  subscribe(cb) {
    this.on("stateChanged", cb);
  }

  unsubscribe(cb) {
    this.off("stateChanged", cb);
  }
}

let store = new Store(initialState);

export default store;