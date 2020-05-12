import React, { Component, createContext, useState } from "react"

export const SafeAreaContext = createContext()

// class SafeAreaContextProvider extends Component {
//   state = {
//     height: 0,
//   }

//   setSafeareaHeight = height => {
//     this.setState({
//       height: height,
//     })
//   }

//   render() {
//     return (
//       <SafeAreaContext.Provider value={{ safeArea, setSafeArea }}>
//         {props.children}
//       </SafeAreaContext.Provider>
//     )
//   }
// }

// export default SafeAreaContextProvider

const SafeAreaProvider = props => {
  const [safeArea, setSafeArea] = useState({ height: 0, width: 0, x: 0, y: 0 })
  const setHeight = layout => setSafeArea(layout)

  return (
    <SafeAreaContext.Provider value={{ safeArea, setSafeArea, setHeight }}>
      {props.children}
    </SafeAreaContext.Provider>
  )
}

export default SafeAreaProvider
