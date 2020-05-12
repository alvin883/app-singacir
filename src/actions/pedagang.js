const actionName = {
  PEDAGANG_ADD_ITEM: "PEDAGANG_ADD_ITEM",
  PEDAGANG_REDUCE_ITEM: "PEDAGANG_REDUCE_ITEM",
  PEDAGANG_SET_TIPS: "PEDAGANG_SET_TIPS",
}

const addItem = params => {
  return {
    type: actionName.PEDAGANG_ADD_ITEM,
    params: params,
  }
}

const reduceItem = params => {
  return {
    type: actionName.PEDAGANG_REDUCE_ITEM,
    params: params,
  }
}

const setTips = params => {
  return {
    type: actionName.PEDAGANG_SET_TIPS,
    params: params,
  }
}

export { addItem, reduceItem, setTips, actionName }
