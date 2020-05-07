import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import PropTypes from "prop-types";

import MyTourItem from "../component/MyTour/MyTourItem";
import scale from "../utils/scale";
import { colors, fonts } from "../utils/Constants";
import dummyData from "../dummy";

const avatarImage = require("./../assets/images/Oval-2x.png");

class MyTour extends Component {
  static navigationOptions = {
    title: "Nelle Phillips Tour",
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSelectItem = item => {
    const { navigation } = this.props;
    navigation.navigate("MyTourFullMap", { locations: item.locations });
  };

  renderItem = ({ item }) => (
    <MyTourItem {...item} onPress={() => this.onSelectItem(item)} />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.textDate}>Today, 12 March</Text>
          <Image style={styles.imageAvatar} source={avatarImage} />
        </View>
        <FlatList
          data={dummyData.myTour}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default MyTour;

MyTour.defaultProps = {};

MyTour.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: scale(62),
    flexDirection: "row",
    marginLeft: scale(11),
    marginRight: scale(5),
    marginBottom: scale(10),
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: scale(1),
    borderBottomColor: colors.lightGrayColor4,
  },
  textDate: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(15),
    lineHeight: scale(18),
    color: colors.primaryLightBlackColor,
  },
  imageAvatar: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: colors.primaryLightColor,
  },
});
