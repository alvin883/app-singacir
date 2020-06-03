import React, { useState, useCallback } from "react"
import { ScrollView, View, StyleSheet, StatusBar } from "react-native"
import { Text, Button, Divider } from "_atoms"
import { Spaces, Colors } from "_styles"
import { IconName } from "_c_a_icons"
import {
  convertToCurrency,
  timeSince,
  unixToDate,
  dateToUnix,
  navigationServices,
} from "_utils"
import { OrderItem } from "_molecules"
import { useFocusEffect } from "@react-navigation/native"

const DATA = [
  {
    order_id: "918238",
    date_order: dateToUnix(new Date()) - 4,
    total_transaction: 4500000,
    bussiness_name: "Siomay Bandung",
    status: "Driver sedang menuju Resto",
  },
  {
    order_id: "918237",
    date_order: dateToUnix(new Date("01/10/2020")),
    total_transaction: 300000,
    bussiness_name: "Bakso Malang",
    status: "Pesanan sedang dimasak",
  },
  {
    order_id: "918238",
    date_order: dateToUnix(new Date("02/01/2020")),
    total_transaction: 4500000,
    bussiness_name: "Nasi Goreng Gila",
    status: "Driver sedang menuju Resto",
  },
]

const Landing = () => {
  const [data, setData] = useState(DATA)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.themeLight)
      StatusBar.setBarStyle("dark-content")
    }, []),
  )

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {data.map((val, i) => (
          <React.Fragment key={i}>
            <OrderItem
              name={val.bussiness_name}
              totalPrice={val.total_transaction}
              status={val.status}
              time={val.date_order}
              onClickDetail={() => {
                navigationServices.Navigate("tracking/detail")
              }}
            />
            <Divider style={styles.divider} />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: Spaces.container,
  },
  divider: {
    marginHorizontal: 0 - Spaces.container,
  },
})

export default Landing
