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

const Root = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isLoading: true,
    isLogin: false,
  })

  const checkLogin = () => {
    AsyncStorage.getItem("user")
      .then(userRaw => {
        if (userRaw) {
          // When user have logged in
          const user = JSON.parse(userRaw)

          // Store user data
          setState({ isLogin: true, isLoading: false })
          dispatch(auth.login(user))
        } else {
          // When user is not login
          return setState({ isLogin: false, isLoading: false })
        }
      })

      // When AsyncStorage trigger an error
      .catch(err => setState({ isLogin: false, isLoading: false }))
  }

  const handleStoreChange = () => {
    const prevState = state
    const user = store.getState().authReducer
    const isLogin = user.token ? true : false
    const shouldUpdate = isLogin !== prevState.isLogin

    if (shouldUpdate) setState({ isLogin: isLogin, isLoading: false })
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

  return state.isLogin ? <AppStack /> : <AuthStack />
}

export default Root
