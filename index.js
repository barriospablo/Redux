const { createStore, combineReducers } = Redux;

// Actions
const BUY_XBOX = "BUY_XBOX";
const RETURN_XBOX = "RETURN_XBOX";
const BUY_SOME = "BUY_SOME";
const RETURN_SOME = "RETURN_SOME";

const buyConsole = (cant) => {
  return {
    type: BUY_XBOX,
    payload: cant,
  };
};
const returnConsole = (cant) => {
  return {
    type: RETURN_XBOX,
    payload: cant,
  };
};

const buySome = (cant) => {
  return {
    type: BUY_SOME,
    payload: cant,
  };
};
const returnSome = (cant) => {
  return {
    type: RETURN_SOME,
    payload: cant,
  };
};

// Reducers

const defaultConsoles = {
  xbox: 30,
};
const consoleReducer = (state = defaultConsoles, action) => {
  switch (action.type) {
    case BUY_XBOX: {
      return {
        ...state,
        xbox: state.xbox - action.payload,
      };
    }
    case RETURN_XBOX: {
      return {
        ...state,
        xbox: state.xbox + action.payload,
      };
    }
    default:
      return state;
  }
};
const inventory = {
  myIntetory: 0,
};
const inventoryReducer = (state = inventory, action) => {
  switch (action.type) {
    case BUY_XBOX: {
      return {
        ...state,
        myIntetory: state.myIntetory + action.payload,
      };
    }
    case RETURN_XBOX: {
      return {
        ...state,
        myIntetory: state.myIntetory - action.payload,
      };
    }
    default:
      return state;
  }
};
const rootReducres = combineReducers({
  consoleReducer,
  inventoryReducer,
});
// Store
const store = Redux.createStore(rootReducres);
const inventoryQuantity = document.getElementById("quantity");
const valueSpam = document.getElementById("value");
function render() {
  valueSpam.innerHTML = store.getState().consoleReducer.xbox.toString();
  inventoryQuantity.innerHTML = store
    .getState()
    .inventoryReducer.myIntetory.toString();
  console.log(store.getState().inventoryReducer.myIntetory.toString());
}
render();
store.subscribe(render);

const condition = document.getElementById("conditional");

document.getElementById("decrement").addEventListener("click", () => {
  store.subscribe(() => {
    if (store.getState().consoleReducer.xbox.toString() == "0") {
      condition.innerHTML = "no puedes comprar mas";
    } else {
      condition.innerHTML = "";
    }
  });
  if (store.getState().consoleReducer.xbox.toString() > "0") {
    store.dispatch(buyConsole(1));
  }
});

document.getElementById("increment").addEventListener("click", () => {
  store.subscribe(() => {
    if (store.getState().consoleReducer.xbox.toString() == "30") {
      condition.innerHTML = "no puedes devolver mas";
    } else {
      condition.innerHTML = "";
    }
  });
  if (store.getState().consoleReducer.xbox.toString() < "30")
    store.dispatch(returnConsole(1));
});
