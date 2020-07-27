import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import PropTypes from "prop-types"
import { Heading, Content, Button, Input } from "_atoms"
import { Spaces } from "_styles"
import axios from "axios"
import { useState } from "react"
import { navigationServices, validation } from "_utils"

const Landing = () => {
  const [state, setState] = useState({ email: "", emailWarning: "" })
  const [isLoading, setLoading] = useState(false)

  const checkEmail = (str = state.email) => {
    return validation.validate("email", str)
  }

  const onSubmit = () => {
    const errorEmail = checkEmail()

    if (errorEmail) {
      setState({
        ...state,
        emailWarning: errorEmail,
      })
      return false
    }

    setLoading(true)
    axios
      .post("auth/forget", {
        email: state.email,
      })
      .then(response => {
        const data = response.data.data
        Alert.alert(
          "Berhasil",
          "Link dikirim ke email, silahkan dibuka untuk melanjutkan reset password",
          [{ text: "Oke" }],
        )
        setLoading(false)
        setState({
          ...state,
          email: "",
          emailWarning: "",
        })
      })
      .catch(error => {
        setLoading(false)
        if (error.response?.data?.message) {
          Alert.alert("Gagal", error.response.data.message)
        } else {
          Alert.alert("Error", "Terjadi kesalahan, silahkan coba lagi")
        }
      })
  }

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
            defaultValue={state.email}
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

          <Button
            style={styles.button}
            type="primary"
            size="large"
            text="Selanjutnya"
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
    marginTop: 30,
  },
  button: {
    marginTop: 40,
  },
})

export default Landing
