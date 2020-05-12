import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView, BackHandler } from "react-native"
import PropTypes from "prop-types"
import DataPribadi from "./DataPribadi"
import DataUsaha from "./DataUsaha"
import { Spaces } from "_styles"
import { Stepper } from "_atoms"

class DaftarStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      steps: [
        <DataUsaha onNext={this.onNext} />,
        <DataPribadi onNext={this.onNext} />,
        <DataUsaha onNext={this.onNext} />,
      ],
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackpress,
    )
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackpress = () => {
    const { current } = this.state

    if (current > 0) {
      // Back one step
      this.setState(prevState => ({ current: prevState.current - 1 }))
    } else {
      // Back to previous screen
      this.props.navigation.goBack()
    }

    // You need to return true
    // in order to prevent back button
    return true
  }

  onNext = () => {
    console.log("click")
    this.setState(prevState => ({
      current: prevState.current + 1,
    }))
  }

  render() {
    const { current, steps } = this.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <Stepper total={steps.length} current={current + 1} />
          </View>
          <View style={styles.bottom}>{steps[current]}</View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spaces.container,
  },
  top: {
    marginTop: 20,
  },
  bottom: {
    marginBottom: 40,
  },
})

export default DaftarStep
