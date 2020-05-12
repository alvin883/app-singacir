import React, { Component } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Text, Content, Button, Illustrations } from "_atoms"
import { Spaces } from "_styles"
import { navigationServices } from "_utils"
import { TabActions } from "@react-navigation/native"

class Success extends Component {
  state = {}

  gotoDashboard = () => {
    this.props.navigation.popToTop()
    // TabActions.jumpTo("App")
    // this.props.navigation.jumpTo("App")
    // navigationServices.GoBack("App/Dashboard")
    // navigationServices.Navigate("Dashboard")
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <Illustrations.success />
          <Text weight="bold" style={styles.title}>
            Terima Kasih!
          </Text>
          <Content style={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            scelerisque mi non nibh sollicitudin varius id sed magna.
          </Content>
          <Button
            style={styles.button}
            size="large"
            text="Kembali ke Beranda"
            onPress={this.gotoDashboard}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spaces.container,
    marginVertical: 30,
  },
  title: {
    textAlign: "center",
    marginTop: 20,
  },
  content: {
    marginTop: 20,
  },
  button: {
    marginTop: 40,
  },
})

export default Success
