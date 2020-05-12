const actionName = {
  RESTO_ADD_ITEM: "RESTO_ADD_ITEM",
  RESTO_REDUCE_ITEM: "RESTO_REDUCE_ITEM",
  RESTO_SET_TIPS: "RESTO_SET_TIPS",
}

const addItem = params => {
  return {
    type: actionName.RESTO_ADD_ITEM,
    params: params,
  }
}

const reduceItem = params => {
  return {
    type: actionName.RESTO_REDUCE_ITEM,
    params: params,
  }
}

const setTips = params => {
  return {
    type: actionName.RESTO_SET_TIPS,
    params: params,
  }
}

export { addItem, reduceItem, setTips, actionName }
