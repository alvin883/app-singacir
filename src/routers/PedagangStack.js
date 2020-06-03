import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import { Pedagang } from "_views"
import { Colors } from "_styles"

const Stack = createStackNavigator()
const initParams = {
  customBg: Colors.brandPedagang,
  customColor: Colors.themeLight,
}

const PedagangStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="pedagang/search"
      component={Pedagang.Search}
      options={{ headerShown: false }}
      initialParams={initParams}
    />

    <Stack.Screen
      name="pedagang/landing"
      component={Pedagang.Landing}
      options={({ route }) => ({ title: route.params.title })}
      initialParams={initParams}
    />

    <Stack.Screen
      name="pedagang/detail"
      component={Pedagang.Detail}
      options={({ route }) => ({ title: route.params.title })}
      initialParams={initParams}
    />

    <Stack.Screen
      name="pedagang/search-menu"
      component={Pedagang.SearchMenu}
      options={{ title: "Search Menu", headerShown: false }}
      initialParams={initParams}
    />

    <Stack.Screen
      name="pedagang/checkout"
      component={Pedagang.Checkout}
      options={{ title: "Keranjang" }}
      initialParams={initParams}
    />
  </Stack.Navigator>
)

export default PedagangStack
