import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { colors, fonts } from "../../utils/Constants";

export default class BigButton extends Component {
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onPress}
      >
        <Text style={styles.textTitle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

BigButton.defaultProps = {
  onPress: () => {},
  title: "",
};

BigButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 30,
  },
  textTitle: {
    fontFamily: fonts.sfproMedium,
    fontSize: 18,
    color: colors.whiteColor,
  },
});
