import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import Address from "./Address"
import { Spaces, FontFamily, Colors, FontSizes } from "_styles"
import { Divider, Heading, Price, Input, InputSelect, Button } from "_atoms"
import OrderItems from "./OrderItems"
import { connect } from "react-redux"
import { convertToCurrency, convertToNumber, navigationServices } from "_utils"
import { warung } from "_actions"
import {
  orderMethodOptions,
  orderMethodOptionsRaw,
  paymentOptions,
  paymentOptionsRaw,
} from "_types"

const MINIMUM_TIPS = 2000
const WARNING_TIPS = "Minimum tips adalah Rp 2.000"
class Checkout extends Component {
  state = {
    address: "Jl. Gatot Subroto, Jakarta",
    tips: "2.000",
    isTipsWarning: false,
    orderMethod: orderMethodOptionsRaw.diantar.value,
    paymentMethod: paymentOptionsRaw.tunai.value,
  }

  handleChangeTips = text => {
    const allNumbers = convertToNumber(text)

    if (allNumbers < 1) {
      /**
       * When user hasn't filled the field yet, instead of showing zero we just
       * leave the field blank and show the placeholder
       */
      return this.setState({
        tips: "",
        isTipsWarning: true,
      })
    }

    const amount = parseInt(allNumbers)
    const currency = convertToCurrency(amount)
    let isTipsWarning = false

    if (amount < MINIMUM_TIPS) {
      isTipsWarning = true
    }

    this.setState({
      tips: currency.toString(),
      isTipsWarning: isTipsWarning,
    })
  }

  handleInputSelect = (selected, stateName) => {
    console.log("handleInput  Select: ", selected, stateName)
    this.setState({
      [stateName]: selected,
    })
  }

  onSubmit = () => {
    const { setTips } = this.props
    const tips = convertToNumber(this.state.tips)

    setTips({ tips: tips })
    navigationServices.Navigate("success", { title: "Test aja" })
  }

  render() {
    const { summary } = this.props
    const { price, discount_price } = summary
    const { isTipsWarning, tips, orderMethod } = this.state
    const isDiscount = discount_price
    const totalDiscount = isDiscount ? price - discount_price : 0
    const total = discount_price + convertToNumber(tips)

    // TODO: Make this dynamic
    const adminFee = 5000
    const isSelfOrder = orderMethod === orderMethodOptionsRaw.ambilsendiri.value

    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.wrapperInner}>
          <Address address={this.state.address} style={styles.address} />

          <Divider />

          <OrderItems />

          <Divider />

          <View style={{ ...styles.info, marginTop: 0 }}>
            <Text style={styles.infoKey}>Subtotal</Text>
            <Text style={styles.infoValue}>
              {convertToCurrency(summary.price)}
            </Text>
          </View>

          {totalDiscount > 0 && (
            <View style={styles.info}>
              <Text style={styles.infoKey}>Discount</Text>
              <Text style={styles.infoValue}>
                - {convertToCurrency(totalDiscount)}
              </Text>
            </View>
          )}

          {!isSelfOrder ? (
            <View style={styles.info}>
              <Text style={styles.infoKey}>Biaya Transaksi</Text>
              <Text style={styles.infoValue}>
                {convertToCurrency(adminFee)}
              </Text>
            </View>
          ) : null}

          <Divider />

          <View style={styles.tips}>
            {!isSelfOrder ? (
              <Input
                style={styles.inputTips}
                label="Beri Tips"
                placeholder="Masukkan jumlah tips ..."
                keyboardType="number-pad"
                defaultValue="2000"
                onChangeText={this.handleChangeTips}
                value={this.state.tips}
                warning={isTipsWarning ? WARNING_TIPS : null}
                status={isTipsWarning ? "error" : "normal"}
              />
            ) : null}

            <InputSelect
              name="orderMethod"
              options={orderMethodOptions}
              label="Pengambilan"
              value={this.state.orderMethod}
              placeholder="Pilih metode pengambilan ..."
              onSelect={selected =>
                this.handleInputSelect(selected, "orderMethod")
              }
            />
          </View>

          <Divider />

          <View style={styles.info}>
            <Text style={{ ...styles.infoKey, ...styles.totalKey }}>Total</Text>
            <Text style={{ ...styles.infoValue, ...styles.totalValue }}>
              {convertToCurrency(total)}
            </Text>
          </View>

          <View style={styles.bottom}>
            <InputSelect
              options={paymentOptions}
              label="Metode Pembayaran"
              placeholder="Pilih jenis pembayaran ..."
              value={this.state.paymentMethod}
              onSelect={selected =>
                this.handleInputSelect(selected, "paymentMethod")
              }
            />

            <Button
              style={styles.submitButton}
              text="Pesan"
              type="primary"
              size="large"
              onPress={this.onSubmit}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   paddingHorizontal: Spaces.container,
  // },
  wrapperInner: {
    paddingBottom: 40,
  },
  address: {
    paddingHorizontal: Spaces.container,
  },
  info: {
    marginTop: 10,
    marginHorizontal: Spaces.container,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoKey: {
    fontFamily: FontFamily.normal,
  },
  infoValue: {
    fontFamily: FontFamily.bold,
  },
  tips: {
    paddingHorizontal: Spaces.container,
  },
  inputTips: {
    marginBottom: 26,
  },
  totalKey: {
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.bold,
  },
  totalValue: {
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.bold,
    color: Colors.brandPrimary,
  },
  bottom: {
    marginTop: 20,
    paddingHorizontal: Spaces.container,
  },
  submitButton: {
    marginTop: 20,
  },
})

const mapStateToProps = (state, ownProps) => {
  return {
    summary: state.warungReducer.summary,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { setTips } = warung
  return {
    setTips: params => dispatch(setTips(params)),
    ...ownProps,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout)
