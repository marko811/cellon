import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Rating } from "react-native-elements";

import { colors, fonts } from "../../utils/Constants";
import scale from "../../utils/scale";

export default class ReviewItem extends Component {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  };

  render() {
    const { avatar, rating, name, description } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={() => this.onPress()}
      >
        <Image style={styles.imageAvatar} source={avatar} />
        <View style={styles.mainContainer}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.textName}>{name}</Text>
            <Rating
              style={styles.rating}
              type="custom"
              imageSize={12}
              ratingColor={colors.whiteColor}
              ratingBackgroundColor="transparent"
              readonly
              startingValue={rating}
            />
          </View>
          <Text style={styles.textDescription}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ReviewItem.defaultProps = {
  rating: 0,
  onPress: () => {},
};

ReviewItem.propTypes = {
  avatar: PropTypes.number,
  rating: PropTypes.number,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: scale(12),
    paddingVertical: scale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: colors.lightGrayColor4,
  },
  imageAvatar: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: colors.primaryColor,
  },
  mainContainer: {
    flex: 1,
    marginLeft: scale(11),
  },
  userInfoContainer: {
    flexDirection: "row",
    marginTop: scale(3),
  },
  textName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    lineHeight: scale(14),
    color: colors.primaryLightBlackColor,
  },
  rating: {
    marginLeft: scale(10),
  },
  textDescription: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(10),
    lineHeight: scale(15),
    color: colors.primaryLightBlackColor,
  },
});
