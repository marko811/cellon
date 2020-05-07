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
            <View style={styles.line} />
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.circleMark} />
              <Text style={styles.textGoAddress}>Lindsey Johnson Home</Text>
            </View>
            <View style={styles.rowContainer}>
              <Ionicons name="md-trending-up" style={styles.iconTrending} />
              <View style={styles.instructionContainer}>
                <Text style={styles.textGoInstruction}>
                  In 20m Trun right then straight
                </Text>
                <Text style={styles.textGoAddress}>Rue de Saint Honore</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Ionicons name="md-arrow-round-back" style={styles.icon} />
              <View style={styles.instructionContainer}>
                <Text style={styles.textGoInstruction}>In 50m Turn left</Text>
                <Text style={styles.textGoAddress}>Avenue de Charles d.</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Ionicons name="md-arrow-round-forward" style={styles.icon} />
              <View style={styles.instructionContainer}>
                <Text style={styles.textGoInstruction}>In 250m Turn right</Text>
                <Text style={styles.textGoAddress}>Rue Coq Heronnent</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <View style={styles.rowContainer}>
                <Text style={styles.textLess}>Your destionation is at </Text>
                <Text style={styles.textValue}>700m</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.textLess}>In 2 minutes you are </Text>
                <Text style={styles.textValue}>Lindsey</Text>
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
    justifyContent: "center",
    marginTop: scale(17),
    marginLeft: scale(28),
    marginRight: scale(28),
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
  line: {
    height: scale(4),
    width: "100%",
    borderRadius: scale(2),
    backgroundColor: colors.whiteColor,
    marginTop: scale(20),
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(20),
    marginLeft: scale(10),
    marginRight: scale(5),
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
  iconTrending: {
    fontSize: scale(30),
    color: colors.whiteColor,
    transform: [{ rotate: "-45deg" }],
  },
  mainContainer: {
    flex: 1,
    marginVertical: scale(40),
    marginLeft: scale(70),
  },
  circleMark: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: colors.greenColor,
    marginRight: scale(18),
  },
  textGoInstruction: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(15),
    lineHeight: scale(25),
    color: colors.whiteColor,
  },
  textGoAddress: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(30),
    color: colors.whiteColor,
  },
  instructionContainer: {
    marginLeft: scale(10),
    marginVertical: scale(15),
  },
});
