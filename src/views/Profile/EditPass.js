import React, { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import PropTypes from "prop-types"
import { Avatar, Button, Input, Text, Content } from "_atoms"
import { sample, navigationServices, validation } from "_utils"
import { Spaces } from "_styles"
import { IconName } from "_c_a_icons"
import axios from "axios"
import { auth } from "_actions"
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"

const EditPass = () => {
  /**
   * State management
   */
  const [state, setState] = useState({
    isChanging: false,
    password: "",
    passwordWarning: "",
    newPassword: "",
    newPasswordWarning: "",
    confirmPassword: "",
    confirmPasswordWarning: "",
  })
  const authState = useSelector(state => state.authReducer)
  const dispatch = useDispatch()

  /**
   * Submit button visual state
   */
  const buttonState = state.isChanging ? "loading" : "default"

  const checkPassword = (str = state.password) => {
    return validation.validate("general", str)
  }

  const checkNewPassword = (str = state.newPassword) => {
    return validation.validate("password", str)
  }

  const checkConfirmationPassword = (
    str = state.confirmPassword,
    strCompare = state.newPassword,
  ) => {
    const isEqualNewPassword = strCompare === str
    const errorEquality = "Password konfirmasi tidak sama"
    const errorGeneralValidation = validation.validate("general", str)

    if (errorGeneralValidation) return errorGeneralValidation
    if (!isEqualNewPassword) return errorEquality

    return null
  }

  const onSuccess = () => {
    setState({
      ...state,
      isChanging: false,
    })

    Alert.alert(
      "Success",
      "Password anda telah berhasil diubah! Silahkan login kembali",
      [
        {
          text: "Oke",
          onPress: () => {
            AsyncStorage.removeItem("user")
              .then(() => dispatch(auth.logout(null)))
              .catch(err => {
                setState({ ...state, isChanging: true })
                console.log(err)
                alert(
                  "Terjadi kesalahan saat logout, silahkan logout secara manual",
                )
              })
            // navigationServices.Navigate("ProfileLanding")
          },
        },
      ],
    )
  }

  const onError = (message = "Terjadi kesalahan, silahkan coba kembali!") => {
    setState({
      ...state,
      isChanging: false,
    })

    Alert.alert("Error", message, [{ text: "Oke" }])
  }

  const onCancel = () => navigationServices.GoBack()

  const onSubmit = () => {
    const errorPassword = checkPassword()
    const errorNewPassword = checkNewPassword()
    const errorConfirmPassword = checkConfirmationPassword()

    if (errorPassword || errorNewPassword || errorConfirmPassword) {
      setState({
        ...state,
        passwordWarning: errorPassword,
        newPasswordWarning: errorNewPassword,
        confirmPasswordWarning: errorConfirmPassword,
      })
      return false
    }

    setState({
      ...state,
      passwordWarning: "",
      newPasswordWarning: "",
      confirmPasswordWarning: "",
      isChanging: true,
    })

    axios
      .put(`users/edit-password?userId=${authState.userId}`, {
        password: state.newPassword,
      })
      .then(response => {
        const data = response.data
        console.log("response:", data)
        onSuccess()
      })
      .catch(error => {
        const data = error.response.data
        console.log("response:", data)
        onError(data.message)
      })
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            posuere placerat lorem, in molestie odio vehicula.
          </Content>
        </View>

        <View style={styles.form}>
          <Input
            style={{ ...styles.input, marginTop: 0 }}
            label="Kata Sandi"
            placeholder="Masukkan Kata Sandi lama ..."
            warning={state.passwordWarning}
            status={state.passwordWarning ? "error" : "normal"}
            secureTextEntry={true}
            onChangeText={text => {
              const warning = checkPassword(text)
              setState({
                ...state,
                password: text,
                passwordWarning: warning,
              })
            }}
          />

          <Input
            style={styles.input}
            label="Kata Sandi Baru"
            placeholder="Kata Sandi baru anda ..."
            warning={state.newPasswordWarning}
            status={state.newPasswordWarning ? "error" : "normal"}
            secureTextEntry={true}
            onChangeText={text => {
              const warning = checkNewPassword(text)
              const confirmWarning = checkConfirmationPassword(
                state.confirmPassword,
                text,
              )
              setState({
                ...state,
                newPassword: text,
                newPasswordWarning: warning,
                confirmPasswordWarning: confirmWarning,
              })
            }}
          />

          <Input
            style={styles.input}
            label="Konfirmasi Kata Sandi Baru"
            placeholder="Kata Sandi baru anda ..."
            warning={state.confirmPasswordWarning}
            status={state.confirmPasswordWarning ? "error" : "normal"}
            secureTextEntry={true}
            onChangeText={text => {
              const warning = checkConfirmationPassword(text)
              setState({
                ...state,
                confirmPassword: text,
                confirmPasswordWarning: warning,
              })
            }}
          />
        </View>

        <View style={styles.action}>
          <Button
            style={styles.actionButton}
            type="secondary"
            text="Batal"
            size="large"
            onPress={onCancel}
          />
          <Button
            style={styles.actionButton}
            text="Simpan"
            size="large"
            onPress={onSubmit}
            state={buttonState}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 40,
    marginHorizontal: Spaces.container,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 80,
    width: 80,
  },
  changeAvatar: {
    alignSelf: "auto",
    marginTop: 14,
  },
  form: {
    marginTop: 30,
  },
  input: {
    marginTop: 26,
  },
  changePass: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  action: {
    marginTop: 40,
    marginHorizontal: -4,
    flexDirection: "row",
  },
  actionButton: {
    flex: 0.5,
    marginHorizontal: 4,
  },
})

export default EditPass
