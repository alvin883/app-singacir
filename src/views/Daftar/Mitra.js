import React, { Component } from "react"
import { StyleSheet, View, Image, ScrollView } from "react-native"
import { Button, Content, Heading } from "_atoms"
import { Spaces, Colors } from "_styles"
import logo from "_assets/images/logo.png"

class Mitra extends Component {
  constructor(props) {
    super(props)
  }

  // TODO: Change this to Play Store link
  clickDownload = () => {
    this.props.navigation.navigate("DaftarStep")
    alert("Click Download")
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Heading
            style={styles.topTitle}
            text="Download Aplikasi Mitra"
            size="6"
          />
          <Content style={styles.content}>
            Jangan lewatkan promo di bulan blablab September 2019 ini karena
            akan ada hadiah yang akan didapatkan.
          </Content>
          <Button
            style={styles.button}
            text="Download"
            type="primary"
            size="large"
            onPress={this.clickDownload}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: Colors.themeLight,
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: Spaces.container,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
    alignSelf: "center",
  },
  topTitle: {
    textAlign: "center",
  },
  content: {
    marginTop: 30,
  },
  button: {
    marginTop: 40,
  },
})

export default Mitra
