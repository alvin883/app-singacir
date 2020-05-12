import { auth } from "_actions"

const actionName = auth.actionName

const initState = {
  token: null,
  username: null,
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
      console.log("authReducer: ", newState)

      return newState

    default:
      return state
  }
}

export default authReducer
