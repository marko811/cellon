import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { FlatList } from "react-native-gesture-handler";
import scale from "../utils/scale";
import CommonStyles from "../utils/CommonStyles";
import CustomHeader from "../component/common/CustomHeader";
import { fonts, colors, GOOGLE_MAPS_APIKEY } from "../utils/Constants";

const { width, height } = Dimensions.get("window");
const AnimatedViewHeight = height * 0.7;
const ASPECT_RATIO = width / height;
const LATITUDE = -26.195246;
const LONGITUDE = 28.034088;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const latlongs = [
  {
    latitude: -26.195929,
    longitude: 28.02867,
  },
  {
    latitude: -26.169079,
    longitude: 28.046666,
  },
];

class ConfirmJobStart extends Component {
  static navigationOptions = {
    drawerLabel: "ConfirmJobStart",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/profile-2x.png")}
        style={[CommonStyles.icon, { tintColor }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedCardValue: new Animated.Value(-1 * AnimatedViewHeight * 0.57),
      isCardUp: true,
      isSuccess: false,
      successId: 0,
    };
  }

  cardUp = () => {
    Animated.timing(this.state.animatedCardValue, {
      toValue: -1 * AnimatedViewHeight * 0.57,
      duration: 500,
    }).start();
  };

  cardDown = () => {
    Animated.timing(this.state.animatedCardValue, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  handleAnimation = () => {
    const { isCardUp } = this.state;
    if (isCardUp) {
      this.cardDown();
    } else {
      this.cardUp();
    }
    this.setState({ isCardUp: !isCardUp });
  };

  checkSuccessStatus = () => {
    const { isSuccess, successId } = this.state;
    const { navigation } = this.props;
    if (global.isClient) {
      if (isSuccess) {
        navigation.navigate("PayAndFeedback");
      } else {
        this.setState({
          isSuccess: true,
        });
      }
    } else if (successId >= 2) {
      navigation.navigate("PayAndFeedback");
    } else {
      this.setState({
        successId: successId + 1,
      });
    }
  };

  renderItem = () => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PreviewFullScreen")}
        style={styles.itemContainer}
      >
        <Image source={require("./../assets/images/rectangle3.png")} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} title="Our Services" leftIcon={true}/>
        <View style={{ flex: 1, backgroundColor: colors.pinkColor, alignItems: "center" }}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <Marker coordinate={latlongs[0]} />
            <Marker coordinate={latlongs[1]} />
            <MapViewDirections
              origin={latlongs[0]}
              destination={latlongs[1]}
              strokeWidth={3}
              strokeColor="hotpink"  
              apikey={GOOGLE_MAPS_APIKEY}
            />
          </MapView>
          <Animated.View style={{
            bottom: this.state.animatedCardValue,
            height: AnimatedViewHeight,
            width: "90%",
            backgroundColor: colors.whiteColor,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            position: "absolute"
          }}>
            <TouchableOpacity activeOpacity={1}
              style={styles.imageWrapper}
              onPress={() => this.handleAnimation()}
            >
              <View style={styles.imageContainer}>
                <View style={{ position: "absolute", top: 5, right: 10, flexDirection: "row" }}><Text>4.5</Text>
                  <Image
                    style={{ width: 11, height: 11, marginLeft: 1, alignSelf: "center" }}
                    source={require("./../assets/images/star.png")}
                  />
                </View>
                <Image style={{ height: 50, width: 50, alignSelf: "center" }} source={require("../assets/images/Oval-2x.png")} />
                <View
                  style={{ marginLeft: 10, justifyContent: "space-around", fontFamily: fonts.sfproMedium }}>
                  <Text style={{ fontFamily: fonts.sfproMedium }}>{"Nelle Phillips"}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 0 }}>
                    <Text style={{ fontFamily: fonts.sfproBold, fontSize: 14, color: colors.primaryLightBlackColor }}>

