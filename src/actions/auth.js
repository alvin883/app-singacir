const actionName = {
  AUTH_LOGIN: "AUTH_LOGIN",
  AUTH_LOGOUT: "AUTH_LOGOUT",
}

const login = params => {
  return {
    type: actionName.AUTH_LOGIN,
    params: params,
  }
}

const logout = params => {
  console.log("authActions - logout")

  return {
    type: actionName.AUTH_LOGOUT,
    params: params,
  }
}

export { actionName, login, logout }
