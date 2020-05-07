import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "native-base";
import { Rating } from "react-native-elements";
import ProgressCircle from "react-native-progress-circle";
import Ionicons from "react-native-vector-icons/Ionicons";
// import ImagePicker from "react-native-image-picker";
import { FlatList } from "react-native-gesture-handler";

import CommonStyles from "../utils/CommonStyles";
import scale from "../utils/scale";
import { fonts, colors, WINDOWSIZE } from "../utils/Constants";
import dummyData from "../dummy";

const scheduleColorMarks = [
  {
    type: "Taken",
    label: "Taken",
    color: colors.primaryOpacityColor,
  },
  {
    type: "Available",
    label: "Available",
    color: "transparent",
  },
  {
    type: "Booking",
    label: "Your Booking",
    color: colors.primaryColor,
  },
];

const profileIcon = require("./../assets/images/profile-2x.png");
const ovalIcon = require("./../assets/images/Oval-2x.png");

const scheduleTimeItemPadding = scale(
  Math.round((WINDOWSIZE.width - 24 - 32 - 65 * 4) / 8),
);

class StylistSchedule extends Component {
  static navigationOptions = {
    drawerLabel: "Schedule",
    drawerIcon: ({ tintColor }) => (
      <Image style={[CommonStyles.icon, { tintColor }]} source={profileIcon} />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      profilePhotoSource: null,
      stylistSchedule: dummyData.stylistSchedule,
    };
  }

  onSelectedSchedule = (item, index) => {
    const { stylistSchedule } = this.state;
    if (item.active === "Booking") {
      item.active = "Available";
    } else if (item.active === "Available") {
      item.active = "Booking";
    }
    stylistSchedule[index] = item;
    this.setState({ stylistSchedule });
  };

