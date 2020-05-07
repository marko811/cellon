import React, { Component } from "react";
import { ViewPropTypes, Image } from "react-native";
import PropTypes from "prop-types";

import CommonStyles from "../../utils/CommonStyles";

const profileImage = require("../../assets/images/profile-2x.png");

export default class MenuItemIcon extends Component {
  render() {
    const { name, tintColor } = this.props;
    if (name === "account") {
      return (
        <Image
          style={[CommonStyles.icon, { tintColor }]}
          source={profileImage}
        />
      );
    }
    return null;
  }
}

MenuItemIcon.defaultProps = {
  iconStyle: {},
};

MenuItemIcon.propTypes = {
  iconStyle: ViewPropTypes.style,
  tintColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
