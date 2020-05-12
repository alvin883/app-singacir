import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabOptions from "_routers/config/TabOptions"
import { Dashboard } from "_views"
import { IconName } from "_c_a_icons"
import NotificationStack from "./Notification"
import TrackingStack from "./TrackingStack"
import ProfileStack from "./ProfileStack"
import { navigationServices } from "_utils"

const Tab = createBottomTabNavigator()

const AppTabs = () => (
  <Tab.Navigator
    {...TabOptions}
    initialRouteName="AppHome"
    backBehavior="initialRoute">
    <Tab.Screen
      name="AppHome"
      component={Dashboard}
      initialParams={{ customTabIcon: IconName.home }}
      options={{ title: "Home" }}
    />

    <Tab.Screen
      name="Notification"
      component={NotificationStack}
      initialParams={{ customTabIcon: IconName.notification }}
      options={{ title: "Notifikasi" }}
    />

    <Tab.Screen
      name="Tracking"
      component={TrackingStack}
      initialParams={{ customTabIcon: IconName.mapMarker }}
      options={{ title: "Tracking" }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      initialParams={{ customTabIcon: IconName.account }}
      options={() => {
        const current = navigationServices.CurrentRouteName()

        /**
         * Only show the tabBar when current screen is "ProfileLanding" or
         * "Profile" (this only happen when user go to this tab for the
         * first time)
         */
        const isVisible = current === "ProfileLanding" || current === "Profile"

        console.log(current)

        return {
          title: "Profil",
          tabBarVisible: isVisible,
        }
      }}
    />
  </Tab.Navigator>
)

export default AppTabs
