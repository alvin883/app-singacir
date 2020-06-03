import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import StackOptions from "_routers/config/StackOptions"
import { Warung } from "_views"
import { Colors } from "_styles"

const Stack = createStackNavigator()
const initParams = {
  customBg: Colors.brandWarung,
  customColor: Colors.themeLight,
}

const WarungStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="warung/search"
      component={Warung.Search}
      options={{ headerShown: false }}
      initialParams={initParams}
    />

    <Stack.Screen
      name="warung/landing"
      component={Warung.Landing}
      options={({ route }) => ({ title: route.params.title })}
      initialParams={initParams}
    />

    <Stack.Screen
      name="warung/detail"
      component={Warung.Detail}
      options={({ route }) => ({ title: route.params.title })}
      initialParams={initParams}
    />

    <Stack.Screen
      name="warung/search-menu"
      component={Warung.SearchMenu}
      options={{ title: "Search Menu", headerShown: false }}
      initialParams={initParams}
    />

    <Stack.Screen
      name="warung/checkout"
      component={Warung.Checkout}
      options={{ title: "Keranjang" }}
      initialParams={initParams}
    />
  </Stack.Navigator>
)

export default WarungStack