  renderScheduleColorMark = () => {
    return (
      <View style={styles.scheduleTimeColorMarkContainer}>
        {scheduleColorMarks.map((item, index) => (
          <View key={index} style={styles.markItemContainer}>
            <View style={[styles.colorMark, { backgroundColor: item.color }]} />
            <Text style={styles.textScheduleMarkName}>{item.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  renderSchedule = ({ item, index }) => {
    let backgroundColor = "transparent";
    let textColor = colors.darkGrayColor1;
    if (item.active === "Taken") {
      backgroundColor = colors.primaryOpacityColor;
      textColor = colors.primaryColor;
    } else if (item.active === "Booking") {
      backgroundColor = colors.primaryColor;
      textColor = colors.whiteColor;
    }
    return (
      <TouchableOpacity
        style={[styles.scheduleItemContainer, { backgroundColor }]}
        activeOpacity={0.7}
        disabled={item.active === "Taken"}
        onPress={() => this.onSelectedSchedule(item, index)}
      >
        <Text style={[styles.textScheduleTime, { color: textColor }]}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { profilePhotoSource, stylistSchedule } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => {
              const { navigation } = this.props;
              navigation.goBack();
            }}
          >
            <Ionicons
              name="ios-arrow-back"
              size={scale(30)}
              color={colors.whiteColor}
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.imageContainer}>
            <View style={styles.flexDirection}>
              <Image
                style={styles.imageStyle}
                source={
                  profilePhotoSource
                    ? { uri: profilePhotoSource.uri }
                    : ovalIcon
                }
              />
              <View style={styles.userInfoContainer}>
                <Text style={styles.nameText}>Nelle Phillips</Text>
                <Text style={styles.serviceText}>Hair style</Text>
              </View>
            </View>
            <View style={styles.imageTextContainer}>
              <View style={styles.flexDirection}>
                <Text style={styles.jobCountLabel}>Jobs Done</Text>
                <Text style={styles.jobCountText}> 130</Text>
              </View>
              <View style={styles.flexDirection}>
                <Text style={styles.ratingText}>Rating 4.8</Text>
                <Rating
                  type="custom"
                  imageSize={18}
                  ratingColor={colors.whiteColor}
                  ratingBackgroundColor="transparent"
                  readonly
                  startingValue={4.5}
                  style={styles.rateImage}
                />
              </View>
            </View>
            <View />
          </View>
          <View style={styles.statisticContainer}>
            <View>
              <Text style={styles.statisticText}>Statistic</Text>
            </View>

            <Card style={styles.statisticCard}>
              <View style={styles.progressContainer}>
                <View style={styles.progressItem}>
                  <ProgressCircle
                    percent={35}
                    radius={scale(40)}
                    borderWidth={scale(8)}
                    color={colors.primaryColor}
                    shadowColor={colors.lightGrayColor4}
                    bgColor={colors.whiteColor}
                  >
                    <Text style={{ fontSize: 18 }}>35%</Text>
                  </ProgressCircle>
                  <Text style={styles.progressCircleComment}>Order</Text>
                </View>
                <View style={styles.progressItem}>
                  <ProgressCircle
                    percent={70}
                    radius={scale(40)}
                    borderWidth={scale(8)}
                    color={colors.primaryColor}
                    shadowColor={colors.lightGrayColor4}
                    bgColor={colors.whiteColor}
                  >
                    <Text style={{ fontSize: 18 }}>70%</Text>
                  </ProgressCircle>
                  <Text style={styles.progressCircleComment}>Success</Text>
                </View>
                <View style={styles.progressItem}>
                  <ProgressCircle
                    percent={100}
                    radius={scale(40)}
                    borderWidth={scale(8)}
                    color={colors.primaryColor}
                    shadowColor={colors.lightGrayColor4}
                    bgColor={colors.whiteColor}
                  >
                    <Text style={{ fontSize: 18 }}>100%</Text>
                  </ProgressCircle>
                  <Text style={styles.progressCircleComment}>Recommended</Text>
                </View>
              </View>
            </Card>
          </View>
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleTitle}>
              <Text style={styles.scheduleTitleText}>Schedule</Text>
              <View style={styles.scheduleTitleMonth}>
                <Ionicons
                  name="md-arrow-back"
                  size={scale(20)}
                  color={colors.blackColor}
                  style={styles.marginHorizontalSmall}
                />
                <Text style={styles.marginHorizontalSmall}>March</Text>
                <Ionicons
                  name="md-arrow-forward"
                  size={scale(20)}
                  color={colors.blackColor}
                  style={styles.marginHorizontalSmall}
                />
              </View>
            </View>

            <Card style={styles.scheduleCard}>
              <FlatList
                data={stylistSchedule}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                renderItem={this.renderSchedule}
                extraData={this.state}
              />
              {this.renderScheduleColorMark()}
            </Card>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.6}
          onPress={() => {
            const { navigation } = this.props;
            navigation.navigate("Book");
          }}
        >
          <Text style={styles.buttonTextStyle}>BOOK</Text>
        </TouchableOpacity>
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
)(StylistSchedule);

StylistSchedule.defaultProps = {};

StylistSchedule.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: "row",
  },
  marginHorizontalSmall: {
    marginHorizontal: 5,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  header: {
    height: scale(70),
    backgroundColor: colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backIconContainer: {
    flexDirection: "row",
    position: "absolute",
    left: scale(10),
    alignItems: "center",
  },
  backText: {
    fontFamily: fonts.sfproDisplayRegular,
    fontSize: scale(17),
    color: colors.whiteColor,
    marginLeft: scale(10),
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: scale(10),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    height: scale(18),
    width: scale(16),
  },
  titleText: {
    fontFamily: fonts.sfproDisplayBold,
    fontSize: scale(18),
    color: colors.whiteColor,
    marginLeft: scale(10),
  },
  imageContainer: {
    height: scale(170),
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 10,
  },
  imageStyle: {
    height: scale(110),
    width: scale(110),
    borderRadius: scale(55),
  },
  imageTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  userInfoContainer: {
    marginLeft: 20,
    justifyContent: "center",
  },
  nameText: {
    fontFamily: fonts.sfproRegular,
    fontSize: scale(20),
    fontWeight: "bold",
    color: colors.whiteColor,
  },
  serviceText: {
    fontFamily: fonts.sfproRegular,
    fontSize: scale(14),
    marginTop: scale(3),
    color: colors.whiteColor,
  },
  jobCountLabel: {
    fontFamily: fonts.sfproRegular,
    fontWeight: "bold",
    fontSize: scale(14),
    color: colors.whiteColor,
  },
  jobCountText: {
    fontFamily: fonts.sfproRegular,
    fontSize: scale(14),
    color: colors.whiteColor,
  },
  ratingText: {
    fontFamily: fonts.sfproRegular,
    fontWeight: "bold",
    fontSize: scale(14),
    color: colors.whiteColor,
  },
  rateImage: {
    marginLeft: 10,
  },
  profileContainer: {
    flex: 1,
  },
  statisticContainer: {
    margin: 10,
  },
  statisticText: {
    fontFamily: fonts.sfproRegular,
    fontWeight: "bold",
    fontSize: scale(20),
    color: colors.primaryColor,
    marginVertical: 10,
  },
  statisticContent: {
    marginVertical: 10,
    width: 100,
    height: 300,
  },
  statisticCard: {
    padding: scale(20),
    borderRadius: scale(4),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 100,
    borderColor: "transparent",
  },
  scheduleContainer: {
    margin: scale(12),
  },
  scheduleTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scheduleTitleText: {
    fontFamily: fonts.sfproRegular,
    fontWeight: "bold",
    fontSize: scale(20),
    color: colors.primaryColor,
    marginVertical: 10,
  },
  scheduleTitleMonth: {
    flexDirection: "row",
    fontFamily: fonts.sfproRegular,
    fontWeight: "bold",
    fontSize: scale(10),
    color: colors.primaryColor,
    alignItems: "center",
  },
  inputContainer: {},
  buttonStyle: {
    backgroundColor: colors.primaryColor,
    alignSelf: "stretch",
    marginHorizontal: scale(25),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(14),
    borderRadius: scale(2),
    marginVertical: scale(14),
  },
  buttonTextStyle: {
    fontFamily: fonts.sfproDisplayMedium,
    fontSize: scale(18),
    color: colors.whiteColor,
  },
  progressItem: {},
  progressCircleComment: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
    fontSize: scale(12),
  },
  scheduleCard: {
    padding: scale(16),
    borderRadius: scale(4),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 100,
    borderColor: "transparent",
  },
  scheduleItemContainer: {
    width: scale(65),
    height: scale(25),
    marginHorizontal: scheduleTimeItemPadding,
    marginBottom: scale(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(1),
    borderRadius: scale(2),
    borderColor: colors.lightGrayColor4,
    margin: "auto",
  },
  textScheduleTime: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(12),
    color: colors.darkGrayColor1,
    alignItems: "center",
  },
  scheduleTimeColorMarkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: scheduleTimeItemPadding,
    marginTop: scale(20),
    marginBottom: scale(8),
  },
  markItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorMark: {
    width: scale(12),
    height: scale(12),
    borderWidth: scale(1),
    borderRadius: scale(2),
    borderColor: colors.lightGrayColor4,
  },
  textScheduleMarkName: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(10),
    color: colors.primaryLightBlackColor,
    alignItems: "center",
    marginLeft: scale(6),
  },
});
