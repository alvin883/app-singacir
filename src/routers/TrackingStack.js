import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Tracking } from "_views"
import StackOptions from "_routers/config/StackOptions"

const Stack = createStackNavigator()

const TrackingStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="tracking/landing"
      component={Tracking.Landing}
      options={{ title: "Tracking" }}
    />
    <Stack.Screen
      name="tracking/detail"
      component={Tracking.Detail}
      options={{ title: "Tracking" }}
    />
  </Stack.Navigator>
)

export default TrackingStack
