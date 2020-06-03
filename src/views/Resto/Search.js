import React, { Component, useState, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native"
import PropTypes from "prop-types"
import { Spaces, Colors } from "_styles"
import { sample, navigationServices } from "_utils"
import { Button, Input } from "_atoms"
import { Icon, IconName } from "_c_a_icons"
import { BlockList } from "_organisms"
import { useFocusEffect } from "@react-navigation/native"

const Search = () => {
  const [keyword, setKeyword] = useState("")
  const [list, setList] = useState(sample.RestoList)

  function goBack() {
    navigationServices.GoBack()
  }

  function searching(text) {
    console.log("searching: ", text)
  }

  function handleFilter() {
    alert("handleFilter")
  }

  function handleSort() {
    alert("handleSort")
  }

  function gotoRestodetail({ id, title }) {
    console.log("resto/search - gotoRestodetail: ", id, title)
    navigationServices.Navigate("resto/landing", { id, title })
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.brandResto)
      StatusBar.setBarStyle("light-content")
    }, []),
  )

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerSearch}>
          <Input
            placeholder="Cari resto atau menu ..."
            IconLeft={IconName.arrowLeft}
            IconLeftClickable={true}
            IconLeftOnclick={goBack}
            stylePreset="boxed"
            onChangeText={searching}
          />
        </View>
        <View style={styles.headerControl}>
          <Button
            type="nude"
            text="Filter"
            iconName={IconName.filter}
            onPress={handleFilter}
          />
          <Button
            type="nude"
            text="Urutkan"
            iconName={IconName.sort}
            onPress={handleSort}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.wrapper}>
          <BlockList list={list} onItemPress={gotoRestodetail} />
        </View>
      </ScrollView>
    </View>
  )
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
