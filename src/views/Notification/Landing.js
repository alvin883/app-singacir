import React, { Component } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Text } from "_atoms"
import { Spaces } from "_styles"

const Landing = () => {
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text>Notification Landing</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
    paddingHorizontal: Spaces.container,
  },
})

export default Landing
