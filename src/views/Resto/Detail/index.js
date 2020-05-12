import React, { Component } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import PropTypes from "prop-types"
import Map from "./Map"
import { ReviewAction, HeadingIcon } from "_molecules"
import { Spaces, FontSizes, FontFamily, Colors } from "_styles"
import { Heading, Content } from "_atoms"
import { IconName } from "_c_a_icons"
import { hexToRgb } from "_utils"

class Detail extends Component {
  state = {
    rating: 4.5,
    isFavorite: false,
    totalReviewers: 24,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque mi non nibh sollicitudin varius id sed magna.

Aliquam et pharetra est. In sit amet libero luctus, maximus lectus vel, sodales nisi. Nam convallis nisi ac malesuada egestas. Maecenas ac ex at tortor varius lacinia.`,
    address: "Jl. Gatot Subroto, Jakarta",
    phoneNumber: "0812 2763 9182",
    email: "mpustaka@gmail.com",
    schedule: [
      {
        key: "Senin",
        start: "10:00",
        end: "20:00",
      },
      {
        key: "Selasa",
        start: "10:00",
        end: "20:00",
      },
      {
        key: "Rabu",
        start: "10:00",
        end: "20:00",
      },
      {
        key: "Kamis",
        start: "10:00",
        end: "20:00",
      },
      {
        key: "Jumat",
        start: "10:00",
        end: "20:00",
      },
      {
        key: "Sabtu",
        start: false,
        end: false,
      },
      {
        key: "Minggu",
        start: false,
        end: false,
      },
    ],
  }

  onClickFavorite = () => {
    // TODO: API action to sync with this value

    this.setState(prevState => ({
      isFavorite: !prevState.isFavorite,
    }))
  }

  render() {
    return (
      <ScrollView>
        <Map />
        <View style={styles.wrapper}>
          <ReviewAction
            style={styles.ReviewAction}
            rating={this.state.rating}
            isFavorite={this.state.isFavorite}
            totalReviewers={this.state.totalReviewers}
            onClickFavorite={this.onClickFavorite}
          />
          <Heading text="Deskripsi" style={styles.Heading} />
          <Content style={styles.Content}>{this.state.description}</Content>
          <View style={styles.infoWrapper}>
            <HeadingIcon
              style={{ ...styles.HeadingIcon, marginTop: 0 }}
              iconName={IconName.mapMarker}
              text={this.state.address}
            />
            <HeadingIcon
              style={styles.HeadingIcon}
              iconName={IconName.phone}
              text={this.state.phoneNumber}
            />
            <HeadingIcon
              style={styles.HeadingIcon}
              iconName={IconName.email}
              text={this.state.email}
            />
          </View>
          <View style={styles.schedule}>
            <Heading text="Jam Buka" style={styles.Heading} />
            <View style={styles.scheduleItems}>
              {this.state.schedule.map((val, index) => {
                const isOpen = val.start !== false
                const redClass = isOpen ? {} : { color: Colors.themeDanger }

                return (
                  <View key={index} style={styles.scheduleItem}>
                    <Text style={{ ...styles.scheduleKey, ...redClass }}>
                      {val.key}
                    </Text>
                    <Text style={{ ...styles.scheduleValue, ...redClass }}>
                      {isOpen ? val.start + " - " + val.end : "Tutup"}
                    </Text>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spaces.container,
    paddingBottom: 40,
  },
  ReviewAction: {
    marginTop: 30,
  },
  Heading: {
    marginTop: 20,
    fontSize: FontSizes.medium,
  },
  Content: {
    marginTop: 14,
  },
  infoWrapper: {
    marginTop: 20,
  },
  HeadingIcon: {
    marginTop: 14,
  },
  schedule: {
    marginTop: 30,
  },
  scheduleItems: {
    marginTop: 14 - 8,
  },
  scheduleItem: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scheduleKey: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.normal,
    color: hexToRgb(Colors.textPrimary),
  },
  scheduleValue: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.normal,
    color: hexToRgb(Colors.textPrimary),
  },
})

export default Detail
