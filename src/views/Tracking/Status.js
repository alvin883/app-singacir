import React, { Component } from "react"
import { View, Text, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Spaces, FontFamily, FontSizes, Colors } from "_styles"
import { Heading } from "_atoms"

const Status = ({ status, time, style }) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <Heading text={status} />

      {time && (
        <View style={styles.bottom}>
          <Text style={{ ...styles.bottomText, ...styles.text }}>
            Estimasi pengiriman
          </Text>
          <Text style={{ ...styles.bottomText, ...styles.time }}>{time}</Text>
        </View>
      )}
    </View>
  )
}

Status.propTypes = {
  status: PropTypes.string,
  time: PropTypes.string,
  style: ViewPropTypes.style,
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spaces.container,
  },
  status: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.normal,
    color: Colors.textPrimary,
  },
  bottom: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bottomText: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.small,
  },
  time: {
    marginLeft: 6,
    color: Colors.brandPrimary,
  },
})

export default Status
