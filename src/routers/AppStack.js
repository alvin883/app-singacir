import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Login, Dashboard, Tracking, Success } from "_views"
import StackOptions from "_routers/config/StackOptions"
import RestoStack from "./RestoStack"
import AppTabs from "./AppTabs"
import KomunitasStack from "./Komunitas"
import WarungStack from "./WarungStack"
import PedagangStack from "./PedagangStack"
import MakComblangStack from "./MakComblangStack"
import { Colors } from "_styles"

const Stack = createStackNavigator()

const AppStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="app-tab"
      component={AppTabs}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="resto"
      component={RestoStack}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="warung"
      component={WarungStack}
      options={{ headerShown: false }}
      initialParams={{
        customBg: Colors.brandWarung,
        customColor: Colors.themeLight,
      }}
    />

    <Stack.Screen
      name="pedagang"
      component={PedagangStack}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="komunitas"
      component={KomunitasStack}
      options={{ headerShown: false }}
      initialParams={{
        customBg: Colors.brandKomunitas,
        customColor: Colors.themeLight,
      }}
    />

    <Stack.Screen
      name="makcomblang"
      component={MakComblangStack}
      options={{ headerShown: false }}
      initialParams={{
        customBg: Colors.brandMakcomblang,
        customColor: Colors.themeLight,
      }}
    />

    <Stack.Screen
      name="success"
      component={Success}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
)

export default AppStack
