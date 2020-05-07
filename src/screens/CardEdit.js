import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Card } from "native-base";
import { Rating } from "react-native-elements";
import ProgressCircle from "react-native-progress-circle";
import { connect } from "react-redux";
import CommonStyles from "../utils/CommonStyles";
import scale, { verticalScale } from "./../utils/scale";
import { fonts, colors } from "./../utils/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";

class CardEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNo: "",
      profilePhotoSource: null,
      focused: ""
    };
  }
  static navigationOptions = {
    drawerLabel: "CardEdit",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/profile-2x.png")}
        style={[CommonStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Ionicons
              name={"ios-arrow-back"}
              size={scale(30)}
              color={colors.whiteColor}
            />
            <Text style={styles.backText}>{"Back"}</Text>
          </TouchableOpacity>
          {/* <Text>{this.props.user.name}</Text> */}
          <Text style={styles.backTitle}>{"Linsey"}</Text>
        </View>
        <View style={styles.paymentCardContainer}>
          <View>
            <View style={styles.secondCardImageStyle}>
              <View style={styles.secondCardTextContainer}>
                <View style={styles.flexDirection}>
                  <Icon name={"edit"} style={styles.paymentSecureIcon} />
                  <Text style={styles.secondCardText}>{"Edit Card"}</Text>
                </View>
                <View style={styles.flexDirection}>
                  <Icon name={"trash"} style={styles.paymentSecureIcon} />
                  <Text style={styles.secondCardText}>{"Delete Card"}</Text>
                </View>
              </View>
            </View>
            <Image
              style={styles.cardImageStyle}
              resizeMode="stretch"
              source={require("./../assets/images/personal_card.png")}
            />
          </View>
        </View>
      </View>
    );
  }
}

mapStateToProps = ({ auth }) => ({
  ...auth
});

export default connect(
  mapStateToProps,
  null
)(CardEdit);

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: "row"
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  header: {
    height: scale(50),
    backgroundColor: colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  backIconContainer: {
    flexDirection: "row",
    position: "absolute",
    left: scale(10),
    alignItems: "center"
  },
  backText: {
    fontFamily: fonts.sfproDisplayRegular,
    fontSize: scale(17),
    color: colors.whiteColor,
    marginLeft: scale(10)
  },
  backTitle: {
    fontFamily: fonts.sfproDisplayRegular,
    fontSize: scale(17),
    color: colors.whiteColor
  },
  paymentCardContainer: {
    marginLeft: scale(30),
    marginRight: scale(60),
    marginTop: scale(50),
    position: "relative"
  },
  cardImageStyle: {
    height: scale(150),
    width: "100%",
    alignSelf: "stretch",
    borderRadius: scale(10),
    position: "absolute"
  },
  secondCardImageStyle: {
    height: scale(150),
    width: "100%",
    borderRadius: scale(10),
    marginTop: scale(40),
    marginLeft: scale(30),
    position: "absolute",
    backgroundColor: colors.lightGrayColor1,
  },
  secondCardTextContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
    margin: 15
  },
  secondCardText: {
    color: colors.whiteColor,
    fontSize: 12
  },
  paymentSecureIcon: {
    color: colors.whiteColor,
    marginHorizontal: 5,
    marginTop: 1.5
  }
});
