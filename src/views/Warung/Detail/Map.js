import React, { Component } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import PropTypes from "prop-types"
import { Colors, FontSizes, FontFamily } from "_styles"

const Map = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>MAPS</Text>
    </View>
  )
}

const viewport = Dimensions.get("window")
const styles = StyleSheet.create({
  wrapper: {
    width: viewport.width,
    aspectRatio: 16 / 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.themeImgPlaceholder,
  },
  text: {
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.bold,
    opacity: 0.3,
  },
})

export default Map
