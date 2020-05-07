import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { colors } from "../../utils/Constants";
import scale from "../../utils/scale";

const menuIcon = require("../../assets/images/menu-2x.png");

export default class NavButton extends Component {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  };

  renderContent() {
    const { iconStyle, icon } = this.props;
    switch (icon) {
      case "menu":
        return <Image style={styles.iconMenu} source={menuIcon} />;
      case "camera":
        return (
          <SimpleLineIcons
            name="camera"
            style={[styles.iconCamera, iconStyle]}
          />
        );
      case "compass":
        return (
          <SimpleLineIcons name="compass" style={[styles.icon, iconStyle]} />
        );
      case "handbag":
        return (
          <SimpleLineIcons name="handbag" style={[styles.icon, iconStyle]} />
        );
      case "laptop":
        return <AntDesign name="laptop" style={[styles.icon, iconStyle]} />;
      case "search":
        return <Ionicons name="ios-search" style={[styles.icon, iconStyle]} />;
      default:
    }
    return null;
  }

  render() {
    const { containerStyle } = this.props;
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, containerStyle]}
        activeOpacity={0.6}
        onPress={() => this.onPress()}
      >
        {this.renderContent()}
      </TouchableOpacity>
    );
  }
}

NavButton.defaultProps = {
  containerStyle: {},
  iconStyle: {},
  onPress: () => {},
};

NavButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  iconStyle: Text.propTypes.style,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(10),
  },
  iconCamera: {
    fontSize: scale(12),
    color: colors.primaryColor,
  },
  icon: {
    fontSize: scale(20),
    color: colors.whiteColor,
  },
  iconMenu: {
    width: scale(25),
    height: scale(13),
    tintColor: colors.whiteColor,
  },
});
