import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { CheckBox } from "react-native-elements";
import { colors, WINDOWSIZE, fonts } from "../utils/Constants";
const { height, width } = Dimensions.get("window");
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

import { signupRequest } from "../actions/auth";
import LoginInputView from "../component/common/LoginInputView";

import {
  validateEmail,
  validatePassword,
  valideConfrimPwd
} from "../utils/validate";
import CustomIndicator from "../component/common/CustomIndicator";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmServiceChecked: false,
      loginUsername: "",
      loginPassword: "",
      loginFullName: "",
      loginConfirmPassword: "",
      loginUsernameLabelColor: colors.primaryColor,
      loginPasswordLabelColor: colors.primaryColor,
      loginConfirmPasswordLabelColor: colors.primaryColor,
      loginFullNameLabelColor: colors.primaryColor,
      loginUsernameBorderColor: colors.blackOpacityColor4,
      loginPasswordBorderColor: colors.blackOpacityColor4,
      activePasswordLabelColor: colors.blackOpacityColor4,
      activeUsernameLabelColor: colors.blackOpacityColor4,
      loginFullNameBorderColor: colors.blackOpacityColor4,
      loginConfirmPasswordBorderColor: colors.blackOpacityColor4,
      activeFullNameLabelColor: colors.blackOpacityColor4,
      activeConfirmPasswordLabelColor: colors.blackOpacityColor4,
      isClient: true
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const { user: prevUser } = prevProps;
    if (user !== prevUser && user) {
      Alert.alert(
        "Information",
        "Sign Up Success! Try Sign In",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.navigate("SignIn");
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  checkValidation = () => {
    if (!this.state.loginFullName || this.state.loginFullName === "") {
      alert("Invalid FullName");
    } else if (!validateEmail(this.state.loginUsername)) {
      alert("Invalid email");
    } else if (!validatePassword(this.state.loginPassword)) {
      alert("Password must contain at least 8 characters");
    } else if (
      !valideConfrimPwd(
        this.state.loginPassword,
        this.state.loginConfirmPassword
      )
    ) {
      alert("Password and confirm password does not match");
    } else if (!this.state.confirmServiceChecked) {
      alert("Confirm the Terms and Service");
    } else {
      return true;
    }
  };

  register() {
    if (!this.checkValidation()) {
      return;
    }
    let type = this.state.isClient ? 0 : 1;
    let userInfo = {
      name: this.state.loginFullName,
      email: this.state.loginUsername,
      password: this.state.loginPassword,
      type: type,
      phone: "12345678"
    };
    const { register } = this.props;

    register(userInfo);
  }

  onPressConfrim() {
    this.register();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={-300}>
        <ScrollView contentContainerStyle={{ backgroundColor: "transparent" }}>
          <View style={{ paddingVertical: 0 }}>
            <View
              style={{
                height: WINDOWSIZE.height / 7,
                marginVertical: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
            >
              <Image
                style={styles.mainLogo}
                source={require("./../assets/images/CellOn_PNG.png")}
              />
            </View>
            <View
              style={{
                height: WINDOWSIZE.height / 4,
                marginVertical: 0,
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
            >
              <View>
                <Text style={styles.screenHeader}>Sign up now</Text>
              </View>
              <View style={{ flexDirection: "row", marginHorizontal: 40 }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    paddingBottom: 10,
                    borderBottomWidth: this.state.isClient ? 2.5 : 1,
                    borderBottomColor: this.state.isClient
                      ? colors.primaryColor
                      : colors.blackOpacityColor5,
                  }}
                  onPress={() => this.setState({ isClient: true })}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.primaryLightBlackColor,
                      fontFamily: fonts.sfproMedium
                    }}
                  >
                    Client
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    paddingBottom: 10,
                    borderBottomWidth: !this.state.isClient ? 2.5 : 1,
                    borderBottomColor: !this.state.isClient
                      ? colors.primaryColor
                      : colors.blackOpacityColor5,
                  }}
                  onPress={() => this.setState({ isClient: !true })}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.primaryLightBlackColor,
                      fontFamily: fonts.sfproMedium
                    }}
                  >
                    Stylist
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.socialMediaIconContainer}>
                <View style={{ marginHorizontal: 10 }}>
                  <Entypo
                    name="instagram-with-circle"
                    size={45}
                    color={colors.primaryColor}
                  />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Entypo
                    name="facebook-with-circle"
                    size={45}
                    color={colors.primaryColor}
                  />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Entypo
                    name="google--with-circle"
                    size={45}
                    color={colors.primaryColor}
                  />
                </View>
              </View>
              <View style={{ alignSelf: "center", flexDirection: "row" }}>
                <View
                  style={{
                    borderBottomColor: colors.blackOpacityColor4,
                    borderBottomWidth: 1,
                    width: "20%",
                    height: 1,
                    marginTop: 16
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 10,
                    color: colors.blackOpacityColor4,
                    fontFamily: fonts.sfproRegular
                  }}
                >
                  or
                </Text>
                <View
                  style={{
                    borderBottomColor: colors.blackOpacityColor4,
                    borderBottomWidth: 1,
                    width: "20%",
                    height: 1,
                    marginTop: 16
                  }}
                />
              </View> */}
            </View>
            <View
              style={{
                height: WINDOWSIZE.height / 3,
                width: "100%",
                marginVertical: 0,
                justifyContent: "space-evenly",
                backgroundColor: "transparent"
              }}
            >
              <View style={{ marginVertical: 0 }}>
                <LoginInputView
                  ref="one"
                  childRef="one"
                  label={"FULL NAME"}
                  value={this.state.loginFullName}
                  placeholderTextColor={this.state.activeFullNameLabelColor}
                  activeLabelColor={colors.primaryLightBlackColor}
                  borderBottomColor={this.state.loginFullNameBorderColor}
                  onChangeText={value => {
                    this.setState({
                      loginFullName: value,
                      loginFullNameLabelColor: colors.primaryColor
                    });
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.refs.two.refs.two.focus();
                  }}
                  onFocus={() => {
                    this.setState({
                      loginFullNameBorderColor: colors.primaryLightBlackColor,
                      activeFullNameLabelColor:
                        this.state.loginFullName != null
                          ? colors.blackOpacityColor4
                          : colors.primaryColor
                    });
                  }}
                  onBlur={() => {
                    this.setState({
                      loginFullNameBorderColor: colors.blackOpacityColor4,
                      activeFullNameLabelColor:
                        this.state.loginFullName == null
                          ? colors.blackOpacityColor4
                          : colors.primaryColor
                    });
                  }}
                  showEye={false}
                />
              </View>
              <View style={{ marginVertical: 0 }}>
                <LoginInputView
                  ref="two"
                  childRef="two"
                  label={"EMAIL ADDRESS"}
                  value={this.state.loginUsername}
                  placeholderTextColor={this.state.activeUsernameLabelColor}
                  activeLabelColor={colors.primaryLightBlackColor}
                  borderBottomColor={this.state.loginUsernameBorderColor}
                  onChangeText={value => {
                    this.setState({
                      loginUsername: value,
                      loginUsernameLabelColor: colors.primaryColor
                    });
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.refs.three.refs.three.focus();
                  }}
                  onFocus={() => {
                    this.setState({
                      loginUsernameBorderColor: colors.primaryLightBlackColor,
                      activeUsernameLabelColor:
                        this.state.loginUsername != null
                          ? colors.blackOpacityColor4
                          : colors.primaryColor
                    });
                  }}
                  onBlur={() => {
                    this.setState({
                      loginUsernameBorderColor: colors.blackOpacityColor4,
                      activeUsernameLabelColor:
                        this.state.loginUsername == null
                          ? colors.blackOpacityColor4
                          : colors.primaryColor
                    });
                  }}
                  showEye={false}
                />
              </View>
              <View>
                <LoginInputView
                  ref="three"
                  childRef="three"
                  label={"PASSWORD"}
                  password={true}
                  value={this.state.loginPassword}
                  placeholderTextColor={this.state.activePasswordLabelColor}
                  activeLabelColor={colors.primaryLightBlackColor}
                  borderBottomColor={this.state.loginPasswordBorderColor}
                  onChangeText={value => {
                    this.setState({
                      loginPassword: value,
                      loginPasswordLabelColor: colors.primaryColor
                    });
                  }}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    this.refs.four.refs.four.focus();
                  }}
                  showEye={true}
                  onFocus={() => {
                    this.setState({
                      loginPasswordBorderColor: colors.primaryLightBlackColor,
                      activePasswordLabelColor:
                        this.state.loginPassword != null
                          ? colors.blackOpacityColor4
                          : colors.primaryColor
                    });
                  }}
                  onBlur={() => {
                    this.setState({
                      loginPasswordBorderColor: colors.blackOpacityColor4,
                      activePasswordLabelColor:
                        this.state.loginPassword == null
                          ? colors.blackOpacityColor4
                          : colors.primaryColor
                    });
                  }}
                />
              </View>
              <View>
                <LoginInputView
                  ref="four"
                  childRef="four"
                  label={"CONFIRM PASSWORD"}
                  password={true}
                  value={this.state.loginConfirmPassword}
                  placeholderTextColor={
                    this.state.activeConfirmPasswordLabelColor
                  }
                  activeLabelColor={colors.primaryLightBlackColor}
                  borderBottomColor={this.state.loginConfirmPasswordBorderColor}
                  onChangeText={value => {
                    this.setState({
                      loginConfirmPassword: value,
                      loginConfirmPasswordLabelColor: colors.primaryColor
                    });
                  }}
                  returnKeyType="done"
                  onSubmitEditing={this.checkValidation}
                  showEye={true}
                  onFocus={() => {
                    this.setState({
                      loginConfirmPasswordBorderColor:
                        colors.primaryLightBlackColor,
                      activeConfirmPasswordLabelColor:
                        this.state.loginConfirmPassword != null
                          ? colors.blackOpacityColor4
                          : colors.primaryColor
                    });
                  }}
                  onBlur={() => {
                    this.setState({
                      loginConfirmPasswordBorderColor: colors.blackOpacityColor4,
                      activeConfirmPasswordLabelColor:
                        this.state.loginConfirmPassword == null
                          ? colors.blackOpacityColor4
                          : colors.primaryColor
                    });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginLeft: WINDOWSIZE.width * 0.08,
                height: 20,
                width: "100%",
                marginVertical: 10,
                alignItems: "center",
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <CheckBox
                size={18}
                containerStyle={{
                  padding: 0,
                  margin: 0
                }}
                checkedIcon={
                  <Image
                    style={{ height: 18, width: 18 }}
                    source={require("../assets/images/checkBox.png")}
                  />
                }
                uncheckedIcon={
                  <Image
                    style={{ height: 18, width: 18 }}
                    source={require("../assets/images/uncheckBox.png")}
                  />
                }
                checked={this.state.confirmServiceChecked}
                onPress={() =>
                  this.setState({
                    confirmServiceChecked: !this.state.confirmServiceChecked
                  })
                }
              />
              <Text
                style={{
                  color: colors.primaryLightBlackColor,
                  fontFamily: fonts.sfproMedium
                }}
              >
                Confirm
              </Text>
              <Text
                style={{
                  color: colors.primaryColor,
                  marginLeft: 5,
                  textDecorationLine: "underline",
                  fontFamily: fonts.sfproMedium,
                  flex: 1
                }}
              >
                Terms and Service
              </Text>
            </View>
            <View
              style={{
                height: WINDOWSIZE.height / 5,
                marginVertical: 0,
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <View style={{}}>
                  <Text onPress={this.checkValidation}>
                    <FontAwesome
                      name="circle"
                      size={65}
                      color={colors.primaryColor}
                    />
                  </Text>
                </View>
                <View
                  style={{ position: "absolute", left: 15, top: 10, zIndex: 1 }}
                >
                  <Text onPress={() => this.onPressConfrim()}>
                    <Ionicons
                      name="ios-arrow-round-forward"
                      size={45}
                      color={colors.whiteColor}
                    />
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text
                  style={{ fontWeight: "bold", fontFamily: fonts.sfproMedium }}
                >
                  Have an{" "}
                </Text>
                <Text
                  style={{
                    color: colors.primaryColor,
                    fontWeight: "bold",
                    fontFamily: fonts.sfproMedium
                  }}
                  onPress={() => this.props.navigation.navigate("SignIn")}
                >
                  CellOn account
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <CustomIndicator status={this.props.loading} />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  ...auth
});

const mapDispathToProps = {
  register: signupRequest
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0
  },
  mainLogo: {
    height: height * 0.1,
    width: height * 0.1 * 2.47,
    alignSelf: "center"
  },
  screenHeader: {
    color: colors.primaryLightBlackColor,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: fonts.sfproMedium
  },
  socialMediaIconContainer: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 10
  },
  forgotPassword: {
    color: colors.primaryColor,
    alignSelf: "flex-end"
  }
});
