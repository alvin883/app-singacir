import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import {
  Login,
  DaftarLanding,
  DaftarUser,
  DaftarMitra,
  LupaPasswordReset,
  LupaPasswordLanding,
} from "_views"

const Stack = createStackNavigator()

const AuthStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen name="Login" component={Login} options={{ title: "Masuk" }} />

    <Stack.Screen
      name="DaftarLanding"
      component={DaftarLanding}
      options={{ title: "Daftar" }}
    />

    <Stack.Screen
      name="DaftarUser"
      component={DaftarUser}
      options={{ title: "Pendaftaran User" }}
    />

    <Stack.Screen
      name="DaftarMitra"
      component={DaftarMitra}
      options={{ title: "Pendaftaran Mitra" }}
    />

    <Stack.Screen
      name="LupaPasswordLanding"
      component={LupaPasswordLanding}
      options={{ title: "Lupa Kata Sandi" }}
    />

    <Stack.Screen
      name="LupaPasswordReset"
      component={LupaPasswordReset}
      options={{ title: "Lupa Kata Sandi" }}
    />
  </Stack.Navigator>
)

export default AuthStack
