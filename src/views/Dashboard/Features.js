import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import { Icon, IconName } from "_c_a_icons"
import { Colors, Spaces, FontFamily } from "_styles"
import { navigationServices } from "_utils"

const items = [
  {
    name: "Resto",
    iconName: IconName.fork,
    link: "resto",
  },
  {
    name: "Pedagang Keliling",
    iconName: IconName.fork,
    link: "pedagang",
  },
  {
    name: "Warung\n Emak",
    iconName: IconName.store,
    link: "warung",
  },

  {
    name: "Komunitas",
    iconName: IconName.people,
    link: "komunitas",
  },
  {
    name: "Mak Comblang",
    iconName: IconName.hand,
    link: "makcomblang",
  },
]

const renderButtons = () =>
  items.map((val, i) => (
    <TouchableOpacity
      style={styles.button}
      key={i}
      activeOpacity={0.5}
      onPress={() => navigationServices.Navigate(val.link)}>
      <View style={styles.buttonCircle}>
        <Icon
          name={val.iconName}
          color={Colors.themeLight}
          style={styles.buttonIcon}
        />
      </View>
      <Text style={styles.buttonText}>{val.name}</Text>
    </TouchableOpacity>
  ))

const Features = () => (
  <View style={styles.container}>
    <View style={styles.features}>{renderButtons()}</View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    // marginVertical: 30,
    marginBottom: 30,
    marginHorizontal: Spaces.container,
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    width: "33.33%",
    alignItems: "center",
  },
  buttonCircle: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    backgroundColor: Colors.brandSecondary,
  },
  buttonIcon: {
    height: 20,
    width: 20,
  },
  buttonText: {
    marginTop: 4,
    textAlign: "center",
    fontFamily: FontFamily.normal,
    color: Colors.textPrimary,
  },
})

export default Features
