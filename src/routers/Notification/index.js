import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Notification } from "_views"
import StackOptions, { StackOptionsStyle } from "_routers/config/StackOptions"
import NotificationLandingTab from "./LandingTab"
import { Colors } from "_styles"

const Stack = createStackNavigator()

const NotificationStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="notification/landing"
      component={Notification.LandingAll}
      options={{
        title: "Notifikasi",
        headerStyle: {
          ...StackOptionsStyle.header,
          elevation: 0,
          borderBottomColor: Colors.themeBorder,
          borderBottomWidth: 1,
        },
      }}
    />
    <Stack.Screen
      name="notification/detail"
      component={Notification.Detail}
      options={{ title: "Notifikasi" }}
    />
  </Stack.Navigator>
)

export default NotificationStack
