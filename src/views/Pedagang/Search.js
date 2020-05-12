import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import PropTypes from "prop-types"
import { Spaces, Colors } from "_styles"
import { sample, navigationServices } from "_utils"
import { Button, Input } from "_atoms"
import { Icon, IconName } from "_c_a_icons"
import { BlockList } from "_organisms"

class Search extends Component {
  state = {
    keyword: "",
    list: sample.RestoList,
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  searching = text => {
    console.log("searching: ", text)
  }

  handleFilter = () => {
    alert("handleFilter")
  }

  handleSort = () => {
    alert("handleSort")
  }

  gotoPedagangdetail = ({ id, title }) => {
    console.log("pedagang/search - gotoPedagangdetail: ", id, title)
    navigationServices.Navigate("pedagang/landing", { id, title })
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <View style={styles.headerSearch}>
            <Input
              placeholder="Cari pedagang atau menu ..."
              IconLeft={IconName.arrowLeft}
              IconLeftClickable={true}
              IconLeftOnclick={this.goBack}
              stylePreset="boxed"
              onChangeText={this.searching}
            />
          </View>
          <View style={styles.headerControl}>
            <Button
              type="nude"
              text="Filter"
              iconName={IconName.filter}
              onPress={this.handleFilter}
            />
            <Button
              type="nude"
              text="Urutkan"
              iconName={IconName.sort}
              onPress={this.handleSort}
            />
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.wrapper}>
            <BlockList
              list={this.state.list}
              onItemPress={this.gotoPedagangdetail}
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
  headerControl: {
    paddingVertical: 14,
    paddingHorizontal: Spaces.container,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.themeHeaderBorder,
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  wrapper: {
    marginTop: 14,
    marginBottom: 40,
    marginHorizontal: Spaces.container,
  },
})

export default Search
