import React, { Component } from "react"
import { Image, View } from "react-native"
import Logo from "_assets/images/logo.png"

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <View>
        <Image
          source={Logo}
          style={{
            width: 160,
            height: 160,
          }}
        />
      </View>
    </View>
  )
}

export default Splash
