import React from "react"
import {
  TouchableOpacity,
  View,
  ViewPropTypes,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native"
import PropTypes from "prop-types"
import { hexToRgb } from "_utils"
import { Colors, Spaces } from "_styles"
import { Text } from "_atoms"
import { Icon, IconName } from "_c_a_icons"
import Batik from "_assets/images/batik.jpeg"

const ProfileButton = ({
  title,
  value,
  actionText,
  onClick,
  colorPreset,
  style,
  withBatik,
}) => {
  const isNormal = colorPreset === "normal"
  const colorBoxNormal = Colors.themeLight
  const colorText = isNormal ? Colors.textPrimary : Colors.themeLight
  const colorBox = isNormal ? colorBoxNormal : Colors.brandSecondary
  const colorAction = isNormal ? Colors.brandPrimary : Colors.themeLight

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onClick}
      style={{
        ...styles.wrapper,
        ...style,
        ...(withBatik
          ? { backgroundColor: Colors.brandPrimary }
          : { backgroundColor: colorBox }),
      }}>
      <ImageBackground
        source={withBatik ? Batik : null}
        style={styles.boxBackground}
        resizeMode="cover"
      />
      <View>
        <Text
          style={{
            ...styles.title,
            ...{ color: colorText },
          }}
          size="small">
          {title}
        </Text>
        <Text
          style={{
            ...styles.value,
            ...{ color: colorText },
          }}
          weight="bold">
          {value}
        </Text>
      </View>
      <View style={styles.right}>
        <View style={styles.rightInner}>
          <Text
            style={{
              ...styles.actionText,
              ...{ color: colorAction },
            }}
            size="small"
            weight="bold">
            {actionText}
          </Text>
          <Icon
            name={IconName.chevronRight}
            color={colorAction}
            style={styles.actionIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

ProfileButton.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  actionText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  colorPreset: PropTypes.oneOf(["normal", "secondary"]),
  style: ViewPropTypes.style,
  withBatik: PropTypes.bool,
}

ProfileButton.defaultProps = {
  colorPreset: "normal",
  withBatik: false,
}

const boxWidth = Dimensions.get("window").width - Spaces.container * 2
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: Colors.brandSecondary,
  },
  boxBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.15,
    overflow: "hidden",
  },
  title: {
    opacity: 0.8,
  },
  value: {
    marginTop: 2,
  },
  rightInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {},
  actionIcon: {
    height: 20,
    width: 20,
    marginLeft: 4,
  },
})

export default ProfileButton
