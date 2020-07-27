import React, { Component, useState } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  Linking,
  Text,
  Alert,
} from "react-native"
import { Button, Input, Checkbox, Content, Infobox } from "_atoms"
import { Spaces, Colors, FontSizes } from "_styles"
import { validation, hexToRgb, navigationServices } from "_utils"
import axios from "axios"

const User = () => {
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({
    fullname: "",
    fullnameWarning: "",
    password: "",
    passwordWarning: "",
    confirmPassword: "",
    confirmPasswordWarning: "",
    email: "",
    emailWarning: "",
    phoneNumber: "",
    phoneNumberWarning: "",
    checkbox: false,
    checkboxWarning: false,
  })

  const onClickCheckbox = () => {
    const newCheckbox = !state.checkbox

    setState({
      ...state,
      checkbox: newCheckbox,
      checkboxWarning: !newCheckbox,
    })
  }

  const checkFullname = (str = state.fullname) => {
    return validation.validate("general", str)
  }

  const checkPassword = (str = state.password) => {
    return validation.validate("password", str)
  }

  const checkConfirmPassword = (
    str = state.confirmPassword,
    strCompare = state.password,
  ) => {
    const isEqualPassword = strCompare == str
    const errorEquality = "Password konfirmasi tidak sama"
    const errorGeneralValidation = validation.validate("general", str)

    if (errorGeneralValidation) return errorGeneralValidation
    if (!isEqualPassword) return errorEquality

    return null
  }

  const checkEmail = (str = state.email) => {
    return validation.validate("email", str)
  }

  const checkPhoneNumber = (str = state.phoneNumber) => {
    return validation.validate("phoneNumber", str)
  }

  const onSuccess = () => {
    setLoading(false)

    setState({
      ...state,
      fullnameWarning: "",
      passwordWarning: "",
      confirmPasswordWarning: "",
      emailWarning: "",
      phoneNumberWarning: "",
    })

    Alert.alert("Success", "Registrasi anda berhasil! Silahkan login", [
      {
        text: "Oke",
        onPress: () => {
          navigationServices.Navigate("Login")
        },
      },
    ])
  }

  const onError = (message = "Terjadi kesalahan, silahkan coba kembali!") => {
    setLoading(false)

    Alert.alert("Error", message, [{ text: "Oke" }])
  }

  const onSubmit = () => {
    const errorFullname = checkFullname()
    const errorPassword = checkPassword()
    const errorConfirmPassword = checkConfirmPassword()
    const errorEmail = checkEmail()
    const errorPhoneNumber = checkPhoneNumber()

    if (
      errorFullname ||
      errorPassword ||
      errorConfirmPassword ||
      errorEmail ||
      errorPhoneNumber
    ) {
      setState({
        ...state,
        fullnameWarning: errorFullname,
        passwordWarning: errorPassword,
        confirmPasswordWarning: errorConfirmPassword,
        emailWarning: errorEmail,
        phoneNumberWarning: errorPhoneNumber,
      })
      return false
    }

    if (!state.checkbox) {
      setState({
        ...state,
        checkboxWarning: true,
      })
      return false
    }

    setLoading(true)

    axios
      .post(`users/register`, {
        fullname: state.fullname,
        password: state.password,
        email: state.email,
        phoneNumber: state.phoneNumber,
      })
      .then(response => {
        const data = response.data
        console.log("response:", data)
        onSuccess()
      })
      .catch(error => {
        if (error?.response?.data?.message) {
          if (
            error.response.data.message == "User with this email already exist."
          ) {
            onError("Email ini sudah terdaftar, silahkan login")
          } else {
            onError(error.response.data.message)
          }
        } else {
          onError()
        }
      })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Input
            label="Nama Lengkap"
            placeholder="Nama lengkap anda ..."
            warning={state.fullnameWarning}
            status={state.fullnameWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkFullname(text)
              setState({
                ...state,
                fullname: text,
                fullnameWarning: warning,
              })
            }}
          />

          <Input
            style={styles.input}
            label="Kata Sandi"
            placeholder="Masukkan kata sandi anda ..."
            secureTextEntry={true}
            warning={state.passwordWarning}
            status={state.passwordWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkPassword(text)
              const confirmWarning = checkConfirmPassword(
                state.confirmPassword,
                text,
              )
              setState({
                ...state,
                password: text,
                passwordWarning: warning,
                confirmPasswordWarning: confirmWarning,
              })
            }}
          />

          <Input
            style={styles.input}
            label="Konfirmasi Kata Sandi"
            placeholder="Masukkan kembali kata sandi anda ..."
            secureTextEntry={true}
            warning={state.confirmPasswordWarning}
            status={state.confirmPasswordWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkConfirmPassword(text)
              setState({
                ...state,
                confirmPassword: text,
                confirmPasswordWarning: warning,
              })
            }}
          />

          <Input
            style={styles.input}
            label="Email"
            placeholder="Email anda ..."
            keyboardType={"email-address"}
            warning={state.emailWarning}
            status={state.emailWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkEmail(text)
              setState({
                ...state,
                email: text,
                emailWarning: warning,
              })
            }}
          />

          <Input
            style={styles.input}
            label="Nomor HP"
            placeholder="Nomor hp anda ..."
            keyboardType={"phone-pad"}
            warning={state.phoneNumberWarning}
            status={state.phoneNumberWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkPhoneNumber(text)
              setState({
                ...state,
                phoneNumber: text,
                phoneNumberWarning: warning,
              })
            }}
          />

          <Checkbox
            style={styles.terms}
            onPress={onClickCheckbox}
            checked={state.checkbox}
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

          {state.checkboxWarning && (
            <Infobox style={styles.infobox} textStyle={styles.infoboxText}>
              Anda harus menyetujui kolom ini terlebih dahulu
            </Infobox>
          )}

          <Button
            style={styles.button}
            text="Daftar"
            type="primary"
            size="large"
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
  infobox: {
    marginTop: 10,
    backgroundColor: hexToRgb(Colors.themeDanger, 0.1),
  },
  infoboxText: {
    fontSize: FontSizes.small,
    color: Colors.themeDanger,
  },
})

export default User
