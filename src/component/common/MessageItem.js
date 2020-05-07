import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  View,
  Image,
} from "react-native";
import PropTypes from "prop-types";

import { colors, fonts } from "../../utils/Constants";
import scale from "../../utils/scale";

export default class MessageItem extends Component {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  };

  render() {
    const { containerStyle, avatar, title, message } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        activeOpacity={0.8}
        onPress={() => this.onPress()}
      >
        <Image style={styles.imageAvatar} source={avatar} />
        <View style={styles.mainConainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textMessage}>{message}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

MessageItem.defaultProps = {
  containerStyle: {},
  onPress: () => {},
};

MessageItem.propTypes = {
  containerStyle: ViewPropTypes.style,
  avatar: PropTypes.number,
  title: PropTypes.string,
  message: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: scale(10),
    padding: scale(10),
    borderRadius: scale(100),
    backgroundColor: colors.whiteColor,
  },
  imageAvatar: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(21),
  },
  mainConainer: {
    flex: 1,
    marginLeft: scale(9),
  },
  textTitle: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(14),
    lineHeight: scale(19),
    color: colors.primaryLightBlackColor,
  },
  textMessage: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(18),
    lineHeight: scale(21),
    color: colors.primaryLightBlackColor,
  },
});
