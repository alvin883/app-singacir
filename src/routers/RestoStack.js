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
import { Colors } from "_styles"

const Stack = createStackNavigator()
const initParams = {
  customBg: Colors.brandResto,
  customColor: Colors.themeLight,
}

const RestoStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="resto/search"
      component={RestoSearch}
      options={{ headerShown: false }}
      initialParams={initParams}
    />

    <Stack.Screen
      name="resto/landing"
      component={RestoLanding}
      options={({ route }) => ({ title: route.params.title })}
      initialParams={initParams}
    />

    <Stack.Screen
      name="resto/detail"
      component={RestoDetail}
      options={({ route }) => ({ title: route.params.title })}
      initialParams={initParams}
    />

    <Stack.Screen
      name="resto/search-menu"
      component={RestoSearchMenu}
      options={{ title: "Search Menu", headerShown: false }}
      initialParams={initParams}
    />

    <Stack.Screen
      name="resto/checkout"
      component={RestoCheckout}
      options={{ title: "Keranjang" }}
      initialParams={initParams}
    />
  </Stack.Navigator>
)

export default RestoStack
