import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { DrawerActions } from "react-navigation";
import { Rating } from "react-native-elements";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import scale from "../utils/scale";
import { fonts, colors } from "../utils/Constants";
import NavButton from "../component/common/NavButton";

const cardImage = require("./../assets/images/card.png");
const avatarImage = require("./../assets/images/Oval-2x.png");

class AddPaymentCard extends Component {
  static navigationOptions = ({ navigation }) => {
    let navButtons = {};
    const isDisabledMenu = navigation.getParam("isDisabledMenu") || false;
    if (!isDisabledMenu) {
      navButtons = {
        headerLeft: (
          <NavButton
            icon="menu"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      };
    }
    return {
      title: "Payment",
      headerBackTitle: "Back",
      ...navButtons,
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topMainContentContainer}>
            <View style={styles.rowContainer}>
              <Image style={styles.imageAvatar} source={avatarImage} />
              <View style={styles.userInfoContainer}>
                <Text style={styles.textName}>Nelle Phillips</Text>
                <Text style={styles.textService}>Hair style</Text>
              </View>
            </View>
            <View style={styles.userFeedbackContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.textFieldName}>Jobs Done</Text>
                <Text style={styles.textJobsCount}> 130</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.textFieldName}>Rating 4.8</Text>
                <Rating
                  type="custom"
                  imageSize={18}
                  ratingColor={colors.whiteColor}
                  ratingBackgroundColor="transparent"
                  readonly
                  startingValue={4.5}
                  style={styles.ratingContainer}
                />
              </View>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textPrice}>R 340</Text>
          </View>
        </View>
        <View style={styles.mainContentContainer}>
          <Image style={styles.imageCard} source={cardImage} />
          <Text style={styles.textNoCard}>You don't have any cards yet</Text>
          <TouchableOpacity
            style={styles.addButtonContainer}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("CardInfo")}
          >
            <Text style={styles.textButton}>+ Add a Card</Text>
          </TouchableOpacity>
          <View style={styles.paymentSecureContainer}>
            <FontAwesome name="user-secret" style={styles.iconPaymentSecure} />
            <Text style={styles.textPaymentSecure}>100% Secure Payment</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  ...auth,
});

export default connect(
  mapStateToProps,
  null,
)(AddPaymentCard);

AddPaymentCard.defaultProps = {};

AddPaymentCard.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  topContainer: {
    paddingBottom: scale(18),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topMainContentContainer: {
    height: scale(180),
    paddingHorizontal: scale(12),
    paddingTop: scale(10),
    backgroundColor: colors.primaryColor,
  },
  imageAvatar: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(40),
    borderWidth: scale(1),
    borderColor: colors.primaryLightColor,
  },
  userInfoContainer: {
    marginLeft: scale(15),
    justifyContent: "center",
  },
  textName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.whiteColor,
  },
  textService: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(12),
    marginTop: scale(3),
    color: colors.whiteColor,
  },
  userFeedbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: scale(20),
  },
  textFieldName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    lineHeight: scale(14),
    color: colors.whiteColor,
  },
  textJobsCount: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(14),
    lineHeight: scale(16),
    color: colors.whiteColor,
  },
  ratingContainer: {
    marginLeft: scale(8),
  },
  priceContainer: {
    width: scale(80),
    height: scale(35),
    borderRadius: scale(4),
    backgroundColor: colors.primaryLightBlackColor,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: scale(12),
    bottom: 0,
  },
  textPrice: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(15),
    lineHeight: scale(18),
    color: colors.whiteColor,
  },
  mainContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageCard: {
    height: scale(150),
    marginHorizontal: scale(40),
    resizeMode: "contain",
    marginTop: scale(48),
  },
  textNoCard: {
    color: colors.primaryColor,
    fontFamily: fonts.robotoMedium,
    fontSize: scale(18),
    lineHeight: scale(21),
    marginTop: scale(20),
  },
  addButtonContainer: {
    height: scale(60),
    alignSelf: "stretch",
    marginHorizontal: scale(12),
    borderRadius: scale(2),
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(37),
    backgroundColor: colors.primaryLightBlackColor,
  },
  textButton: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.whiteColor,
  },
  paymentSecureContainer: {
    flexDirection: "row",
    marginVertical: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  iconPaymentSecure: {
    color: colors.darkGrayColor1,
    fontSize: scale(14),
    marginRight: scale(6),
  },
  textPaymentSecure: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(15),
    lineHeight: scale(18),
    color: colors.darkGrayColor1,
  },
});
