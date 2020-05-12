import React, { Component } from "react"
import { StyleSheet, View, ScrollView, Linking, Text } from "react-native"
import { Button, Input, Checkbox, Content } from "_atoms"
import { Spaces, Colors, FontSizes } from "_styles"

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkbox: false,
    }
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({ checkbox: !prevState.checkbox }))
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <Input label="Nama Lengkap" placeholder="Nama lengkap anda ..." />

            <Input
              style={styles.input}
              label="Kata Sandi"
              placeholder="Masukkan kata sandi anda ..."
              secureTextEntry={true}
            />

            <Input
              style={styles.input}
              label="Konfirmasi Kata Sandi"
              placeholder="Masukkan kembali kata sandi anda ..."
              secureTextEntry={true}
            />

            <Input
              style={styles.input}
              label="Email"
              placeholder="Email anda ..."
              keyboardType={"email-address"}
            />

            <Input
              style={styles.input}
              label="Nomor HP"
              placeholder="Nomor hp anda ..."
              keyboardType={"phone-pad"}
            />

            <Checkbox
              style={styles.terms}
              onPress={this.toggleCheckbox}
              checked={this.state.checkbox}
              clickableChildren={false}>
              <Content style={styles.termsContent}>
                Saya telah membaca dan setuju dengan{"\n"}
                <Text
                  style={styles.termsLink}
                  onPress={() => {
                    Linking.openURL("http://www.example.com/")
                  }}>
                  Syarat dan Ketentuan
                </Text>{" "}
                yang berlaku
              </Content>
            </Checkbox>

            <Button
              style={styles.button}
              text="Daftar"
              type="primary"
              size="large"
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
  input: {
    marginTop: 26,
  },
  button: {
    marginTop: 40,
  },
  terms: {
    marginTop: 20,
  },
  termsContent: {
    fontSize: FontSizes.small,
  },
  termsLink: {
    textDecorationLine: "underline",
    color: Colors.brandPrimary,
  },
})

export default User
