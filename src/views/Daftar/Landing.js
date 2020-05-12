import React, { Component } from "react"
import { View, Text, StyleSheet, Image, ScrollView } from "react-native"
import { Heading, Button, Content } from "_atoms"
import { Spaces, Colors, FontFamily } from "_styles"
import { LogoFacebook, LogoGoogle } from "_c_a_icons"
import Logo from "_assets/images/logo.png"

class Landing extends Component {
  clickLogin = () => {
    this.props.navigation.goBack()
  }

  clickSignupUser = () => {
    this.props.navigation.navigate("DaftarUser")
  }

  clickSignupMitra = () => {
    this.props.navigation.navigate("DaftarMitra")
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <Image source={Logo} style={styles.logo} />
            <Heading style={styles.topTitle} text="Daftar Akun Baru" size="6" />
            <Content style={styles.content}>
              Jangan lewatkan promo di bulan blablab September 2019 ini karena
              akan ada hadiah yang akan didapatkan.
            </Content>
            <View style={styles.buttons}>
              <Button
                style={styles.button}
                type="secondary"
                text="Mitra"
                onPress={this.clickSignupMitra}
              />
              <Button
                style={styles.button}
                type="primary"
                text="User"
                onPress={this.clickSignupUser}
              />
            </View>
          </View>

          <View style={styles.bottom}>
            <Text style={styles.bottomTitle}>Atau daftar dengan</Text>
            <View style={styles.options}>
              <Button
                style={styles.optionsButton}
                shape="circle"
                IconSVG={LogoGoogle}
                baseColor={Colors.themeLight}
                onPress={() => this.props.navigation.navigate("Daftar")}
              />
              <Button
                style={styles.optionsButton}
                shape="circle"
                IconSVG={LogoFacebook}
                baseColor={Colors.themeLight}
                onPress={() => this.props.navigation.navigate("Daftar")}
              />
            </View>
            <View style={styles.login}>
              <Text>Sudah Punya akun? </Text>
              <Button
                style={styles.loginButton}
                type="nude"
                text="Masuk"
                onPress={this.clickLogin}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  top: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: Spaces.container,
    backgroundColor: Colors.themeLight,
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
  buttons: {
    margin: -4,
    marginTop: 30 - 4,
    flexDirection: "row",
  },
  button: {
    width: "50%",
    margin: 4,
    flexShrink: 1,
  },
  bottom: {
    paddingVertical: 20,
  },
  bottomTitle: {
    alignSelf: "center",
    fontFamily: FontFamily.normal,
  },
  options: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  optionsButton: {
    margin: 6,
  },
  login: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    marginLeft: 10,
  },
})

export default Landing
