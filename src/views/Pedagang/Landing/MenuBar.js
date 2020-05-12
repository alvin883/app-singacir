import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import { Colors, Spaces, FontFamily, FontSizes } from "_styles"
import { convertToCurrency } from "_utils"
import { Icon, IconName } from "_c_a_icons"
import { connect } from "react-redux"

const MenuBar = ({ quantity, price, onClick }) => {
  const isQuantity = quantity && quantity > 0

  return isQuantity ? (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={onClick}
        activeOpacity={0.8}>
        <View style={styles.left}>
          <Text style={styles.quantity}>{quantity} item</Text>
          <Text style={styles.price}>Rp {convertToCurrency(price)}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.rightText}>Lanjut</Text>
          <Icon name={IconName.chevronRight} color={Colors.themeLight} />
        </View>
      </TouchableOpacity>
    </View>
  ) : null
}

MenuBar.propTypes = {
  quantity: PropTypes.number,
  price: PropTypes.number,
  onClick: PropTypes.func.isRequired,
}

MenuBar.defaultProps = {
  quantity: 0,
  price: 0,
  onClick: () => {},
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingHorizontal: Spaces.container,
    paddingVertical: 16,
    borderTopColor: Colors.themeHeaderBorder,
    borderTopWidth: 1,
    backgroundColor: Colors.themeLight,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 4,
    backgroundColor: Colors.brandPrimary,
  },
  quantity: {
    fontSize: FontSizes.small,
    fontFamily: FontFamily.normal,
    color: Colors.themeLight,
  },
  price: {
    fontFamily: FontFamily.bold,
    color: Colors.themeLight,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    marginRight: 6,
    textTransform: "uppercase",
    fontFamily: FontFamily.bold,
    color: Colors.themeLight,
  },
})

const mapStateToProps = (state, ownProps) => {
  // console.log("Map: ", state)
  return {
    ...ownProps,
    quantity: state.pedagangReducer.summary.quantity,
    price: state.pedagangReducer.summary.price,
  }
}

export default connect(mapStateToProps)(MenuBar)
