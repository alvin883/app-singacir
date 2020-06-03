import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  ProfileLanding,
  ProfileEdit,
  ProfileEditPass,
  ProfileBalanceHistory,
  ProfileDonation,
  ProfileDonationHistory,
} from "_views"
import StackOptions from "_routers/config/StackOptions"

const Stack = createStackNavigator()

const ProfileStack = () => (
  <Stack.Navigator {...StackOptions} initialRouteName="ProfileLanding">
    <Stack.Screen
      name="ProfileLanding"
      component={ProfileLanding}
      options={{ title: "Profil" }}
    />

    <Stack.Screen
      name="ProfileEdit"
      component={ProfileEdit}
      options={{ title: "Edit Profil" }}
    />

    <Stack.Screen
      name="ProfileEditPass"
      component={ProfileEditPass}
      options={{ title: "Ubah Kata Sandi" }}
    />

    <Stack.Screen
      name="ProfileBalanceHistory"
      component={ProfileBalanceHistory}
      options={{ title: "History" }}
    />

    <Stack.Screen
      name="ProfileDonation"
      component={ProfileDonation}
      options={{ title: "Donasi" }}
    />

    <Stack.Screen
      name="ProfileDonationHistory"
      component={ProfileDonationHistory}
      options={{ title: "History Donasi" }}
    />
  </Stack.Navigator>
)

export default ProfileStack
