import React, { Component, useState, useCallback } from "react"
import { View, StyleSheet, ScrollView, StatusBar } from "react-native"
import PropTypes from "prop-types"
import { Divider, Button } from "_atoms"
import { ProfileHeader, ProfileButton, PairTitleValue } from "_molecules"
import { Spaces, Colors } from "_styles"
import { convertToCurrency, navigationServices } from "_utils"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "_actions"
import AsyncStorage from "@react-native-community/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import Sample1 from "_assets/images/sample-1.jpg"
import { Loading } from "_views"

const Landing = () => {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.authReducer)
  const defaultState = {
    name: "",
    role: "User",
    image: null,
    saldo: 0,
    points: 0,
    donation: 0,
    email: authState.email,
    phoneNumber: null,
  }
  const [state, setState] = useState(defaultState)
  const [isFetching, setFetching] = useState(true)
  const [isLoggingOut, setLoggingOut] = useState(false)

  const clickEdit = () => {
    if (isLoggingOut) return false
    navigationServices.Navigate("ProfileEdit", { data: state })
  }

  const clickSaldo = () => {
    if (isLoggingOut) return false
    navigationServices.Navigate("ProfileBalanceHistory")
  }

  const clickPoint = () => {
    if (isLoggingOut) return false
    navigationServices.Navigate("ProfileDonation")
  }

  const clickDonation = () => {
    if (isLoggingOut) return false
    navigationServices.Navigate("ProfileDonationHistory")
  }

  const clickChangePass = () => {
    if (isLoggingOut) return false
    navigationServices.Navigate("ProfileEditPass")
  }

  const clickLogout = () => {
    setLoggingOut(true)

    AsyncStorage.removeItem("token")
      .then(() => dispatch(auth.logout(null)))
      .catch(err => {
        setLoggingOut(false)
        console.log(err)
        alert("Terjadi kesalahan saat logout, silahkan coba lagi")
      })
  }

  const fetchData = () => {
    const profile = axios.get(`users/showUser?userId=${authState.userId}`)
    const balance = axios.get(
      `userbalance/showUserBalance?userId=${authState.userId}`,
    )

    axios
      .all([profile, balance])
      .then(
        axios.spread((...response) => {
          const resProfile = response[0]
          const resBalance = response[1]
          const dataProfile = resProfile.data.data
          const dataBalance = resBalance.data.data

          // console.log("Profile/landing,js - fetchData: ", {
          //   dataProfile,
          //   dataBalance,
          // })

          setState({
            ...state,
            name: dataProfile.fullname,
            email: dataProfile.email,
            phoneNumber: dataProfile.phoneNumber,
            saldo: parseInt(dataBalance.balance),
            points: parseInt(dataBalance.point),
          })
          setFetching(false)
        }),
      )
      .catch(error => {
        console.log(error)
        alert("Ada kesalahan ketika mengambil data")
      })
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.themeLight)
      StatusBar.setBarStyle("dark-content")
      fetchData()
    }, []),
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <ProfileHeader
          photo={state.image}
          name={state.name}
          role={state.role}
          onClickEdit={clickEdit}
        />

        <Divider style={styles.divider} />

        <View>
          <ProfileButton
            style={{ ...styles.profileButton, marginTop: 0 }}
            title="Kantong Semar"
            value={"Rp " + convertToCurrency(0, 0, false)}
            actionText="History"
            onClick={clickSaldo}
            colorPreset="secondary"
            withBatik={true}
          />

          <ProfileButton
            style={styles.profileButton}
            title="Points"
            value={convertToCurrency(state.points, 0, false)}
            actionText="Donasi"
            onClick={clickPoint}
          />

          <ProfileButton
            style={styles.profileButton}
            title="Total Donasi Anda"
            value={convertToCurrency(state.donation, 0, false)}
            actionText="History"
            onClick={clickDonation}
          />
        </View>

        <Divider style={styles.divider} />

        <PairTitleValue title="Email" value={state.email} stylePreset="table" />
        <PairTitleValue
          style={{ marginTop: 14 }}
          title="Nomor HP"
          value={state.phoneNumber}
          stylePreset="table"
        />

        <Button
          style={styles.changePassButton}
          type="secondary"
          text="Ubah Kata Sandi"
          size="large"
          onPress={clickChangePass}
        />

        <Button
          style={styles.logoutButton}
          text="Logout"
          size="large"
          onPress={clickLogout}
          state={isLoggingOut ? "loading" : "default"}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: Spaces.container,
  },
  divider: {
    marginHorizontal: 0 - Spaces.container,
  },
  changePassButton: {
    marginTop: 40,
  },
  profileButton: {
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 10,
  },
})

export default Landing
