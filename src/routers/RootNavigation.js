import React, { useState, useEffect } from "react"
import "react-native-gesture-handler"
import AppStack from "./AppStack"
import AuthStack from "./AuthStack"
import { Splash, Loading } from "_views"
import SplashScreen from "react-native-splash-screen"
import AsyncStorage from "@react-native-community/async-storage"
import { auth } from "_actions"
import store from "../store"
import { useDispatch } from "react-redux"
import JwtDecode from "jwt-decode"
import axios from "axios"

const Root = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isLoading: true,
    isLogin: false,
  })

  const checkLogin = () => {
    AsyncStorage.getItem("token")
      .then(token => {
        if (token) {
          const data = JwtDecode(token)

          data.token = token
          axios.defaults.headers.common = { Authorization: `Bearer ${token}` }

          setState({ isLogin: true, isLoading: false })
          dispatch(auth.login(data))
        } else {
          // When user is not login
          console.log("checkLogin: not logged-in")
          return setState({ isLogin: false, isLoading: false })
        }
      })

      // When AsyncStorage trigger an error
      .catch(err => {
        console.log("RootNavigation.js - checkLogin: error", err)
        setState({ isLogin: false, isLoading: false })
      })
  }

  const handleStoreChange = () => {
    const prevState = state
    const user = store.getState().authReducer
    const isLogin = user.userId !== null ? true : false
    const shouldUpdate = isLogin !== prevState.isLogin

    if (shouldUpdate) setState({ isLogin: isLogin, isLoading: false })

    console.log("handleStoreChange:", user)
  }

  const unsubscribe = store.subscribe(handleStoreChange)

  // Equal to componentDidMount
  useEffect(() => {
    SplashScreen.hide()
    checkLogin()
  }, [])

  // Equal to componentDidUpdate
  useEffect(() => {
    // unsubscribe when componentUnmout
    return () => unsubscribe()
  })

  if (state.isLoading) return <Loading />

  console.log(state)
  return state.isLogin ? <AppStack /> : <AuthStack />
}

export default Root
