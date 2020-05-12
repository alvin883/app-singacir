import React from "react"
import { SafeAreaView, YellowBox } from "react-native"
import { RootNavigation } from "./routers"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { navigationServices } from "_utils"
import store from "./store"

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    /**
     * TODO: You should resolve this, there's issue with `react-native-snap-carousel`
     * @link https://stackoverflow.com/a/61023244/6049731
     */
    YellowBox.ignoreWarnings([
      "FlatList: Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
    ])

    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <NavigationContainer ref={navigationServices.NavigationRef}>
              <RootNavigation />
            </NavigationContainer>
          </Provider>
        </SafeAreaView>
      </>
    )
  }
}

export default App
