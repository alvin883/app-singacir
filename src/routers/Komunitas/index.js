import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Komunitas } from "_views"
import StackOptions from "_routers/config/StackOptions"
import Tabs from "./Tabs"
import { Colors } from "_styles"

const Stack = createStackNavigator()
const initParams = {
  customBg: Colors.brandKomunitas,
  customColor: Colors.themeLight,
}

const KomunitasStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="komunitas/root"
      component={Tabs}
      options={{ title: "Komunitas", headerShown: false }}
      initialParams={initParams}
    />
    <Stack.Screen
      name="komunitas/detail"
      component={Komunitas.Detail}
      options={({ route }) => ({ title: route.params.title })}
      initialParams={initParams}
    />

    <Stack.Screen
      name="komunitas/edit-form"
      component={Komunitas.EditForm}
      options={({ navigation, route }) => ({
        title: route.params?.isEditing ? "Edit Komunitas" : "Buat Komunitas",
      })}
      initialParams={initParams}
    />

    <Stack.Screen
      name="komunitas/add-activity"
      component={Komunitas.AddActivity}
      options={({ route }) => ({ title: route.params.routeTitle })}
      initialParams={initParams}
    />
  </Stack.Navigator>
)

export default KomunitasStack
