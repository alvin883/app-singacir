import React, { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import PropTypes from "prop-types"
import { Avatar, Button, Input } from "_atoms"
import { sample, navigationServices } from "_utils"
import { Spaces, Colors } from "_styles"
import { IconName } from "_c_a_icons"
import ImagePicker from "react-native-image-picker"
import { useSelector } from "react-redux"
import axios from "axios"
import { useRef } from "react"

const Edit = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.data)
  const [isChanging, setChanging] = useState(false)
  const authState = useSelector(state => state.authReducer)
  const refName = useRef()
  const refEmail = useRef()
  const refPhoneNumber = useRef()

  const ImagePickerOptions = {
    title: "Pilih foto",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  }

  const onClickChangeAvatar = () => {
    let image, error

    ImagePicker.showImagePicker(ImagePickerOptions, res => {
      if (res.didCancel) {
        console.log("Picker - Cancel")
      } else if (res.error) {
        if (res.error === "Permissions weren't granted") {
          // TODO: Make a brute test for this one
          permission
            .camera()
            .then(() => handleClick())
            .catch(permissionRes => {
              if (permissionRes.denied) {
                error = "Permission Denied"
                console.log("we couldn't work without this permission")
                // return {error: error}
              }
            })
        }
      } else if (res.customButton) {
        console.log("Picker - Custom Button: ", res.customButton)
      } else {
        image = { uri: res.uri }

        return setData({
          ...data,
          image: image,
        })
      }
    })
  }

  const onClickChangePass = () => navigationServices.Navigate("ProfileEditPass")
  const onClickCancel = () => {
    if (isChanging) return false
    navigationServices.GoBack()
  }
  const onClickSubmit = () => {
    const name = refName.current.state.text
    const email = refEmail.current.state.text
    const phoneNumber = refPhoneNumber.current.state.text

    if (isChanging) return false
    setChanging(true)

    axios
      .put(`users/update-profile?userId=${authState.userId}`, {
        fullname: name,
        // TODO: email support in API
        // email: email,
        phoneNumber: phoneNumber,
      })
      .then(response => {
        const data = response.data.data
        console.log("response:", data)

        Alert.alert("Success", "Profil anda telah berhasil diubah! ", [
          {
            text: "Oke",
            onPress: () => {
              navigationServices.Navigate("ProfileLanding")
            },
          },
        ])
      })
      .catch(error => {
        const data = error.response.data
        Alert.alert("Error", "Terjadi kesalahan, silahkan coba kembali!", [
          { text: "Oke" },
        ])
      })
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Avatar
            style={styles.avatar}
            imageStyle={styles.avatar}
            source={data.image}
            name={data.name}
          />
          <Button
            style={styles.changeAvatar}
            text={data.image ? "Ubah Foto" : "Tambah Foto"}
            type="secondary"
            onPress={onClickChangeAvatar}
          />
        </View>

        <View style={styles.form}>
          <Input
            ref={refName}
            style={{ ...styles.input, marginTop: 0 }}
            label="Nama Lengkap"
            placeholder="Nama lengkap anda ..."
            defaultValue={data.name}
          />

          <Input
            ref={refEmail}
            style={styles.input}
            label="Email"
            placeholder="Email anda ..."
            keyboardType="email-address"
            defaultValue={data.email}
          />

          <Input
            ref={refPhoneNumber}
            style={styles.input}
            label="Nomor HP"
            placeholder="Nomor HP anda ..."
            keyboardType="phone-pad"
            defaultValue={data.phoneNumber}
          />

          <Button
            style={styles.changePass}
            text="Ubah kata sandi"
            type="secondary"
            iconName={IconName.chevronRight}
            iconPosition="right"
            onPress={onClickChangePass}
          />
        </View>

        <View style={styles.action}>
          <Button
            style={styles.actionButton}
            text="Batal"
            type="secondary"
            size="large"
            onPress={onClickCancel}
          />
          <Button
            style={styles.actionButton}
            text="Simpan"
            size="large"
            onPress={onClickSubmit}
            state={isChanging ? "loading" : "default"}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    marginBottom: 40,
    marginHorizontal: Spaces.container,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 80,
    width: 80,
    backgroundColor: Colors.brandPrimary,
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

export default Edit
