import { combineReducers } from "redux"
import authReducer from "./authReducer"
import restoReducer from "./restoReducer"
import pedagangReducer from "./pedagangReducer"
import warungReducer from "./warungReducer"
// import komunitasReducer from "./komunitasReducer"

const rootReducer = combineReducers({
  authReducer: authReducer,
  restoReducer: restoReducer,
  pedagangReducer: pedagangReducer,
  warungReducer: warungReducer,
  // komunitasReducer: komunitasReducer,
})

export default rootReducer
