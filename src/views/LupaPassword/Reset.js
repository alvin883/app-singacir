import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Heading, Content, Button, Input } from "_atoms"
import { Spaces } from "_styles"

class Reset extends Component {
  clickSubmit = () => {
    alert("Submit reset password!")
    // Back to the very first
    this.props.navigation.popToTop()

    // this.props.navigation.goBack("Login")
    // this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <Heading style={styles.topTitle} text="Reset Kata Sandi" size="6" />
            <Content style={styles.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              posuere placerat lorem, in molestie odio vehicula.
            </Content>

            <Input
              style={{ ...styles.input, marginTop: 30 }}
              label="Kata Sandi"
              placeholder="Masukkan kata sandi baru ..."
              secureTextEntry={true}
            />

            <Input
              style={styles.input}
              label="Konfirmasi Kata Sandi"
              placeholder="Masukkan kembali kata sandi baru ..."
              secureTextEntry={true}
            />

            <Button
              style={styles.button}
              type="primary"
              size="large"
              text="Reset"
              onPress={this.clickSubmit}
            />
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
  },
  topTitle: {
    textAlign: "center",
  },
  content: {
    marginTop: 30,
  },
  input: {
    marginTop: 26,
  },
  button: {
    marginTop: 40,
  },
})

export default Reset
