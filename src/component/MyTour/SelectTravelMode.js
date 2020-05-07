import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../utils/Constants";
import scale from "../../utils/scale";

const travelMode = ["car", "motorcycle", "bicycle"];

export default class SelectTravelMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: travelMode[0],
    };
  }

  onSelect = mode => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(mode);
    }
    this.setState({ selectedMode: mode });
  };

  render() {
    const { containerStyle } = this.props;
    const { selectedMode } = this.state;
    return (
      <View style={[styles.container, containerStyle]}>
        {travelMode.map((travel, index) => {
          const backgroundColor =
            selectedMode === travel ? colors.primaryColor : "transparent";
          return (
            <TouchableOpacity
              key={index}
              style={styles.cellContainer}
              activeOpacity={0.8}
              onPress={() => this.onSelect(travel)}
            >
              <FontAwesome name={travel} style={styles.icon} />
              <View style={[styles.bottomLine, { backgroundColor }]} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

SelectTravelMode.defaultProps = {
  containerStyle: {},
  onSelect: () => {},
};

SelectTravelMode.propTypes = {
  containerStyle: ViewPropTypes.style,
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cellContainer: {
    marginHorizontal: scale(25),
    alignItems: "center",
  },
  icon: {
    fontSize: scale(24),
    color: colors.whiteColor,
  },
  bottomLine: {
    marginTop: scale(5),
    height: scale(3),
    width: "100%",
    borderRadius: scale(3),
  },
});
