import React from "react"
import { View, Text, Image, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { sourcePropType, hexToRgb } from "_utils"
import { Colors, FontSizes, FontFamily } from "_styles"
import { Icon, IconName } from "_c_a_icons"

const Avatar = ({ style, name, source, imageStyle }) => {
  let child

  if (source) {
    child = <Image source={source} style={{ ...styles.image, ...imageStyle }} />
  } else if (name) {
    child = <Text style={styles.initial}>{name.slice(0, 1)}</Text>
  } else {
    child = (
      <Icon name={IconName.account} color={hexToRgb(Colors.themeLight, 0.6)} />
    )
  }

  return <View style={{ ...styles.circle, ...style }}>{child}</View>
}

Avatar.propTypes = {
  style: ViewPropTypes.style,
  imageStyle: ViewPropTypes.style,
  name: PropTypes.string.isRequired,
  source: sourcePropType,
}

Avatar.defaultProps = {
  source: null,
}

const styles = StyleSheet.create({
  circle: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: hexToRgb(Colors.themeLight, 0.2),
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  initial: {
    textTransform: "uppercase",
    fontSize: FontSizes.large,
    fontFamily: FontFamily.bold,
    color: Colors.themeLight,
  },
})

export default Avatar
