const actionName = {
  WARUNG_ADD_ITEM: "WARUNG_ADD_ITEM",
  WARUNG_REDUCE_ITEM: "WARUNG_REDUCE_ITEM",
  WARUNG_SET_TIPS: "WARUNG_SET_TIPS",
}

const addItem = params => {
  return {
    type: actionName.WARUNG_ADD_ITEM,
    params: params,
  }
}

const reduceItem = params => {
  return {
    type: actionName.WARUNG_REDUCE_ITEM,
    params: params,
  }
}

const setTips = params => {
  return {
    type: actionName.WARUNG_SET_TIPS,
    params: params,
  }
}

export { addItem, reduceItem, setTips, actionName }
