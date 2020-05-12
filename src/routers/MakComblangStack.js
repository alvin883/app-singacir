import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { MakComblang } from "_views"
import StackOptions from "_routers/config/StackOptions"

const Stack = createStackNavigator()

const MakComblangStack = () => (
  <Stack.Navigator {...StackOptions}>
    <Stack.Screen
      name="makcomblang/landing"
      component={MakComblang.Landing}
      options={{ title: "Mak Comblang" }}
    />
    <Stack.Screen
      name="makcomblang/detail"
      component={MakComblang.Detail}
      options={({ route }) => ({ title: route.params.title })}
    />

    {/* <Stack.Screen
      name="makcomblang/edit-form"
      component={Komunitas.EditForm}
      options={({ navigation, route }) => ({
        title: route.params?.isEditing ? "Edit Komunitas" : "Buat Komunitas",
      })}
    />

    <Stack.Screen
      name="makcomblang/add-activity"
      component={Komunitas.AddActivity}
      options={({ route }) => ({ title: route.params.routeTitle })}
    /> */}
  </Stack.Navigator>
)

export default MakComblangStack
