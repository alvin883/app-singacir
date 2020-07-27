import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import PropTypes from "prop-types"
import { Heading, Content, Button, Input } from "_atoms"
import { Spaces } from "_styles"
import { useState } from "react"
import { validation } from "_utils"
import axios from "axios"

const Reset = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({
    password: "",
    passwordWarning: "",
    passwordConfirm: "",
    passwordConfirmWarning: "",
  })

  const checkPassword = (str = state.password) => {
    return validation.validate("password", str)
  }

  const checkPasswordConfirm = (
    str = state.passwordConfirm,
    strCompare = state.password,
  ) => {
    const isEqualNewPassword = strCompare === str
    const errorEquality = "Password konfirmasi tidak sama"
    const errorGeneralValidation = validation.validate("general", str)

    if (errorGeneralValidation) return errorGeneralValidation
    if (!isEqualNewPassword) return errorEquality

    return null
  }

  const onSubmit = () => {
    const errorPassword = checkPassword()
    const errorPasswordConfirm = checkPasswordConfirm()

    if (errorPassword || errorPasswordConfirm) {
      setState({
        passwordWarning: errorPassword,
        passwordConfirmWarning: errorPasswordConfirm,
      })
      return false
    }

    setLoading(true)
    console.log("reset-token:", route.params.token)

    axios
      .post("auth/reset", {
        token: route.params?.token,
        password: state.password,
        confirmation: state.passwordConfirm,
      })
      .then(response => {
        setLoading(false)
        Alert.alert(
          "Berhasil",
          "Password anda berhasil di reset, silahkan login",
          [
            {
              text: "Oke",
              onPress: () => {
                // Back to the very first
                navigation.popToTop()
              },
            },
          ],
        )
      })
      .catch(error => {
        setLoading(false)
        if (error.response.data?.message) {
          Alert.alert("Gagal", error.response.data.message)
        } else {
          Alert.alert("Error", "Terjadi kesalahan, silahkan coba kembali")
        }
      })
  }

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
            warning={state.passwordWarning}
            status={state.passwordWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkPassword(text)
              const confirmWarning = checkPasswordConfirm(
                state.passwordConfirm,
                text,
              )
              setState({
                ...state,
                password: text,
                passwordWarning: warning,
                passwordConfirmWarning: confirmWarning,
              })
            }}
          />

          <Input
            style={styles.input}
            label="Konfirmasi Kata Sandi"
            placeholder="Masukkan kembali kata sandi baru ..."
            secureTextEntry={true}
            warning={state.passwordConfirmWarning}
            status={state.passwordConfirmWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkPasswordConfirm(text)
              setState({
                ...state,
                passwordConfirm: text,
                passwordConfirmWarning: warning,
              })
            }}
          />

          <Button
            style={styles.button}
            type="primary"
            size="large"
            text="Reset"
            state={isLoading ? "loading" : "default"}
            onPress={onSubmit}
          />
        </View>
      </View>
    </ScrollView>
  )
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
