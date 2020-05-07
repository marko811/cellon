import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Card } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-elements";

import { colors, fonts } from "../../utils/Constants";
import scale from "../../utils/scale";

export default class SelectStylistItem extends Component {
  render() {
    const {
      name,
      serviceType,
      paid,
      status,
      avatar,
      rating,
      jobsDone,
      onPress,
    } = this.props;
    return (
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.6}
            onPress={() => onPress()}
          >
            <Image style={styles.imageAvatar} source={avatar} />
            <View style={styles.mainContainer}>
              <View>
                <View style={styles.rowContainer}>
                  <Text style={styles.textName}>{name}</Text>
                  <Rating
                    type="custom"
                    imageSize={12}
                    ratingColor={colors.whiteColor}
                    ratingBackgroundColor="transparent"
                    readonly
                    startingValue={rating}
                  />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.textServiceType}>{serviceType}</Text>
                  <View style={styles.rowContainer}>
                    <Text style={styles.textJobsDone}>Jobs Done</Text>
                    <Text style={styles.textJobsDoneCount}>{jobsDone}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.rowContainer}>
                  <Ionicons
                    name="ios-bookmark"
                    color={colors.primaryLightBlackColor}
                    size={scale(16)}
                  />
                  <Text style={styles.textStatus}>{status}</Text>
                </View>
                <Text style={styles.textPaid}>{paid}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

SelectStylistItem.defaultProps = {
  serviceType: "",
  paid: "",
  status: "",
  jobsDone: 0,
  rating: 0,
  onPress: () => {},
};

SelectStylistItem.propTypes = {
  name: PropTypes.string.isRequired,
  serviceType: PropTypes.string,
  paid: PropTypes.string,
  status: PropTypes.string,
  rating: PropTypes.number,
  jobsDone: PropTypes.number,
  avatar: PropTypes.number,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: scale(12),
    marginVertical: scale(10),
  },
  cardContainer: {
    flex: 1,
    borderRadius: scale(4),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 100,
    borderColor: "transparent",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  imageAvatar: {
    height: scale(115),
    width: scale(125),
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: scale(9),
    marginVertical: scale(12),
    justifyContent: "space-between",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: scale(1),
  },
  textName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(15),
    lineHeight: scale(18),
    color: colors.primaryLightBlackColor,
  },
  textServiceType: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(12),
    lineHeight: scale(14),
    color: colors.grayColor,
  },
  textJobsDone: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(11),
    lineHeight: scale(13),
    color: colors.primaryColor,
  },
  textJobsDoneCount: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(11),
    lineHeight: scale(13),
    color: colors.primaryLightBlackColor,
    marginLeft: scale(3),
  },
  textPaid: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(15),
    lineHeight: scale(18),
    color: colors.primaryLightBlackColor,
  },
  textStatus: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(15),
    lineHeight: scale(18),
    color: colors.primaryColor,
    marginLeft: scale(5),
  },
});
