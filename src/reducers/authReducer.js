import { auth } from "_actions"
import axios from "axios"

const actionName = auth.actionName

const initState = {
  userId: null,
  fullname: null,
  email: null,
  iat: null,
  token: null,
}

const authReducer = (state = initState, action) => {
  let newState

  switch (action.type) {
    case actionName.AUTH_LOGIN:
      newState = action.params
      console.log("authReducer: ", newState)

      return newState

    case actionName.AUTH_LOGOUT:
      newState = initState
      delete axios.defaults.headers.common["Authorization"]
      console.log("authReducer: ", newState)

      return newState

    default:
      return state
  }
}

export default authReducer
