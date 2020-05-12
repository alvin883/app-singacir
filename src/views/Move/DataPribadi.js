import PropTypes from "prop-types"
import React, { Component } from "react"
import { Dimensions, StyleSheet } from "react-native"
import ImagePicker from "react-native-image-picker"
import { Button, Heading, Input, InputPhoto, InputSelect } from "_atoms"
import { FontSizes, Spaces } from "_styles"
import { permission } from "_utils"

/**
 * @augments {Component<First.propTypes, {}>}
 */
class DataPribadi extends Component {
  static propTypes = {
    onNext: PropTypes.func,
  }

  static defaultProps = {
    onNext: () => {},
  }

  state = {
    valueID: "ktp",
    indexID: 0,
    optionsID: [
      { label: "KTP", value: "ktp" },
      { label: "SIM", value: "sim" },
      { label: "Passport", value: "passport" },
    ],
    valuePhoto: null,
  }

  onSelectID = (val, index) => {
    console.log("index is: ", index)
    this.setState({
      valueID: val,
      // Somehow it will give you `realIndex + 1`
      // version <=6.6.0
      indexID: index - 1,
    })
  }

  selectPhoto = image => {
    this.setState({ valuePhoto: image })
  }

  clickNext = () => {
    this.props.onNext()
    console.log("click next")
  }

  render() {
    const { valueID, indexID, optionsID, valuePhoto } = this.state

    return (
      <>
        <Heading text="Data Pribadi" size="3" style={styles.heading} />

        <Input
          style={{ ...styles.input, marginTop: 20 }}
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap anda ..."
        />

        <Input
          style={styles.input}
          label="Nomer Telepon"
          placeholder="Nomer telepon pemilik ..."
          keyboardType="phone-pad"
        />

        <Input
          style={styles.input}
          label="Email"
          placeholder="Email pemilik ..."
          keyboardType="email-address"
        />

        <InputSelect
          style={styles.selectWrapper}
          label="Jenis Identitas"
          placeholder="Jenis identitas yang akan di upload ..."
          options={optionsID}
          onSelect={this.onSelectID}
          value={valueID}
        />

        <Input
          style={styles.input}
          label="Nomer Identitas Pemilik"
          placeholder="Nomor identitas pemilik ..."
        />

        <InputPhoto
          style={styles.input}
          labelText={`Upload ${optionsID[indexID].label}`}
          buttonText="Pilih Foto"
          buttonTextActive="Ganti Foto"
          source={valuePhoto}
          onSelectPhoto={this.selectPhoto}
        />

        <Button
          style={styles.button}
          text="Selanjutnya"
          type="primary"
          size="large"
          onPress={this.clickNext}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: FontSizes.normal,
    marginTop: 40,
  },
  picker: {
    height: 40,
    width: Dimensions.get("window").width - Spaces.container * 2,
  },
  input: {
    marginTop: 26,
  },
  button: {
    marginTop: 40,
  },
  selectWrapper: {
    marginTop: 26,
  },
})

export default DataPribadi
