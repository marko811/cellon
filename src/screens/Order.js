import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

import OrderItem from "../component/Order/OrderItem";
import { fonts, colors } from "../utils/Constants";
import scale from "../utils/scale";
import CommonStyles from "../utils/CommonStyles";
import dummyData from "../dummy";

class Order extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title");
    return {
      title,
      // drawerLabel: "Order",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./../assets/images/shopping-bag-2x.png")}
          style={[CommonStyles.icon, { tintColor }]}
        />
      ),
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

  onCallPhone = () => {
    alert("Phone Pressed!");
  };

  onSendMessage = () => {
    alert("Message Pressed!");
  };

  renderItem = ({ item }) => (
    <OrderItem
      {...item}
      onCallPhone={() => this.onCallPhone(item)}
      onSendMessage={() => this.onSendMessage(item)}
    />
  );

  render() {
    const { date } = this.state;
    const month = date.format("MMMM");
    const day = date.format("dddd");
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
          <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.textMonth}>{month}, </Text>
              <Text style={styles.textDay}>{day}</Text>
            </View>
            <FlatList
              data={dummyData.orders}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Order;

Order.defaultProps = {};

Order.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    height: scale(100),
  },
  mainContainer: {
    borderTopWidth: scale(1),
    borderTopColor: colors.lightGrayColor4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(11),
    paddingTop: scale(23),
    marginBottom: scale(10),
  },
  textMonth: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(15),
    color: colors.primaryLightBlackColor,
  },
  textDay: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(12),
    color: colors.primaryColor,
  },
});
