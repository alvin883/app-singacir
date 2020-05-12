import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Notification } from "_views"
import { FontFamily, Colors } from "_styles"
import { hexToRgb } from "_utils"
import MaterialTopTabOptions from "_routers/config/MaterialTopTabOptions"

const Tab = createMaterialTopTabNavigator()

const NotificationLandingTab = () => (
  <Tab.Navigator
    tabBarOptions={{
      ...MaterialTopTabOptions.tabBarOptions,
      scrollEnabled: true,
    }}
    backBehavior="initialRoute">
    <Tab.Screen
      name="notification/landing-all"
      component={Notification.LandingAll}
      options={{ title: "Semua" }}
    />
    <Tab.Screen
      name="notification/landing-done"
      component={Notification.LandingDone}
      options={{ title: "Pengiriman" }}
    />
    <Tab.Screen
      name="notification/landing-info"
      component={Notification.LandingDone}
      options={{ title: "Pemberitahuan" }}
    />
    <Tab.Screen
      name="notification/landing-money"
      component={Notification.LandingDone}
      options={{ title: "Keuangan" }}
    />
  </Tab.Navigator>
)

export default NotificationLandingTab
