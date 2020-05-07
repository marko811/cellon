import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Card } from "native-base";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { colors, fonts } from "../../utils/Constants";
import scale from "../../utils/scale";

export default class OrderItem extends Component {
  renderOrder = () => {
    const {
      duration,
      name,
      serviceType,
      paid,
      avatar,
      onCallPhone,
      onSendMessage,
    } = this.props;
    return (
      <Card style={styles.orderCardContainer}>
        <View style={styles.userInfoContainer}>
          <View>
            <Text style={styles.textDuration}>{duration}</Text>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textServiceType}>{serviceType}</Text>
          </View>
          <Image style={styles.imageAvatar} source={avatar} />
        </View>
        <View style={styles.paidContainer}>
          <Text style={styles.textPaid}>{paid}</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={() => onSendMessage()}
            >
              <SimpleLineIcons
                name="bubble"
                color={colors.primaryColor}
                size={scale(16)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.6}
              onPress={() => onCallPhone()}
            >
              <SimpleLineIcons
                name="phone"
                color={colors.primaryColor}
                size={scale(16)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  renderBreak = () => {
    const { duration, name, avatar } = this.props;
    return (
      <Card style={styles.breakCardContainer}>
        <Text style={styles.textDuration}>{duration}</Text>
        <Image style={styles.imageBreak} source={avatar} />
        <Text style={styles.textName}>{name}</Text>
      </Card>
    );
  };

  renderContent = () => {
    const { type } = this.props;
    if (type === "order") {
      return this.renderOrder();
    }
    return this.renderBreak();
  };

  render() {
    const { time } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.textTime}>{time}</Text>
        {this.renderContent()}
      </View>
    );
  }
}

OrderItem.defaultProps = {
  type: "order",
  serviceType: "",
  paid: "",
  onCallPhone: () => {},
  onSendMessage: () => {},
};

OrderItem.propTypes = {
  type: PropTypes.string,
  time: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  serviceType: PropTypes.string,
  paid: PropTypes.string,
  avatar: PropTypes.number,
  onCallPhone: PropTypes.func,
  onSendMessage: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: scale(12),
    marginVertical: scale(10),
  },
  orderCardContainer: {
    flex: 1,
    marginLeft: scale(10),
    borderRadius: scale(4),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 100,
    borderColor: "transparent",
  },
  breakCardContainer: {
    flex: 1,
    paddingTop: scale(19),
    paddingBottom: scale(22),
    marginLeft: scale(10),
    borderRadius: scale(4),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 100,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  imageAvatar: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    borderWidth: scale(1),
    borderColor: colors.primaryLightColor,
  },
  imageBreak: {
    height: scale(37),
    width: scale(37),
    borderRadius: scale(19),
    marginTop: scale(7),
  },
  textTime: {
    width: scale(35),
    fontFamily: fonts.robotoLight,
    fontSize: scale(12),
    lineHeight: scale(14),
    color: colors.primaryLightBlackColor,
  },
  userInfoContainer: {
    padding: scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: scale(1),
    borderBottomColor: colors.lightGrayColor4,
  },
  textDuration: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(10),
    lineHeight: scale(11),
    color: colors.primaryLightBlackColor,
  },
  textName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    lineHeight: scale(19),
    color: colors.primaryColor,
  },
  textServiceType: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(12),
    lineHeight: scale(19),
    color: colors.primaryColor,
  },
  paidContainer: {
    padding: scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textPaid: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    lineHeight: scale(14),
    color: colors.primaryColor,
  },
  rowContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    paddingHorizontal: scale(7),
  },
});
