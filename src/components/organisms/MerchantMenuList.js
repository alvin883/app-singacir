import React from "react"
import { View, StyleSheet, ViewPropTypes } from "react-native"
import PropTypes from "prop-types"
import { Heading, Text } from "_atoms"
import { Spaces, FontSizes, Colors } from "_styles"
import { MerchantMenu } from "_molecules"

// SET_API
// Here for templating menu
const Items = ({
  items,
  reducerName,
  addAction,
  reduceAction,
  withColorIndicator,
  onClickOverall,
}) =>
  items.map((val, index) => {
    const additionalStyle = index === 0 ? { style: { marginTop: 0 } } : {}

    return (
      <MerchantMenu
        key={index}
        id={val.id}
        image={val.image}
        name={val.name}
        price={val.price}
        description={val.description}
        discount_price={val.discount_price}
        reducerName={reducerName}
        addAction={addAction}
        reduceAction={reduceAction}
        withColorIndicator={withColorIndicator}
        onClickOverall={onClickOverall}
        {...additionalStyle}
      />
    )
  })

const MerchantMenuList = ({
  title,
  titleSize,
  titleStyle,
  list,
  listStyle,
  style,
  reducerName,
  addAction,
  reduceAction,
  withColorIndicator,
  onClickOverall,
}) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      {title && (
        <Text style={titleStyle} size={titleSize} weight="bold">
          {title}
        </Text>
      )}
      <View style={{ ...styles.listWrapper, ...listStyle }}>
        <Items
          items={list}
          reducerName={reducerName}
          addAction={addAction}
          reduceAction={reduceAction}
          withColorIndicator={withColorIndicator}
          onClickOverall={onClickOverall}
        />
      </View>
    </View>
  )
}

MerchantMenuList.propTypes = {
  /**
   * NOTE: You don't need to specify this props:
   *
   *  - reduceAction
   *  - addAction
   *  - reducerName
   *  - withColorIndicator
   *
   * because those will be checked in ItemMenu component instead
   */

  title: PropTypes.string,
  titleSize: Text.propTypes.size,
  titleStyle: Text.propTypes.style,
  list: PropTypes.array,
  listStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
}

MerchantMenuList.defaultProps = {
  titleSize: "large",
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spaces.container,
  },
  listWrapper: {
    marginTop: 30,
  },
})

export default MerchantMenuList
