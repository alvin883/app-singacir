import React, { Component, useRef, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { Button, Input } from "_atoms"
import { Spaces, Colors, FontFamily } from "_styles"
import { LogoGoogle, LogoFacebook } from "_c_a_icons"
import logo from "_assets/images/logo.png"
import AsyncStorage from "@react-native-community/async-storage"
import { auth } from "_actions"
import { useDispatch } from "react-redux"
import { navigationServices, hexToRgb, validation } from "_utils"

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [errorState, setErrorState] = useState({ email: null, password: null })

  const clickLogin = () => {
    const email = emailRef.current.state.text
    const password = passwordRef.current.state.text

    // Validation
    const vEmail = validation.validate("email", email)
    const vPassword = validation.validate("loginPassword", password)

    // If everything doen't have an error, then it's all valid => true
    const isValid = !vEmail && !vPassword

    setIsLoading(true)

    if (!isValid) {
      setErrorState({ email: vEmail, password: vPassword })
      return setIsLoading(false)
    }

    if (email === "user@example.com" && password === "pw12345") {
      const user = {
        token: "alvin123",
        username: "User",
      }

      AsyncStorage.setItem("user", JSON.stringify(user))
        .then(() => dispatch(auth.login(user)))
        .catch(err => {
          console.log(err)
          setIsLoading(false)
          alert("Ada kesalahan ketika login, cobalah beberapa saat lagi")
        })
    } else {
      setIsLoading(false)
    }
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={logo} style={styles.logo} />
          <Input
            label="Email"
            placeholder="Email anda ..."
            ref={emailRef}
            editable={!isLoading}
            warning={errorState.email}
            status={errorState.email ? "error" : "normal"}
          />
          <Input
            label="Kata Sandi"
            placeholder="Password anda ..."
            secureTextEntry={true}
            style={styles.input}
            ref={passwordRef}
            editable={!isLoading}
            warning={errorState.password}
            status={errorState.password ? "error" : "normal"}
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
