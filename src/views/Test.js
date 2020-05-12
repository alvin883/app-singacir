import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { Colors, FontFamily } from "_styles"

const Tab = createMaterialTopTabNavigator(
  {
    Tab0: {
      screen: () => <Text>Tab 1 Content</Text>,
      navigationOptions: {
        title: "Semua",
      },
    },
    Tab1: {
      screen: () => <Text>Tab 1 Content</Text>,
      navigationOptions: {
        title: "Diproses",
      },
    },
    Tab2: {
      screen: () => <Text>Tab 2 Content</Text>,
      navigationOptions: {
        title: "Dikirim",
      },
    },
    Tab3: {
      screen: () => <Text>Tab 3 Content</Text>,
      navigationOptions: {
        title: "Selesai",
      },
    },
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      upperCaseLabel: false,
      activeTintColor: Colors.brandPrimary,
      inactiveTintColor: Colors.textPrimary,
      style: {
        elevation: 0,
        borderColor: Colors.themeDark + "15",
        borderBottomWidth: 1,
        backgroundColor: Colors.themeLight,
      },

      /**
       * The text inside the tab
       * NOTE: Don't set the `color` here, you should use `TintColor` option instead!
       */
      labelStyle: {
        fontFamily: FontFamily.normal,
      },

      /**
       * The line at the bottom of tab
       */
      indicatorStyle: {
        backgroundColor: Colors.brandPrimary,
      },
    },

    /**
     * Custom tabBarComponent
     */
    // tabBarComponent: props => {
    //   const { navigationState, navigation, position } = props
    //   return (
    //     <View
    //       style={{
    //         flexDirection: "row",
    //       }}>
    //       {navigationState.routes.map((route, index) => (
    //         <TouchableOpacity
    //           onPress={() => {
    //             console.log("tab")
    //             navigation.navigate(route.routeName)
    //           }}
    //           style={{
    //             paddingVertical: 8,
    //             paddingHorizontal: 14,
    //             marginHorizontal: 6,
    //             borderRadius: 8,
    //             backgroundColor: Colors.brandPrimary,
    //           }}
    //           key={index}>
    //           <Text>{route.routeName}</Text>
    //         </TouchableOpacity>
    //       ))}
    //     </View>
    //   )
    // },
  },
)

class Daftar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Blabla = createAppContainer(Tab)
    return <Blabla />
  }
}

export default Daftar
