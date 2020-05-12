import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { Heading, Button, Input } from "_atoms"
import { FontSizes, FontFamily } from "_styles"
import { HeadingIcon } from "_molecules"
import { IconName } from "_c_a_icons"

// TODO: Defined props
const Address = ({ address, style }) => (
  <View style={{ ...styles.wrapper, ...style }}>
    <Heading text="Alamat Pengiriman" style={styles.Heading} />
    <View style={styles.addressTop}>
      <HeadingIcon
        style={styles.HeadingIcon}
        iconName={IconName.mapMarker}
        text={address}
        textStyle={styles.HeadingIconText}
      />
      <Button
        style={styles.editButton}
        type="nude"
        iconName={IconName.pencil}
        size="small"
        iconStyle={styles.editIcon}
      />
    </View>
    <View style={styles.addressBottom}>
      <Input
        style={styles.input}
        stylePreset="boxed"
        placeholder="Tambahkan catatan pengantaran ..."
        fieldStyle={styles.inputField}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
  },
  Heading: {
    fontSize: FontSizes.normal,
  },
  addressTop: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeadingIcon: {
    flex: 1,
    marginTop: 0,
  },
  HeadingIconText: {
    fontFamily: FontFamily.normal,
  },
  editButton: {
    flex: 0,
  },
  editIcon: {
    marginRight: 0,
  },
  input: {
    marginTop: 14,
  },
  inputField: {
    paddingLeft: 14,
    paddingVertical: 10,
  },
})

export default Address
