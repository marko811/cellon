import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { connect } from "react-redux";
import CommonStyles from "../utils/CommonStyles";
import CustomHeader from "../component/common/CustomHeader";
import scale, { verticalScale } from "./../utils/scale";
import { fonts, colors } from "./../utils/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginInputView from "./../component/common/LoginInputView";
import ImagePicker from "react-native-image-picker";
import { updateProfileRequest } from "../actions/auth";

const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
class Profile extends Component {
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
    drawerLabel: "Profile",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/profile-2x.png")}
        style={[CommonStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  changeProfilePhoto() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          profilePhotoSource: response
        });
      }
    });
  }

  updateProfile() {
    this.props.updateProfile({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      old_email: this.props.user.email,
      new_email: this.state.emailAddress,
      phone_number: this.state.phoneNo,
      image: ""
    });
  }

  renderFormView() {
    return (
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={
              this.state.profilePhotoSource
                ? { uri: this.state.profilePhotoSource.uri }
                : require("./../assets/images/Oval-2x.png")
            }
          />
          <View style={styles.imageTextContainer}>
            <Image
              source={require("./../assets/images/camera.png")}
              style={styles.cameraImage}
            />
            <Text
              style={styles.changeProfileText}
              onPress={() => {
                this.changeProfilePhoto();
              }}
            >
              {"Change Profile Photo"}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: scale(300),
            width: "100%",
            marginVertical: 0,
            justifyContent: "space-evenly",
            backgroundColor: "transparent"
          }}
        >
          <View>
            <LoginInputView
              ref="firstName"
              childRef="firstName"
              label={"FIRST NAME"}
              value={this.state.firstName}
              placeholderTextColor={
                this.state.focused == "firstName"
                  ? colors.primaryColor
                  : colors.lightGrayColor1
              }
              borderBottomColor={
                this.state.focused == "firstName"
                  ? colors.primaryLightBlackColor
                  : colors.blackOpacityColor4
              }
              activeLabelColor={colors.primaryLightBlackColor}
              onChangeText={firstName => {
                this.setState({
                  firstName: firstName
                });
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.refs.lastName.refs.lastName.focus();
              }}
              onFocus={() => {
                this.setState({
                  focused: "firstName"
                });
              }}
              onBlur={() => {
                this.setState({
                  focused: ""
                });
              }}
            />
          </View>
          <LoginInputView
            ref="lastName"
            childRef="lastName"
            label={"LAST NAME"}
            value={this.state.lastName}
            placeholderTextColor={
              this.state.focused == "lastName"
                ? colors.primaryColor
                : colors.lightGrayColor1
            }
            borderBottomColor={
              this.state.focused == "lastName"
                ? colors.primaryLightBlackColor
                : colors.blackOpacityColor4
            }
            activeLabelColor={colors.primaryLightBlackColor}
            onChangeText={lastName => {
              this.setState({
                lastName: lastName
              });
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              this.refs.emailAddress.refs.emailAddress.focus();
            }}
            onFocus={() => {
              this.setState({
                focused: "lastName"
              });
            }}
            onBlur={() => {
              this.setState({
                focused: ""
              });
            }}
          />
          <View style={styles.inputContainer}>
            <LoginInputView
              ref="emailAddress"
              childRef="emailAddress"
              label={"EMAIL ADDRESS"}
              value={this.state.emailAddress}
              placeholderTextColor={
                this.state.focused == "emailAddress"
                  ? colors.primaryColor
                  : colors.lightGrayColor1
              }
              borderBottomColor={
                this.state.focused == "emailAddress"
                  ? colors.primaryLightBlackColor
                  : colors.blackOpacityColor4
              }
              activeLabelColor={colors.primaryLightBlackColor}
              onChangeText={emailAddress => {
                this.setState({
                  emailAddress: emailAddress
                });
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.refs.phoneNo.refs.phoneNo.focus();
              }}
              onFocus={() => {
                this.setState({
                  focused: "emailAddress"
                });
              }}
              onBlur={() => {
                this.setState({
                  focused: ""
                });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <LoginInputView
              ref="phoneNo"
              childRef="phoneNo"
              label={"PHONE NUMBER"}
              value={this.state.phoneNo}
              placeholderTextColor={
                this.state.focused == "phoneNo"
                  ? colors.primaryColor
                  : colors.lightGrayColor1
              }
              borderBottomColor={
                this.state.focused == "phoneNo"
                  ? colors.primaryLightBlackColor
                  : colors.blackOpacityColor4
              }
              activeLabelColor={colors.primaryLightBlackColor}
              keyboardType={"numeric"}
              onChangeText={phoneNo => {
                this.setState({
                  phoneNo: phoneNo
                });
              }}
              returnKeyType="next"
              onSubmitEditing={() => {}}
              onFocus={() => {
                this.setState({
                  focused: "phoneNo"
                });
              }}
              onBlur={() => {
                this.setState({
                  focused: ""
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }

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
          <View style={styles.titleContainer}>
            <Image
              source={require("./../assets/images/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.titleText}>{"Profile"}</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.profileContainer}>
            {this.renderFormView()}
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.updateProfile();
                }}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonTextStyle}>{"Save Changes"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

mapStateToProps = ({ auth }) => ({
  ...auth
});

export default connect(
  mapStateToProps,
  {
    updateProfile: updateProfileRequest
  }
)(Profile);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  header: {
    height: scale(70),
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  userImage: {
    height: scale(18),
    width: scale(16)
  },
  titleText: {
    fontFamily: fonts.sfproDisplayBold,
    fontSize: scale(18),
    color: colors.whiteColor,
    marginLeft: scale(10)
  },
  imageContainer: {
    height: scale(170),
    backgroundColor: colors.primaryColor,
    alignItems: "center"
  },
  imageStyle: {
    height: scale(110),
    width: scale(110),
    borderRadius: scale(55)
  },
  imageTextContainer: {
    flexDirection: "row",
    marginTop: scale(22),
    alignItems: "center"
  },
  cameraImage: {
    height: scale(12),
    width: scale(12)
  },
  changeProfileText: {
    fontFamily: fonts.sfproRegular,
    fontSize: scale(14),
    color: colors.whiteColor,
    marginLeft: scale(5)
  },
  profileContainer: {
    flex: 1
  },
  inputContainer: {},
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(40)
  },
  buttonStyle: {
    backgroundColor: colors.primaryColor,
    alignSelf: "stretch",
    marginHorizontal: scale(25),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(14),
    borderRadius: scale(25)
  },
  buttonTextStyle: {
    fontFamily: fonts.sfproDisplayMedium,
    fontSize: scale(18),
    color: colors.whiteColor
  }
});
