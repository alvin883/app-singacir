import React, { Component, useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Text, Divider, Content } from "_atoms"
import { Spaces, Colors } from "_styles"
import { formatDate, dateToUnix } from "_utils"
import { IconName, Icon } from "_c_a_icons"
import { NotificationItem } from "_molecules"

const DATA = [
  {
    order_id: "918238",
    date_order: dateToUnix(new Date()) - 4,
    total_transaction: 4500000,
    title: "Topup Berhasil",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    order_id: "918237",
    date_order: dateToUnix(new Date("01/10/2020")),
    total_transaction: 300000,
    title: "Topup Berhasil",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    order_id: "918238",
    date_order: dateToUnix(new Date("02/01/2020")),
    total_transaction: 4500000,
    title: "Topup Berhasil",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
]

const LandingAll = () => {
  const [data, setData] = useState(DATA)

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {data.map((val, i) => (
          <React.Fragment key={i}>
            {i !== 0 && <Divider style={styles.divider} />}
            <NotificationItem
              id={val.order_id}
              time={val.date_order}
              title={val.title}
              iconName={IconName.wallet}
              content={val.description}
            />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 30,
    paddingHorizontal: Spaces.container,
  },
  divider: {
    marginHorizontal: 0 - Spaces.container,
  },
})

export default LandingAll
