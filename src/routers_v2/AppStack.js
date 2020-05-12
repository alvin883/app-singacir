import React, { useReducer, useEffect, createContext } from "react"
import { Text } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Login, Dashboard } from "_views"

const Stack = createStackNavigator()
const AuthContext = createContext()

const SplashScreen = () => <Text>Splash Screen</Text>

const Root = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
        case "SIGN_IN":
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            userToken: null,
            isSignout: true,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  )

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken

      try {
        userToken = await AsyncStorage.getItem("userToken")
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken })
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" })
      },

      signOut: () => dispatch({ type: "SIGN_OUT" }),

      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" })
      },
    }),
    [],
  )

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading && (
            <Stack.Screen name="Splash" component={SplashScreen} />
          )}

          {!state.isLoading && state.userToken === null && (
            <Stack.Screen name="login" component={Login} />
          )}

          {!state.isLoading && state.userToken && (
            <Stack.Screen name="Dashboard" component={Dashboard} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Root
