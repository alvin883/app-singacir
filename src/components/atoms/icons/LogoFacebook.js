import React from "react"
import { Path } from "react-native-svg"
import SvgHOC from "./SvgHOC"

const LogoFacebook = ({ color }) => {
  const blue = "#3C5A99"
  const white = "#FFFFFF"

  return (
    <>
      <Path
        d="M20.1609 21.1734C20.72 21.1734 21.1734 20.72 21.1734 20.1607V3.83921C21.1734 3.27988 20.7201 2.82661 20.1609 2.82661H3.83922C3.27988 2.82661 2.82661 3.27988 2.82661 3.83921V20.1607C2.82661 20.7199 3.27981 21.1734 3.83922 21.1734H20.1609Z"
        fill={blue}
      />
      <Path
        d="M15.4856 21.1734V14.0685H17.8704L18.2275 11.2996H15.4856V9.53184C15.4856 8.73018 15.7082 8.18388 16.8578 8.18388L18.324 8.18324V5.70671C18.0704 5.67297 17.2001 5.59758 16.1875 5.59758C14.0735 5.59758 12.6262 6.88795 12.6262 9.25762V11.2996H10.2353V14.0685H12.6262V21.1734H15.4856Z"
        fill={white}
      />
    </>
  )
}

export default SvgHOC(LogoFacebook)
