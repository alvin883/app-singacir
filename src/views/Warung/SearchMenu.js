import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import PropTypes from "prop-types"
import { MerchantMenuList } from "_organisms"
import { Spaces, Colors } from "_styles"
import { sample } from "_utils"
import { Button, Input, InputSelect } from "_atoms"
import { Icon, IconName } from "_c_a_icons"
import { warung } from "_actions"

const { reduceItem, addItem } = warung

class SearchMenu extends Component {
  state = {
    keyword: "",
    list: sample.RestoDetail.itemNew,
    selectedCategory: null,
    querystring: "",
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  typing = text => {
    this.setState(
      {
        querystring: text,
      },
      () => this.searching(),
    )
  }

  handleSelect = (val, index) => {
    this.setState(
      {
        selectedCategory: val,
      },
      () => this.searching(),
    )
  }

  searching = () => {
    const { querystring, selectedCategory } = this.state

    console.log("searching: ", querystring, selectedCategory)
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <View style={styles.headerSearch}>
            <Input
              placeholder="Cari menu ..."
              IconLeft={IconName.arrowLeft}
              IconLeftClickable={true}
              IconLeftOnclick={this.goBack}
              stylePreset="boxed"
              onChangeText={this.typing}
            />
          </View>
          <View style={styles.headerBottom}>
            <InputSelect
              label="Kategori"
              value={this.state.selectedCategory}
              placeholder="Pilih kategori"
              options={[
                { value: "1", label: "Makanan" },
                { value: "2", label: "Minuman" },
              ]}
              onSelect={this.handleSelect}
            />
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.wrapper}>
            <MerchantMenuList
              list={this.state.list}
              reducerName="warungReducer"
              addAction={addItem}
              reduceAction={reduceItem}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexGrow: 0,
    backgroundColor: Colors.themeLight,
  },
  headerSearch: {
    paddingVertical: 14,
    paddingHorizontal: Spaces.container,
    borderBottomWidth: 1,
    borderBottomColor: Colors.themeHeaderBorder,
  },
  search: {
    paddingVertical: 14,
    borderRadius: 4,
    backgroundColor: Colors.themeBorder,
  },
  searchField: {
    paddingVertical: 0,
    borderBottomWidth: 0,
  },
  headerBottom: {
    paddingVertical: 20,
    paddingHorizontal: Spaces.container,
    borderBottomWidth: 1,
    borderBottomColor: Colors.themeHeaderBorder,
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  wrapper: {
    marginBottom: 40,
  },
})

export default SearchMenu
