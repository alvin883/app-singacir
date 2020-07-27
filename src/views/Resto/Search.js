import React, { Component, useState, useCallback, useEffect } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native"
import PropTypes from "prop-types"
import { Spaces, Colors } from "_styles"
import { sample, navigationServices, hexToRgb } from "_utils"
import { Button, Input, Text } from "_atoms"
import { Icon, IconName } from "_c_a_icons"
import { BlockList } from "_organisms"
import { useFocusEffect } from "@react-navigation/native"
import Geolocation from "@react-native-community/geolocation"
import axios from "axios"
import { Loading } from "_views"

const WITH_FILTER = false

const Search = () => {
  const [keyword, setKeyword] = useState("")
  const [list, setList] = useState([])
  const [position, setPosition] = useState()
  const [isLoading, setLoading] = useState(true)
  const [lastResponse, setLastResponse] = useState()
  const [pagination, setPagination] = useState({
    current: 0,
    limit: 100,
  })

  function goBack() {
    navigationServices.GoBack()
  }

  function onSearch(text) {
    console.log("searching: ", text)
    setKeyword(text)
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

  useEffect(() => {
    if (position) {
      const params = {
        long: position.coords.longitude,
        lat: position.coords.latitude,
        offset: pagination.current,
        limit: pagination.limit,
      }

      console.log(params)

      const fetchAPI = () => {
        console.log("fetching ...")
        axios
          .get("resto/showAll", { params })
          .then(response => {
            console.log("retoData:", response.data)
            setList(response.data?.data?.restos)
          })
          .catch(error => {
            console.log(error)
            console.log(error.response.data)
            // console.log(error.request)
          })
          .finally(() => {
            setLoading(false)
          })
      }

      fetchAPI()
    }

    return () => null
  }, [position, keyword])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.brandResto)
      StatusBar.setBarStyle("light-content")

      Geolocation.getCurrentPosition(
        position => {
          setPosition(position)
          console.log("Position:", position)
        },
        error => {
          console.log(error)
          if (error.PERMISSION_DENIED) {
            Alert.alert(
              "Error",
              "Fitur ini membutuhkan akses lokasi pada perangkat anda, harap izinkan akses lokasi untuk melanjutkan",
              [
                {
                  text: "Oke",
                  onPress: navigationServices.GoBack(),
                },
              ],
            )
          } else {
            Alert.alert("Error", "Terjadi kesalahan, silahkan coba kembali", [
              {
                text: "Oke",
                onPress: navigationServices.GoBack(),
              },
            ])
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000,
        },
      )
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
            onChangeText={onSearch}
          />
        </View>

        {WITH_FILTER && (
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
        )}
      </View>

      {isLoading && <Loading />}

      {!isLoading && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.wrapper}>
            {list.length ? (
              <BlockList list={list} onItemPress={gotoRestodetail} />
            ) : (
              <View style={styles.empty}>
                <Text size="large" weight="bold" style={styles.emptyText}>
                  😥
                </Text>
                <Text size="large" weight="bold" style={styles.emptyText}>
                  Resto tidak ditemukan
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
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
    // backgroundColor: "red",
  },
  empty: {
    marginTop: 50,
    opacity: 0.5,
  },
  emptyText: {
    textAlign: "center",
  },
})

export default Search
