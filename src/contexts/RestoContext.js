import React, { createContext, useState } from "react"

const RestoContext = createContext()

const RestoProvider = props => {
  const [selectedItems, setSelectedItems] = useState([])
  const [summary, setSummary] = useState({
    quantity: 0,
    price: 0,
    discount_price: 0,
  })

  const addSummary = ({ quantity, price, discount_price }) => {
    const newQuantity = summary.quantity + quantity
    const newPrice = summary.price + price
    const newDiscountPrice = summary.discount_price + discount_price

    setSummary({
      quantity: newQuantity,
      price: newPrice,
      discount_price: newDiscountPrice,
    })
  }

  const addSelectedItems = ({ id, price, discount_price }) => {
    const newQuantity = 1
    const itemIndex = selectedItems.findIndex(val => val.id === id)
    const itemPrice = isDiscount ? discount_price : price

    const isDiscount = typeof discount_price === "number"
    const isExist = itemIndex >= 0

    let newSelectedItems

    if (isExist) {
      // This item has already been selected
      newSelectedItems = [...selectedItems]
      newSelectedItems[itemIndex].quantity += newQuantity
    } else {
      // This item hasn't already been selected (new item)
      const newItems = { id: id, quantity: newQuantity }
      newSelectedItems = [...selectedItems, newItems]
    }

    // Update summary
    addSummary({
      quantity: newQuantity,
      price: price,
      discount_price: discount_price,
    })

    setSelectedItems(newSelectedItems)
  }

  return (
    <RestoContext.Provider
      value={{
        selectedItems,
        summary,
        addSelectedItems,
      }}>
      {props.children}
    </RestoContext.Provider>
  )
}

export default RestoProvider
export { RestoContext }
