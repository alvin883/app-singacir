import React, { Component, useCallback } from "react"
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native"
import PropTypes from "prop-types"
import { ImageSlider, SemarBox, Divider } from "_atoms"
import { Icon, IconName } from "_c_a_icons"
import Header from "./Header"
import Features from "./Features"
import Promo from "./Promo"
import Advertise from "./Advertise"
import HotMenu from "./HotMenu"
import SocialMedia from "./SocialMedia"

import Sample1 from "_assets/images/sample-1.jpg"
import Sample2 from "_assets/images/sample-2.jpg"
import Sample3 from "_assets/images/sample-3.jpg"
import Sample4 from "_assets/images/sample-4.jpg"
import { Colors } from "_styles"
import { useState } from "react"
import { useEffect } from "react"
import { useFocusEffect } from "@react-navigation/native"

const Dashboard = () => {
  const [state, setState] = useState({
    imageSlider: {
      images: [Sample1, Sample2, Sample3, Sample4],
    },
    promo: {
      suptitle: "Hot Promo",
      title: "Promo 50% bagi yang menggunakan Dana",
      content:
        "Jangan lewatkan promo di bulan September 2019 ini karena akan ada hadiah yang akan didapatkan.",
    },
    advertise: {
      imageSource: Sample1,
      title: "Grow your bussiness together",
      subtitle: "Join the service partner program!",
    },
    hotMenu: {
      suptitle: "Hot Menu",
      items: [Sample1, Sample2, Sample3, Sample4],
    },
    socialMedia: {
      title: "Si Ngacir Social Media",
      items: [
        {
          url: "https://youtube.com",
          iconName: IconName.youtube,
          color: "#FB3C3C",
        },
        {
          url: "https://facebook.com",
          iconName: IconName.facebook,
          color: "#3B5998",
        },
        {
          url: "https://instagram.com",
          iconName: IconName.instagram,
          color: "#f00075",
        },
        {
          url: "https://linkedin.com",
          iconName: IconName.linkedin,
          color: "#0a66c2",
        },
        {
          url: "https://tiktok.com",
          iconName: IconName.tiktok,
          color: "#121212",
        },
      ],
    },
  })

  const { imageSlider, promo, advertise, hotMenu, socialMedia } = state

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(Colors.brandPurple)
      StatusBar.setBarStyle("light-content")
    }, []),
  )

  return (
    <View style={{ flex: 1 }}>
      <Header style={{ flex: 1 }} />
      <ScrollView>
        <ImageSlider {...imageSlider} />
        <SemarBox />
        <Features />
        <Promo {...promo} />
        <Advertise {...advertise} />
        <HotMenu {...hotMenu} />
        <Divider style={{ marginTop: 30 }} />
        <SocialMedia {...socialMedia} />
      </ScrollView>
    </View>
  )
}

export default Dashboard
