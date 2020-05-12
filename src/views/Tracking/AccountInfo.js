import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Avatar, RatingDisplay, Heading, Button } from "_atoms"
import { Spaces, FontFamily, FontSizes, Colors } from "_styles"
import { hexToRgb } from "_utils"
import { IconName } from "_c_a_icons"

const AccountInfo = ({ photo, name, additionalInfo, rating }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View>
          <Avatar name={name} source={photo} />
        </View>
        <View style={styles.contentRight}>
          <Heading text={name} />
          <Text style={styles.additionalInfo}>{additionalInfo}</Text>
          <RatingDisplay style={styles.RatingDisplay} rating={rating} />
        </View>
      </View>
      <View style={styles.action}>
        <Button
          type="primary"
          shape="circle"
          iconName={IconName.phone}
          baseColor={Colors.brandSecondary}
          size="small"
          style={styles.actionButton}
        />
        <Button
          type="primary"
          shape="circle"
          iconName={IconName.whatsapp}
          baseColor={Colors.brandSecondary}
          size="small"
          style={{ ...styles.actionButton, marginTop: 6 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    paddingHorizontal: Spaces.container,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  contentRight: {
    marginLeft: 10,
    minHeight: 40,
    justifyContent: "center",
  },
  additionalInfo: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.small,
    color: hexToRgb(Colors.textPrimary, 0.8),
  },
  RatingDisplay: {
    marginTop: 6,
  },
  action: {
    flex: 0,
  },
  actionButton: {
    height: 36,
    width: 36,
  },
})

export default AccountInfo
