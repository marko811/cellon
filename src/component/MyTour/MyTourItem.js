import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Card } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import {
  colors,
  fonts,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  GOOGLE_MAPS_APIKEY,
} from "../../utils/Constants";
import scale from "../../utils/scale";

export default class SelectStylistItem extends Component {
  returnMap = () => {
    const { locations } = this.props;
    return (
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
          // onStart={params => {
          //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
          // }}
          // onReady={result => {
          //   console.log('Distance: ${result.distance} km')
          //   console.log('Duration: ${result.duration} min.')
          // }}
          // onError={errorMessage => {
          //   console.log("onError : ", errorMessage);
          // }}
        />
      </MapView>
    );
  };

  render() {
    const { name, serviceType, time, cadence, steps, onPress } = this.props;
    return (
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          {this.returnMap()}
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.8}
            onPress={() => onPress()}
          >
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textServiceType}>{serviceType}</Text>
            <View style={styles.rowContainer}>
              <MaterialCommunityIcons
                name="clock-outline"
                color={colors.primaryColor}
                size={scale(8)}
              />
              <Text style={styles.textTime}>{time}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.rowContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.textCount}>{cadence}</Text>
                <Text style={styles.textFieldName}>Cadence</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.textCount}>{steps}</Text>
                <Text style={styles.textFieldName}>Steps</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

SelectStylistItem.defaultProps = {
  time: "",
  serviceType: "",
  cadence: 0,
  steps: 0,
  locations: [],
  onPress: () => {},
};

SelectStylistItem.propTypes = {
  name: PropTypes.string.isRequired,
  serviceType: PropTypes.string,
  time: PropTypes.string,
  cadence: PropTypes.number,
  steps: PropTypes.number,
  locations: PropTypes.array,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: scale(156),
    marginLeft: scale(11),
    marginRight: scale(5),
    marginVertical: scale(10),
  },
  cardContainer: {
    flex: 1,
    borderRadius: scale(4),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 100,
    borderColor: "transparent",
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#000000C0",
    borderRadius: scale(4),
    paddingHorizontal: scale(20),
    paddingVertical: scale(30),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    lineHeight: scale(19),
    color: colors.whiteColor,
  },
  textServiceType: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(10),
    lineHeight: scale(19),
    color: colors.whiteColor,
  },
  textTime: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(8),
    lineHeight: scale(9),
    color: colors.primaryColor,
  },
  cellContainer: {
    marginRight: scale(38),
  },
  textCount: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    lineHeight: scale(11),
    color: colors.whiteColor,
  },
  textFieldName: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(10),
    lineHeight: scale(11),
    color: colors.lightGrayColor4,
  },
});
