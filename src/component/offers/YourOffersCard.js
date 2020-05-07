import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { fonts, colors } from "../../utils/Constants";
import BigButton from "../common/BigButton";

const starImage = require("./../../assets/images/star.png");
const clockCircularImage = require("./../../assets/images/clock-circular-outline-2x.png");

export default class YourOffersCard extends Component {
  render() {
    const { data } = this.props;
    const { name, image, price, discount } = data;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.rateContainer}>
            <Text>4.8</Text>
            <Image style={styles.rateImage} source={starImage} />
          </View>
          <Image style={styles.profileImage} source={image} />

          <View style={styles.detailsContainer}>
            <Text style={{ fontFamily: fonts.sfproMedium }}>{name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                <Text style={{ color: colors.primaryColor }}>
                  {`R ${price}`}
                </Text>
                {` ${discount} m`}
              </Text>
              <Image style={styles.disImage} source={clockCircularImage} />
            </View>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textServiceNeeded}>Service needed: </Text>
          <Text style={styles.textDescription}>Nail </Text>
          <Text style={styles.textDescription}>Manicure</Text>
        </View>
        <BigButton
          title="Accept Offer"
          onPress={() => {
            const { navigation } = this.props;
            navigation.navigate("ConfirmJobStart");
          }}
        />
      </View>
    );
  }
}

YourOffersCard.defaultProps = {};

YourOffersCard.propTypes = {
  navigation: PropTypes.any,
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.blackOpacityColor2,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 30,
    width: "100%",
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 20,
  },
  rateContainer: {
    position: "absolute",
    top: 5,
    right: 10,
    flexDirection: "row",
  },
  rateImage: {
    width: 11,
    height: 11,
    marginLeft: 1,
    alignSelf: "center",
  },
  profileImage: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "space-around",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  price: {
    fontFamily: fonts.sfproBold,
    fontSize: 14,
    color: colors.primaryLightBlackColor,
  },
  disImage: {
    width: 10,
    height: 10,
    marginLeft: 4,
    marginTop: 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  textServiceNeeded: {
    fontSize: 14,
    fontFamily: fonts.sfproRegular,
    color: colors.primaryLightBlackColor,
  },
  textDescription: {
    fontSize: 16,
    fontFamily: fonts.sfproRegular,
    color: colors.primaryColor,
  },
});
