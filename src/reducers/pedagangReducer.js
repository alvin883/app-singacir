import { pedagang } from "_actions"

const { actionName } = pedagang

const initState = {
  selected: [],
  summary: {
    quantity: 0,
    price: 0,
    discount_price: 0,
  },
  tips: 0,
}

/**
 * To return updated `summaryState`
 *
 * @param {object} summaryState current summary state
 * @param {{quantity: number, price: number, discount_price: number}} param1 required object
 * @param {("plus"|"minus")} action
 */
const updateSummary = (
  summaryState,
  { quantity, price, discount_price },
  action = "plus",
) => {
  let newQuantity, newPrice, newDiscountPrice

  if (action === "plus") {
    newQuantity = summaryState.quantity + quantity
    newPrice = summaryState.price + price
    newDiscountPrice = summaryState.discount_price + discount_price
  } else if (action === "minus") {
    newQuantity = summaryState.quantity - quantity
    newPrice = summaryState.price - price
    newDiscountPrice = summaryState.discount_price - discount_price
  }

  return {
    quantity: newQuantity,
    price: newPrice,
    discount_price: newDiscountPrice,
  }
}

// SET_REDUCER [resto/pedagang/warung]Reducer -> [addItem/reduceItem]
const addSelectedItems = (
  selectedState,
  summaryState,
  { id, image, name, price, discount_price },
) => {
  const newQuantity = 1
  const itemIndex = selectedState.findIndex(val => val.id === id)
  const isExist = itemIndex >= 0

  let newSelected

  if (isExist) {
    // This item has already been selected
    newSelected = [...selectedState]
    newSelected[itemIndex].quantity += newQuantity
  } else {
    // This item hasn't already been selected (new item)
    const newItems = {
      id: id,
      image: image,
      name: name,
      quantity: newQuantity,
      price: price,
      discount_price: discount_price,
    }
    newSelected = [...selectedState, newItems]
  }

  // Update summary
  const newSummary = updateSummary(summaryState, {
    quantity: newQuantity,
    price: price,
    discount_price: discount_price,
  })

  return {
    selected: newSelected,
    summary: newSummary,
  }
}

const reduceItems = (
  selectedState,
  summaryState,
  { id, price, discount_price },
) => {
  const itemIndex = selectedState.findIndex(val => val.id === id)
  const isExist = itemIndex >= 0

  // Validator if item is not exist in the list
  if (!isExist)
    return {
      selected: selectedState,
      summary: summaryState,
    }

  const newQuantity = selectedState[itemIndex].quantity - 1
  const willEmpty = newQuantity < 1

  let newSelected

  if (willEmpty) {
    newSelected = selectedState.filter(val => val.id !== id)
  } else {
    newSelected = [...selectedState]
    newSelected[itemIndex].quantity = newQuantity
  }

  const newSummary = updateSummary(
    summaryState,
    {
      quantity: 1,
      price: price,
      discount_price: discount_price,
    },
    "minus",
  )

  return {
    selected: newSelected,
    summary: newSummary,
  }
}

const pedagangReducer = (state = initState, action) => {
  let newState

  switch (action.type) {
    case actionName.PEDAGANG_ADD_ITEM:
      newState = addSelectedItems(state.selected, state.summary, action.params)

      // console.log("Reducer: ", action.type, newState)

      return newState

    case actionName.PEDAGANG_REDUCE_ITEM:
      newState = reduceItems(state.selected, state.summary, action.params)

      // console.log("Reducer: ", action.type, newState)

      return newState

    case actionName.PEDAGANG_SET_TIPS:
      newState = { ...state }
      newState.tips = action.params.tips

      return newState

    default:
      return state
  }
}

export default pedagangReducer
