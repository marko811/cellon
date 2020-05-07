import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import NavButton from "../component/common/NavButton";
import SelectTravelMode from "../component/MyTour/SelectTravelMode";

import scale from "../utils/scale";
import {
  colors,
  fonts,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
} from "../utils/Constants";
import dummyData from "../dummy";

class MyTourFullMap extends Component {
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
    alert("Go Pressed!");
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
            <SelectTravelMode />
            <View style={styles.addressContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.textField}>Depart: </Text>
                <Text style={styles.textAddress}>
                  708 Eloisa Island Milton Ville
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.textField}>Arrive: </Text>
                <Text style={styles.textAddress}>70 Bahringer Loaf Boston</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <View style={styles.rowContainer}>
                <Text style={styles.textLess}>Less than </Text>
                <Text style={styles.textValue}>45 minutes</Text>
              </View>
              <Text style={styles.textValue}>30 Kilometers</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.7}
              onPress={() => this.onGo()}
            >
              <Text style={styles.textButton}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default MyTourFullMap;

MyTourFullMap.defaultProps = {};

MyTourFullMap.propTypes = {
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
    justifyContent: "center",
    position: "absolute",
    top: scale(30),
    left: 0,
    right: 0,
  },
  addressContainer: {
    marginHorizontal: scale(30),
    marginTop: scale(17),
    alignItems: "flex-start",
  },
  textField: {
    flex: 1,
    fontFamily: fonts.robotoMedium,
    fontSize: scale(18),
    lineHeight: scale(40),
    color: colors.lightGrayColor1,
  },
  textAddress: {
    flex: 4,
    fontFamily: fonts.robotoMedium,
    fontSize: scale(18),
    lineHeight: scale(40),
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
  buttonContainer: {},
  textButton: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(25),
    color: colors.primaryColor,
  },
});
