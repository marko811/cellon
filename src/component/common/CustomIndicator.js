import React, { Component } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../utils/Constants";

export default class CustomIndicator extends Component {
  render() {
    const { status } = this.props;
    return (
      <React.Fragment>
        {status && (
          <View style={styles.container}>
            <ActivityIndicator
              animating={status}
              size="large"
              color={colors.activityIndicatorGrayColor}
            />
            <Text>loading</Text>
          </View>
        )}
      </React.Fragment>
    );
  }
}

CustomIndicator.defaultProps = {
  status: false,
};

CustomIndicator.propTypes = {
  status: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: colors.blackOpacityColor4,
    alignItems: "center",
  },
});
