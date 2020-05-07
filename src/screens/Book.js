import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import CalendarStrip from "react-native-calendar-strip";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import moment from "moment";

import { fonts, colors, WINDOWSIZE } from "../utils/Constants";
import scale from "../utils/scale";
import dummyData from "../dummy";

const avatarImage = require("../assets/images/Oval-2x.png");

class Book extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title");
    return {
      title,
    };
  };

  constructor(props) {
    super(props);
    const date = moment();
    this.state = {
      date,
    };
    this.setTitle(date);
  }

  setTitle = date => {
    const { navigation } = this.props;
    navigation.setParams({
      title: date.format("MMMM, YYYY"),
    });
  };

  onChangeDate = date => {
    this.setState({ date });
    this.setTitle(date);
  };

  onSendMessage = () => {
    alert("Message Pressed!");
  };

  onCallPhone = () => {
    alert("Phone Pressed!");
  };

  onCacellBooking = () => {
    alert("Booking Cancel Pressed!");
  };

  onPaid = () => {
    alert("Paid Pressed!");
  };

  onTrackBoth = () => {
    alert("Track Both Parties Each Other Pressed!");
  };

  renderBookDateTime = () => {
    const { date } = this.state;
    const currentDate = date.format("dddd, MMMM, YYYY");
    return (
      <View style={styles.bookDateTimeContainer}>
        <Image style={styles.imageAvatar} source={avatarImage} />
        <View>
          <View style={styles.rowContainer}>
            <MaterialCommunityIcons
              name="clock-outline"
              color={colors.primaryLightBlackColor}
              size={scale(24)}
            />
            <Text style={styles.textTime}>09:00 AM - 10:00 AM</Text>
          </View>
          <View style={styles.rowContainer}>
            <AntDesign
              name="calendar"
              color={colors.primaryLightBlackColor}
              size={scale(24)}
            />
            <Text style={styles.textDate}>{currentDate}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderBookContent = () => {
    return (
      <View style={styles.bookContentContainer}>
        <View>
          <Text style={styles.textName}>Lindsey Johnson</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.textBook}>Hair Cut & Colour</Text>
            <View style={styles.hoursWrapper}>
              <Text style={styles.textHours}>1 hr</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.messageButtonContainer}
            activeOpacity={0.6}
            onPress={() => this.onSendMessage()}
          >
            <SimpleLineIcons
              name="bubble"
              color={colors.whiteColor}
              size={scale(16)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callButtonContainer}
            activeOpacity={0.6}
            onPress={() => this.onCallPhone()}
          >
            <SimpleLineIcons
              name="phone"
              color={colors.whiteColor}
              size={scale(16)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderBookingHistoryHeader = () => {
    return <Text style={styles.textName}>Lindsey Johnson Booking History</Text>;
  };

  renderBookingHistoryItem = ({ item }) => {
    return (
      <View style={styles.bookingHistoryItemContainer}>
        <Image style={styles.imageHistoryAvatar} source={item.avatar} />
        <Text style={styles.textHistoryDate}>{item.date}</Text>
      </View>
    );
  };

  renderBottomButtons = () => {
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.rowButtonsContainer}>
          <TouchableOpacity
            style={styles.bookingCancelButtonContainer}
            activeOpacity={0.6}
            onPress={() => this.onCacellBooking()}
          >
            <Text style={styles.textCancelBooking}>Booking Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paidButtonContainer}
            activeOpacity={0.6}
            onPress={() => this.onPaid()}
          >
            <Text style={styles.textPaid}>Paid R340</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.trackBotthButtonContainer}
          activeOpacity={0.6}
          onPress={() => this.onTrackBoth()}
        >
          <MaterialCommunityIcons
            name="account-multiple"
            color={colors.whiteColor}
            size={scale(20)}
          />
          <Text style={styles.textTrackBoth}>
            Track Both Parties Each Other
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <CalendarStrip
            style={styles.calendar}
            showMonth={false}
            calendarColor={colors.whiteColor}
            calendarHeaderStyle={{ color: colors.whiteColor }}
            dateNumberStyle={{ color: colors.primaryLightBlackOpacityColor }}
            dateNameStyle={{ color: colors.primaryLightBlackOpacityColor }}
            highlightDateNumberStyle={{ color: colors.whiteColor }}
            highlightDateNameStyle={{ color: colors.whiteColor }}
            daySelectionAnimation={{
              type: "background",
              duration: 200,
              highlightColor: colors.primaryColor,
            }}
            onDateSelected={date => this.onChangeDate(date)}
          />
          {this.renderBookDateTime()}
          {this.renderBookContent()}
          <View style={styles.bookingHistoryContainer}>
            {this.renderBookingHistoryHeader()}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dummyData.bookingHistory}
              renderItem={this.renderBookingHistoryItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {this.renderBottomButtons()}
        </ScrollView>
      </View>
    );
  }
}

