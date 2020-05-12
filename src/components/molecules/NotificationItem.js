import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Text, Divider, Content } from "_atoms"
import { Spaces, Colors } from "_styles"
import { formatDate, dateToUnix } from "_utils"
import { IconName, Icon } from "_c_a_icons"

const NotificationItem = ({ time, title, iconName, id, content }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.time} size="small">
        {formatDate(time, true, true)}
      </Text>
      <View style={styles.header}>
        <View style={styles.circle}>
          <Icon style={styles.icon} name={iconName} color={Colors.themeLight} />
        </View>
        <View style={styles.headerContent}>
          <Text weight="bold">{title}</Text>
          <Text style={styles.id} size="small">
            ID#{id}
          </Text>
          <Content style={styles.content}>{content}</Content>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  time: {
    opacity: 0.6,
  },
  header: {
    flex: 1,
    flexShrink: 1,
    marginTop: 10,
    flexDirection: "row",
  },
  headerContent: {
    flexShrink: 1,
  },
  circle: {
    height: 34,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderRadius: 50,
    backgroundColor: Colors.brandSecondary,
  },
  icon: {
    height: 18,
    width: 18,
  },
  id: {
    opacity: 0.8,
  },
  content: {
    // width: "f",
    flex: 1,
    marginTop: 10,
  },
})

export default NotificationItem
