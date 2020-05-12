import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import { Warung } from "_views"

const Stack = createStackNavigator()

const WarungStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="warung/search"
      component={Warung.Search}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="warung/landing"
      component={Warung.Landing}
      options={({ route }) => ({ title: route.params.title })}
    />

    <Stack.Screen
      name="warung/detail"
      component={Warung.Detail}
      options={({ route }) => ({ title: route.params.title })}
    />

    <Stack.Screen
      name="warung/search-menu"
      component={Warung.SearchMenu}
      options={{ title: "Search Menu", headerShown: false }}
    />

    <Stack.Screen
      name="warung/checkout"
      component={Warung.Checkout}
      options={{ title: "Keranjang" }}
    />
  </Stack.Navigator>
)

export default WarungStack
