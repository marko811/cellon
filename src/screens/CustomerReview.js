import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import PropTypes from "prop-types";
import { Rating } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import NavButton from "../component/common/NavButton";
import ReviewItem from "../component/Review/ReviewItem";
import ReviewWrite from "../component/Review/ReviewWrite";
import scale from "../utils/scale";
import { fonts, colors } from "../utils/Constants";
import dummyData from "../dummy";

const avatarImage = require("./../assets/images/Oval-2x.png");

class CustomerReview extends Component {
  static navigationOptions = () => ({
    headerRight: (
      <NavButton
        containerStyle={styles.navButtonContainer}
        icon="camera"
        onPress={() => alert("Pressed!")}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      reviewText: "",
      reviews: dummyData.customreReview,
    };
  }

  onSendEmail = () => {
    alert("Message Pressed!");
  };

  onSelectItem = () => {
    alert("Item Pressed!");
  };

  onSend = () => {
    const { reviews, reviewText } = this.state;
    reviews.unshift({
      avatar: avatarImage,
      rating: 4.8,
      name: "Nelle Phillips",
      description: reviewText,
    });
    this.setState({ reviews, reviewText: "" });
  };

  renderUserBio = () => {
    return (
      <View style={styles.topContainer}>
        <View style={styles.topMainContainer}>
          <View style={styles.rowContainer}>
            <Image style={styles.imageAvatar} source={avatarImage} />
            <View style={styles.userInfoContainer}>
              <Text style={styles.textName}>Nelle Phillips</Text>
              <Text style={styles.textService}>Hair style</Text>
            </View>
          </View>
          <View style={styles.userReviewContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.textJobs}>Jobs Done</Text>
              <Text style={styles.textJobsCount}>130</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textRating}>Rating 4.8</Text>
              <Rating
                style={styles.rating}
                type="custom"
                imageSize={12}
                ratingColor={colors.whiteColor}
                ratingBackgroundColor="transparent"
                readonly
                startingValue={4.8}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.emailButtonContainer}
          activeOpacity={0.7}
          onPress={() => this.onSendEmail()}
        >
          <MaterialCommunityIcons
            name="email-outline"
            color={colors.whiteColor}
            size={scale(17)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderReviewHeader = () => {
    const { reviews } = this.state;
    return (
      <View style={styles.listHeaderContainer}>
        <Text style={styles.textListHeader}>
          {reviews.length} Recommendations
        </Text>
      </View>
    );
  };

  renderItem = ({ item }) => (
    <ReviewItem {...item} onPress={() => this.onSelectItem(item)} />
  );

  render() {
    const { reviewText, reviews } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {this.renderUserBio()}
          <FlatList
            data={reviews}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this.renderReviewHeader}
            renderItem={this.renderItem}
            extraData={this.state}
          />
        </ScrollView>
        <ReviewWrite
          value={reviewText}
          onChangeText={value => this.setState({ reviewText: value })}
          onSend={() => this.onSend()}
        />
      </View>
    );
  }
}

export default CustomerReview;

CustomerReview.defaultProps = {};

CustomerReview.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navButtonContainer: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: colors.whiteColor,
    marginHorizontal: scale(10),
    paddingHorizontal: 0,
  },
  topContainer: {
    paddingBottom: scale(20),
  },
  topMainContainer: {
    backgroundColor: colors.primaryColor,
    paddingTop: scale(20),
    paddingBottom: scale(43),
    paddingHorizontal: scale(12),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageAvatar: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(40),
    borderWidth: scale(1),
    borderColor: colors.primaryLightColor,
  },
  userInfoContainer: {
    marginLeft: scale(15),
  },
  textName: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.whiteColor,
  },
  textService: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(12),
    lineHeight: scale(14),
    color: colors.whiteColor,
  },
  userReviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: scale(17),
    marginTop: scale(20),
  },
  textJobs: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    color: colors.whiteColor,
  },
  textJobsCount: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(14),
    color: colors.whiteColor,
    marginLeft: scale(8),
  },
  textRating: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(12),
    color: colors.whiteColor,
  },
  rating: {
    marginLeft: scale(10),
  },
  emailButtonContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: colors.primaryLightBlackColor,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: scale(17),
    bottom: 0,
  },
  listHeaderContainer: {
    marginTop: scale(11),
    marginBottom: scale(14),
    paddingHorizontal: scale(12),
  },
  textListHeader: {
    fontFamily: fonts.robotoMedium,
    fontSize: scale(18),
    color: colors.primaryColor,
  },
});
