import React, { Component } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import Status from "./Status"
import { Divider, Button, Text } from "_atoms"
import AccountInfo from "./AccountInfo"
import { MerchantMenuList } from "_organisms"
import { connect } from "react-redux"
import { convertToNumber, convertToCurrency, sample, dateToUnix } from "_utils"
import { Spaces, FontFamily, FontSizes, Colors } from "_styles"

import Sample1 from "_assets/images/sample-1.jpg"
import { PriceInfo, OrderDetailMenu, PairTitleValue } from "_molecules"

const ORDER_LIST = sample.RestoMenu.map((val, i) => {
  val.quantity = 2

  return val
})

const DATA = {
  order_id: "918238",
  date_order: dateToUnix(new Date()) - 4,
  total_transaction: 319000,
  menu_price: 25000,
  fullname: "Stephen Hawking",
  driver_name: "John Doe",
  vehicle_number: "Honda Vario - B 4192 ID",
  list: ORDER_LIST,
  subtotal: 320000,
  transaction_fee: 5000,
  mitra_tips: 2000,
  total_discount: 8000,
  status: "Driver sedang menuju Resto",
  estimateTime: "7 menit",
}

class Tracking extends Component {
  state = DATA

  // componentDidMount() {
  //   /**
  //    * TODO: Save the current checkout data into the storage of active tracking
  //    * and Reset the checkout data in the redux
  //    */
  // }

  gotoSuccessScreen = () => {
    this.props.navigation.navigate("success", { title: "Transaksi Berhasil" })
  }

  render() {
    return (
      <ScrollView>
        <Status
          style={styles.Status}
          status={this.state.status}
          time={this.state.estimateTime}
        />
        <Divider />
        <AccountInfo
          photo={Sample1}
          name={this.state.driver_name}
          additionalInfo={this.state.vehicle_number}
          rating={4.5}
        />
        <Divider />
        <View style={styles.listWrapper}>
          <Text weight="bold">Daftar Pesanan</Text>
          {this.state.list.map((val, i) => (
            <OrderDetailMenu key={i} {...val} />
          ))}
        </View>

        <Divider />

        <PriceInfo
          title="Subtotal"
          value={convertToCurrency(this.state.subtotal)}
          style={{ marginTop: 0 }}
        />

        {this.state.total_discount > 0 && (
          <PriceInfo
            title="Discount"
            value={convertToCurrency(this.state.total_discount)}
          />
        )}

        <PriceInfo
          title="Biaya Transaksi"
          value={convertToCurrency(this.state.transaction_fee)}
        />

        <PriceInfo
          title="Tips"
          value={convertToCurrency(this.state.mitra_tips)}
        />

        <PriceInfo title="Metode Pembayaran" value="Tunai" />

        <PriceInfo
          title="Total"
          value={convertToCurrency(this.state.total_transaction)}
          emphasize={true}
          style={{ marginBottom: 40 }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  Status: {
    marginTop: 40,
  },
  info: {
    marginTop: 10,
    marginHorizontal: Spaces.container,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listWrapper: {
    paddingHorizontal: Spaces.container,
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
})

const mapStateToProps = state => {
  return {
    selectedItems: state.restoReducer.selected,
    summary: state.restoReducer.summary,
    tips: state.restoReducer.tips,
  }
}

export default connect(mapStateToProps)(Tracking)
