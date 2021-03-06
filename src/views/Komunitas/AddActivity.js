import React, { Component, useState } from "react"
import { View, StyleSheet, ScrollView, YellowBox } from "react-native"
import PropTypes from "prop-types"
import { Spaces } from "_styles"
import { Input, InputPhoto, Button } from "_atoms"

const AddActivity = ({ navigation, route }) => {
  /**
   * If `name` nor `image` is provided, mean it is editing particular
   * activities from activities state in Create.js
   */
  const { params } = route
  const isEditing = params.data
  const initName = isEditing ? params.data.name : ""
  const initPhoto = isEditing ? params.data.image : null
  const buttonText = isEditing ? "Simpan" : "Tambah"

  /**
   * State management
   */
  const [name, setName] = useState(initName)
  const [photo, setPhoto] = useState(initPhoto)
  const isValid = name.length > 0 && photo

  /**
   * This is to hide the warning message from react-navigation. Why they give
   * an error message? because we receive a function (onSubmit) via navigate
   * params, which is not safe at all, but in our case it's safe. If you change
   * the params, you should be careful!
   *
   * @link https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
   */
  YellowBox.ignoreWarnings([
    "Non-serializable values were found in the navigation state",
  ])

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Input
          label="Nama"
          placeholder="Nama kegiatan ..."
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
        <InputPhoto
          style={styles.photo}
          labelText="Foto Kegiatan"
          buttonText="Pilih Foto"
          buttonTextActive="Ganti Foto"
          source={photo}
          onSelectPhoto={image => {
            setPhoto(image)
          }}
        />
        <Button
          style={styles.submit}
          state={isValid ? "default" : "disabled"}
          text={buttonText}
          size="large"
          onPress={() => {
            const { onSubmit, editIndex } = route.params
            onSubmit(editIndex, { name: name, image: photo })
            navigation.goBack()
          }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spaces.container,
    marginVertical: 40,
  },
  photo: {
    marginTop: 26,
  },
  submit: {
    marginTop: 40,
  },
})

// const mapStateToProps = (state, ownProps) => {
//   return {
//     ...ownProps,
//     onAddActivity: state.komunitasReducer.onAddActivity,
//   }
// }

// export default connect(mapStateToProps)(AddActivity)
export default AddActivity