export default Book;

Book.defaultProps = {};

Book.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    height: scale(100),
  },
  bookDateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(18),
    marginHorizontal: scale(12),
    borderTopWidth: scale(1),
    borderTopColor: colors.lightGrayColor4,
  },
  imageAvatar: {
    height: scale(85),
    width: scale(85),
    borderRadius: scale(43),
    borderWidth: scale(1),
    borderColor: colors.primaryColor,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: scale(3),
  },
  iconClock: {
    width: scale(20),
    height: scale(20),
  },
  textTime: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(14),
    color: colors.primaryLightBlackColor,
    alignItems: "center",
    marginLeft: scale(9),
  },
  textDate: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(16),
    color: colors.primaryColor,
    alignItems: "center",
    marginLeft: scale(7),
  },
  bookContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: scale(16),
    paddingBottom: scale(20),
    marginHorizontal: scale(12),
    borderTopWidth: scale(1),
    borderTopColor: colors.lightGrayColor4,
  },
  textName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(15),
    lineHeight: scale(28),
    color: colors.primaryColor,
  },
  textBook: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(14),
    lineHeight: scale(28),
    color: colors.primaryColor,
  },
  hoursWrapper: {
    backgroundColor: colors.primaryLightBlackColor,
    paddingVertical: scale(2),
    paddingHorizontal: scale(7),
    borderRadius: scale(2),
    marginLeft: scale(18),
    alignItems: "center",
    justifyContent: "center",
  },
  textHours: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(12),
    color: colors.whiteColor,
  },
  messageButtonContainer: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(18),
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  callButtonContainer: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(18),
    backgroundColor: colors.primaryLightBlackColor,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: scale(7),
  },
  bookingHistoryContainer: {
    paddingTop: scale(14),
    paddingBottom: scale(23),
    marginLeft: scale(12),
    borderTopWidth: scale(1),
    borderTopColor: colors.lightGrayColor4,
  },
  bookingHistoryItemContainer: {
    marginTop: scale(13),
    marginRight: scale(15),
    alignItems: "center",
  },
  imageHistoryAvatar: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    borderWidth: scale(1),
    borderColor: colors.primaryColor,
  },
  textHistoryDate: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(12),
    color: colors.primaryLightBlackColor,
    marginTop: scale(8),
  },
  bottomContainer: {
    paddingTop: scale(24),
    paddingBottom: scale(32),
    marginHorizontal: scale(12),
    borderTopWidth: scale(1),
    borderTopColor: colors.lightGrayColor4,
  },
  rowButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookingCancelButtonContainer: {
    width: scale(Math.round((WINDOWSIZE.width - 24) / 2 - 5)),
    height: scale(60),
    borderRadius: scale(2),
    backgroundColor: colors.lightGrayColor3,
    alignItems: "center",
    justifyContent: "center",
  },
  textCancelBooking: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    color: colors.primaryLightBlackColor,
  },
  paidButtonContainer: {
    width: scale(Math.round((WINDOWSIZE.width - 24) / 2 - 5)),
    height: scale(60),
    borderRadius: scale(2),
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  textPaid: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    color: colors.whiteColor,
  },
  trackBotthButtonContainer: {
    flexDirection: "row",
    width: "100%",
    height: scale(60),
    borderRadius: scale(2),
    backgroundColor: colors.primaryLightBlackColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(20),
  },
  textTrackBoth: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    color: colors.whiteColor,
    marginLeft: scale(8),
  },
});
