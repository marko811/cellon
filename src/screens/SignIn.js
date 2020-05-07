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
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { colors, WINDOWSIZE, fonts } from "../utils/Constants";
const { height, width } = Dimensions.get("window");
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GoogleSignin } from "react-native-google-signin";
import LoginInputView from "../component/common/LoginInputView";
import CustomIndicator from "../component/common/CustomIndicator";
import scale from "../utils/scale";
import { loginRequest, loginRequestWithGoogle } from "../actions/auth";

import { validateEmail, validatePassword } from "../utils/validate";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: "",
      loginPassword: "",
      loginUsernameLabelColor: colors.primaryColor,
      loginPasswordLabelColor: colors.primaryColor,
      loginUsernameBorderColor: colors.blackOpacityColor4,
      loginPasswordBorderColor: colors.blackOpacityColor4,
      activePasswordLabelColor: colors.blackOpacityColor4,
      activeUsernameLabelColor: colors.blackOpacityColor4,
      isClient: true
    };
  }

  componentDidMount() {
    GoogleSignin.configure();
    GoogleSignin.signOut();
  }

  componentDidUpdate(prevProps) {
    const { user, error } = this.props;
    const { user: prevUser, error: prevError } = prevProps;
    console.log(error);
    console.log(prevError);
    if (error !== prevError && error) {
      alert(this.props.error.error.message);
    }
    if (user !== prevUser && user && user.access_token) {
      global.isClient = this.state.isClient;
      if (global.isClient) {
        this.props.navigation.navigate("CustomerMainStack");
      } else {
        this.props.navigation.navigate("StylishMainStack", {
          email: this.state.loginUsername
        });
      }
    }
  }

  checkValidation = () => {
    if (!validateEmail(this.state.loginUsername)) {
      alert("Invalid email");
      return;
    } else if (!validatePassword(this.state.loginPassword)) {
      alert("Password must contain at least 8 characters");
      return;
    }
    global.isClient = this.state.isClient;
    this.props.login({
      email: this.state.loginUsername,
      password: this.state.loginPassword
    });
    // if (global.isClient) {
    //   this.props.navigation.navigate("CustomerMainStack");
    // } else {
    //   this.props.navigation.navigate("StylishMainStack");
    // }
  };

  handleLoginWithGoogle = async () => {
    try {
      const user = await GoogleSignin.signIn();
      this.props.loginWithGoogle({
        token: user.idToken
      });
    } catch (err) {
      console.log(err);
      alert("Failed Login");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={-300}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: "transparent",
            height: "100%"
          }}
        >
          <View style={{ paddingTop: scale(20) }}>
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
                height: WINDOWSIZE.height / 3,
                marginVertical: 0,
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
            >
              <View>
                <Text style={styles.screenHeader}>Sign in now</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 40,
                  marginTop: scale(10)
                }}
              >
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
                  onPress={() => this.setState({ isClient: false })}
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

              <View style={styles.socialMediaIconContainer}>
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
                    onPress={this.handleLoginWithGoogle}
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
              </View>
            </View>
            <View
              style={{
                height: WINDOWSIZE.height / 5,
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
                    this.refs.two.refs.two.focus();
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
                  ref="two"
                  childRef="two"
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
                  onSubmitEditing={this.checkValidation}
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
              <View style={{ marginVertical: 0, width: width - width * 0.08 }}>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </View>
            </View>
            <View
              style={{
                height: WINDOWSIZE.height / 5,
                marginVertical: 0,
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "transparent",
                marginTop: scale(10)
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
                  <Text onPress={this.checkValidation}>
                    <Ionicons
                      name="ios-arrow-round-forward"
                      size={45}
                      color={colors.whiteColor}
                    />
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: scale(10)
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontFamily: fonts.sfproMedium }}
                >
                  Create a new{" "}
                </Text>
                <Text
                  style={{
                    color: colors.primaryColor,
                    fontWeight: "bold",
                    fontFamily: fonts.sfproMedium
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("SignUp");
                  }}
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

export default connect(
  mapStateToProps,
  {
    login: loginRequest,
    loginWithGoogle: loginRequestWithGoogle
  }
)(SignIn);

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
    marginTop: scale(10)
  },
  forgotPassword: {
    color: colors.primaryColor,
    alignSelf: "flex-end",
    fontFamily: fonts.sfproRegular
  }
});
