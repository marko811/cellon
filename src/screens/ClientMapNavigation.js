import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Ionicons from "react-native-vector-icons/Ionicons";

import NavButton from "../component/common/NavButton";

import scale from "../utils/scale";
import {
  colors,
  fonts,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
} from "../utils/Constants";
import dummyData from "../dummy";

class ClientMapNavigation extends Component {
  static navigationOptions = () => {
    return {
      title: "MAPME",
      headerRight: (
        <View style={styles.rowContainer}>
          <NavButton icon="laptop" onPress={() => alert("Pressed!")} />
          <NavButton icon="compass" onPress={() => alert("Pressed!")} />
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onGo = () => {
    alert("Pressed!");
  };

  onMore = () => {
    alert("Pressed!");
  };

  render() {
    // const { navigation } = this.props;
    // const locations = navigation.getParam("locations");
    const locations = dummyData.locations.directions;

    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            ...locations[0],
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker coordinate={locations[0]} />
          <Marker coordinate={locations[1]} />
          <MapViewDirections
            origin={locations[0]}
            destination={locations[1]}
            strokeWidth={3}
            strokeColor="hotpink"
            apikey={GOOGLE_MAPS_APIKEY}
          />
        </MapView>
        <View style={styles.backgroundContainer}>
          <View style={styles.topContainer}>
            <View style={styles.lineTopBorder} />
            <View>
              <View style={styles.rowContainer}>
                <Text style={styles.textInfo}>In 250m</Text>
                <Text style={styles.textInfo}>Turn right</Text>
              </View>
              <Text style={styles.textAddress}>Rue Coq Heronnent</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.7}
              onPress={() => this.onGo()}
            >
              <Ionicons style={styles.icon} name="md-arrow-round-forward" />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <View style={styles.rowContainer}>
                <Text style={styles.textLess}>Your destionation is at </Text>
                <Text style={styles.textValue}>430 Meters</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.textLess}>Less than </Text>
                <Text style={styles.textValue}>2 minutes</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.7}
              onPress={() => this.onMore()}
            >
              <Ionicons name="md-more" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ClientMapNavigation;

ClientMapNavigation.defaultProps = {};

ClientMapNavigation.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#000000C0",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topContainer: {
    height: scale(104),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: scale(65),
    left: scale(10),
    right: scale(5),
    paddingHorizontal: scale(20),
    borderRadius: scale(5),
    backgroundColor: colors.primaryColor,
  },
  textInfo: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(14),
    lineHeight: scale(30),
    color: colors.whiteColor,
    marginRight: scale(36),
  },
  textAddress: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(23),
    lineHeight: scale(33),
    color: colors.whiteColor,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: scale(20),
    left: scale(10),
    right: scale(5),
  },
  textLess: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(30),
    color: colors.whiteColor,
  },
  textValue: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(30),
    color: colors.primaryColor,
  },
  buttonContainer: {
    padding: scale(5),
  },
  icon: {
    fontSize: scale(30),
    color: colors.whiteColor,
  },
  lineTopBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    height: scale(6),
    width: scale(185),
    borderRadius: scale(5),
    backgroundColor: colors.whiteColor,
    opacity: 0.6,
  },
});
