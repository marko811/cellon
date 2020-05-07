import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Card } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-elements";

import NavButton from "../component/common/NavButton";
import { fonts, colors } from "../utils/Constants";
import scale from "../utils/scale";

const avatarImage = require("../assets/images/Oval-2x.png");
const peachPaymentImage = require("../assets/images/peach_payment.png");

export default class PayAndFeedback extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Payment",
      headerBackTitle: "Back",
      headerRight: (
        <NavButton
          icon="handbag"
          onPress={() => navigation.navigate("ShoppingBag")}
        />
      ),
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topBackground} />
          <Image style={styles.imageAvatar} source={avatarImage} />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.textName}>Nelle Phillips</Text>
          <Rating
            type="custom"
            imageSize={18}
            ratingColor={colors.whiteColor}
            ratingBackgroundColor="transparent"
            readonly
            startingValue={4.5}
          />
          <Text style={styles.textServiceType}>Hair style</Text>
        </View>
        <TouchableOpacity
          style={styles.peachPaymentContainer}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("PaymentDetail", { isDisabledMenu: true })
          }
        >
          <Card style={styles.peachPayCardContainer}>
            <View style={styles.verticalBar} />
            <Image
              style={styles.imagePeachPayment}
              source={peachPaymentImage}
            />
            <Ionicons
              name="ios-arrow-forward"
              size={scale(20)}
              color={colors.primaryLightBlackColor}
              style={styles.iconRightChevron}
            />
          </Card>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={styles.bottomContainer}>
          <Text style={styles.textTotal}>Total: </Text>
          <Text style={styles.textPrice}>R 340</Text>
        </View>
      </View>
    );
  }
}

PayAndFeedback.defaultProps = {};

PayAndFeedback.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingBottom: scale(40),
    alignItems: "center",
  },
  topBackground: {
    backgroundColor: colors.primaryColor,
    height: scale(100),
    width: "100%",
  },
  imageAvatar: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(40),
    borderWidth: scale(1),
    borderColor: colors.primaryLightColor,
    position: "absolute",
    bottom: 0,
  },
  userInfoContainer: {
    alignItems: "center",
    marginTop: scale(7),
  },
  textName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.primaryLightBlackColor,
  },
  textServiceType: {
    fontFamily: fonts.grayColor,
    fontSize: scale(20),
    lineHeight: scale(24),
    marginVertical: scale(6),
    color: colors.grayColor,
  },
  peachPaymentContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    height: scale(115),
    marginTop: scale(50),
    marginHorizontal: scale(38),
  },
  peachPayCardContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(8),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 100,
    borderColor: "transparent",
    marginLeft: scale(3),
  },
  verticalBar: {
    height: scale(55),
    width: scale(6),
    backgroundColor: colors.primaryLightBlackColor,
    position: "absolute",
    left: -scale(3),
  },
  imagePeachPayment: {
    height: scale(37),
    width: scale(222),
    resizeMode: "contain",
  },
  iconRightChevron: {
    position: "absolute",
    right: scale(17),
  },
  bottomContainer: {
    height: scale(60),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryLightBlackColor,
  },
  textTotal: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.whiteColor,
  },
  textPrice: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.primaryColor,
  },
});
