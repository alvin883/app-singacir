import React, { Component, useRef, useState, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native"
import { Button, Input } from "_atoms"
import { Spaces, Colors, FontFamily } from "_styles"
import { LogoGoogle, LogoFacebook } from "_c_a_icons"
import logo from "_assets/images/logo.png"
import AsyncStorage from "@react-native-community/async-storage"
import { auth } from "_actions"
import { useDispatch } from "react-redux"
import { navigationServices, hexToRgb, validation } from "_utils"
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
import JwtDecode from "jwt-decode"

const Login = () => {
  const refEmail = useRef()
  const refPassword = useRef()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState({
    email: "",
    emailWarning: "",
    password: "",
    passwordWarning: "",
  })

  const checkEmail = (str = state.email) => {
    return validation.validate("email", str)
  }

  const checkPassword = (str = state.password) => {
    return validation.validate("loginPassword", str)
  }

  const clickLogin = () => {
    const errorEmail = checkEmail()
    const errorPassword = checkPassword()

    if (errorEmail || errorPassword) {
      setState({
        ...state,
        emailWarning: errorEmail,
        passwordWarning: errorPassword,
      })
      return false
    }

    setLoading(true)
    setState({
      ...state,
      emailWarning: "",
      passwordWarning: "",
    })

    axios
      .post("auth/loginUser", {
        email: state.email,
        password: state.password,
      })
      .then(response => {
        const token = response.data.data
        const data = JwtDecode(token)
        data.token = token

        // console.log("response: ", response)
        console.log("token: ", response.data.data)

        AsyncStorage.setItem("token", token)
          .then(() => {
            axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
            dispatch(auth.login(data))
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
            alert("Ada kesalahan ketika login, cobalah beberapa saat lagi")
          })
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        if (error?.response?.data?.message) {
          if (error.response.data.message == "User password is invalid") {
            return alert("User atau password anda salah")
          } else if (typeof error.response.data.message == "string") {
            return alert(error.response.data.message)
          } else if (error.response.data.message === "User email not found") {
            return alert("Email tidak terdaftar")
          } else {
            return alert(error.response.data.message)
          }
        }

        alert("Ada kesalahan ketika login, cobalah beberapa saat lagi")
      })
  }

  const clickGoogle = () => {
    if (isLoading) return false
    console.log("Google Login")
  }

  const clickFacebook = () => {
    if (isLoading) return false
    console.log("Facebook Login")
  }

  const clickSignup = () => {
    if (isLoading) return false
    navigationServices.Navigate("DaftarLanding")
  }

  const clickForgot = () => {
    if (isLoading) return false
    navigationServices.Navigate("LupaPasswordLanding")
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.themeLight)
      StatusBar.setBarStyle("dark-content")
    }, []),
  )

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={logo} style={styles.logo} />
          <Input
            label="Email"
            placeholder="Email anda ..."
            ref={refEmail}
            editable={!isLoading}
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
            label="Kata Sandi"
            placeholder="Password anda ..."
            secureTextEntry={true}
            style={styles.input}
            ref={refPassword}
            editable={!isLoading}
            warning={state.passwordWarning}
            status={state.passwordWarning ? "error" : "normal"}
            onChangeText={text => {
              const warning = checkPassword(text)
              setState({
                ...state,
                password: text,
                passwordWarning: warning,
              })
            }}
          />
          <Button
            style={styles.button}
            type="primary"
            size="large"
            text="Login"
            onPress={clickLogin}
            state={isLoading ? "loading" : "default"}
          />
          <Button
            style={styles.buttonForgot}
            type="secondary"
            size="normal"
            text="Lupa password?"
            onPress={clickForgot}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomTitle}>Atau masuk dengan</Text>
          <View style={styles.options}>
            <Button
              style={styles.optionsButton}
              shape="circle"
              IconSVG={LogoGoogle}
              baseColor={Colors.themeLight}
              onPress={clickGoogle}
            />
            <Button
              style={styles.optionsButton}
              shape="circle"
              IconSVG={LogoFacebook}
              baseColor={Colors.themeLight}
              onPress={clickFacebook}
            />
          </View>
          <View style={styles.signup}>
            <Text>Belum punya akun?</Text>
            <Button
              style={styles.signupButton}
              type="nude"
              size="normal"
              text="Daftar Sekarang"
              onPress={clickSignup}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  top: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: Spaces.container,
    backgroundColor: Colors.themeLight,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    marginTop: 26,
  },
  button: {
    marginTop: 40,
  },
  buttonForgot: {
    marginTop: 10,
    alignSelf: "center",
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
  signup: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupButton: {
    marginLeft: 10,
  },
})

export default Login

// class Login extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       email: "",
//       password: "",
//     }
//   }

//   _email = text => {
//     this.setState({ email: text })
//   }

//   _password = text => {
//     this.setState({ password: text })
//   }

//   _login = user => useDispatch(auth.login(user))

//   _submit = () => {
//     if (this.state.email === "alvin") {
//       const user = {
//         token: "123asd",
//         username: "Alvin Novian",
//       }

//       console.log("logging in ...")

//       AsyncStorage.setItem("user", JSON.stringify(user))
//         .then(user => {
//           this._login(user)
//         })
//         .catch(err => {
//           alert("Ada kesalahan ketika login, cobalah beberapa saat lagi")
//           console.log(err)
//         })
//     }
//   }

//   clickSignup = () => {
//     this.props.navigation.navigate("DaftarLanding")
//   }

//   clickForgot = () => {
//     this.props.navigation.navigate("LupaPasswordLanding")
//   }

//   render() {
//   }
// }

// export default Login
