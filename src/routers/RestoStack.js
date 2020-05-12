import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import {
  RestoSearch,
  RestoLanding,
  RestoDetail,
  RestoSearchMenu,
  RestoCheckout,
} from "_views"

const Stack = createStackNavigator()

const RestoStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="resto/search"
      component={RestoSearch}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="resto/landing"
      component={RestoLanding}
      options={({ route }) => ({ title: route.params.title })}
    />

    <Stack.Screen
      name="resto/detail"
      component={RestoDetail}
      options={({ route }) => ({ title: route.params.title })}
    />

    <Stack.Screen
      name="resto/search-menu"
      component={RestoSearchMenu}
      options={{ title: "Search Menu", headerShown: false }}
    />

    <Stack.Screen
      name="resto/checkout"
      component={RestoCheckout}
      options={{ title: "Keranjang" }}
    />
  </Stack.Navigator>
)

export default RestoStack
