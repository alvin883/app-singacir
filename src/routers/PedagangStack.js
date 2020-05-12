import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import { Pedagang } from "_views"

const Stack = createStackNavigator()

const PedagangStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="pedagang/search"
      component={Pedagang.Search}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="pedagang/landing"
      component={Pedagang.Landing}
      options={({ route }) => ({ title: route.params.title })}
    />

    <Stack.Screen
      name="pedagang/detail"
      component={Pedagang.Detail}
      options={({ route }) => ({ title: route.params.title })}
    />

    <Stack.Screen
      name="pedagang/search-menu"
      component={Pedagang.SearchMenu}
      options={{ title: "Search Menu", headerShown: false }}
    />

    <Stack.Screen
      name="pedagang/checkout"
      component={Pedagang.Checkout}
      options={{ title: "Keranjang" }}
    />
  </Stack.Navigator>
)

export default PedagangStack
