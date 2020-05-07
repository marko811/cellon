import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Ionicons from "react-native-vector-icons/Ionicons";

import NavButton from "../component/common/NavButton";
import MessageItem from "../component/common/MessageItem";
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

class ClientMap extends Component {
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
            <MessageItem {...dummyData.message} />
            <SelectTravelMode />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.textLess}>Less than </Text>
              <Text style={styles.textValue}>22 minutes</Text>
            </View>
            <View style={styles.bottomRowContainer}>
              <View>
                <Text style={styles.textAddress}>Altenwerthbury</Text>
                <Text style={styles.textAddress}>
                  184 Franecki Meadows Suite 332
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.7}
                onPress={() => this.onGo()}
              >
                <Ionicons name="md-arrow-round-up" style={styles.iconArrow} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ClientMap;

ClientMap.defaultProps = {};

ClientMap.propTypes = {
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
  bottomRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topContainer: {
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  textAddress: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(18),
    lineHeight: scale(40),
    color: colors.whiteColor,
  },
  bottomContainer: {
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
  iconArrow: {
    fontSize: scale(30),
    color: colors.whiteColor,
  },
});
