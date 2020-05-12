import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { Heading, Content, Button, Input } from "_atoms"
import { Spaces } from "_styles"

class Landing extends Component {
  clickLink = () => {
    alert("Link has been sended!")
    this.props.navigation.navigate("LupaPasswordReset")
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <Heading
              style={styles.topTitle}
              text="Cara Memulihkan Kata Sandi"
              size="6"
            />
            <Content style={styles.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              posuere placerat lorem, in molestie odio vehicula.
            </Content>

            <Input
              style={styles.input}
              label="Email"
              placeholder="Masukkan email anda ..."
              keyboardType="email-address"
            />

            <Button
              style={styles.button}
              type="primary"
              size="large"
              text="Selanjutnya"
              onPress={this.clickLink}
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
    marginTop: 30,
  },
  button: {
    marginTop: 40,
  },
})

export default Landing