                      <Text style={{ color: colors.primaryColor }}>{"R 340"}</Text>
                      {" 5 m"}
                    </Text>
                    <Image
                      style={{ width: 10, height: 10, marginLeft: 4, marginTop: 2 }}
                      source={require("./../assets/images/clock-circular-outline-2x.png")}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.previousWorkTextStyle}>
                {"Previous Work"}
              </Text>
              <FlatList
                style={styles.flatListContainer}
                data={[1,2,3,4,5,6,7,8,9]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=>this.renderItem(item)}
              />
            </View>
            <View style={{ height: AnimatedViewHeight * 0.83 }}>

              {(this.state.isSuccess && global.isClient) || (this.state.successId == 2 && !global.isClient) ? (
                <View style={{ padding: 10, justifyContent: "center" }}>
                  <Text style={{ fontSize: 16, fontFamily: fonts.sfproMedium, alignContent: "center", alignSelf: "center" }}>{"Please confirm job success"}</Text>
                </View>
              ) : ((!this.state.isSuccess && global.isClient) || (this.state.successId == 0 && !global.isClient)) ? (
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16, fontFamily: fonts.sfproMedium, alignContent: "center", marginTop: 10 }}>{"Metal-Alloy Rectangular Eyeglasses"}</Text>
                  <Text style={{ fontSize: 14, fontFamily: fonts.sfproRegular, alignContent: "center", marginVertical: 15 }}>{"For many women, visiting the skin care aisle at the drugstore can be as intimidating as ordering from all the complicated hot beverages"}</Text>
                  <Text style={{ fontSize: 16, fontFamily: fonts.sfproMedium, alignContent: "center", alignSelf: "center" }}>{"Please confirm the start of work"}</Text>
                </View>
              ) : (
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text style={{ fontSize: 16, fontFamily: fonts.sfproMedium, alignContent: "center", marginTop: 10 }}>{"Metal-Alloy Rectangular Eyeglasses"}</Text>
                      <Text style={{ fontSize: 14, fontFamily: fonts.sfproRegular, alignContent: "center", marginVertical: 15 }}>{"For many women, visiting the skin care aisle at the drugstore can be as intimidating as ordering from all the complicated hot beverages"}</Text>
                      <Text style={{ fontSize: 16, fontFamily: fonts.sfproMedium, alignContent: "center", alignSelf: "center" }}>{"Please confirm the order"}</Text>
                    </View>
                  )}
              <View >
                <TouchableOpacity
                  onPress={() => { this.checkSuccessStatus() }}
                  style={{ width: "90%", alignItems: "center", alignSelf: "center", marginTop: 20, backgroundColor: colors.primaryColor, paddingVertical: 15, borderRadius: 30 }}>
                  <Text style={{ fontFamily: fonts.sfproMedium, fontSize: 18, color: colors.whiteColor }}>{"Confirm"}</Text>
                </TouchableOpacity>
                {(this.state.successId != 1) ?
                  <TouchableOpacity
                    onPress={() => { this.props.navigation.goBack() }}
                    style={{ width: "90%", alignItems: "center", alignSelf: "center", marginTop: 10, marginBottom: 20, backgroundColor: colors.whiteColor, paddingVertical: 15, borderRadius: 30, borderColor: colors.blackOpacityColor2, borderWidth: 1 }}>
                    <Text style={{ fontFamily: fonts.sfproMedium, fontSize: 18, color: colors.grayColor }}>{global.isClient ? "Deny" : "Cancel"}</Text>
                  </TouchableOpacity> : <View style={{width:"100%",height:20}}/>}

              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default ConfirmJobStart;

ConfirmJobStart.defaultProps = {};

ConfirmJobStart.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    height: AnimatedViewHeight * 0.17,
    borderBottomWidth: 1,
    borderBottomColor: colors.blackOpacityColor2,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
  },
  flatListContainer: {
    marginHorizontal: scale(15),
  },
  previousWorkTextStyle: {
    fontFamily: fonts.sfproMedium,
    fontSize: scale(16),
    margin: scale(15),
  },
  itemContainer: {
    marginRight: scale(8),
  },
});
