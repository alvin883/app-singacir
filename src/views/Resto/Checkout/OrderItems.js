import React from "react"
import { View, ViewPropTypes } from "react-native"
import { MerchantMenuList } from "_organisms"
import { useSelector } from "react-redux"
import { resto } from "_actions"

const OrderItems = ({ style }) => {
  const { addItem, reduceItem } = resto
  const selectedItems = useSelector(state => state.restoReducer.selected)

  // DEBUG:
  // console.log(selectedItems)

  return (
    <View style={style}>
      <MerchantMenuList
        title="Pesanan"
        titleSize="normal"
        list={selectedItems}
        listStyle={{ marginTop: 20 }}
        reducerName="restoReducer"
        addAction={addItem}
        reduceAction={reduceItem}
        withColorIndicator={false}
      />
    </View>
  )
}

OrderItems.propTypes = {
  style: ViewPropTypes.style,
}

export default OrderItems
