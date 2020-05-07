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
import {CheckBox} from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/FontAwesome'

class StylelistProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: "",
          lastName: "",
          emailAddress: "",
          phoneNo: "",
          region:"",
          profilePhotoSource: null,
          focused: "",
          gender: "male",
          previousPhotos: ['../assets/images/ww.jpg','../assets/images/wer.jpg','../assets/images/ww.jpg'],
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

    render() {
        const {previousPhotos} = this.state;
        return(
            <View>
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
                
            </View>
            <ScrollView>
                <View style={{
                    alignItems:'center',
                    backgroundColor:colors.primaryColor
                }}>
                    <Image 
                        source={require('../assets/images/Oval-2x.png')}
                        style={styles.image}
                    />
                    <Text style={styles.name}>Nelle Phillips</Text>
                    <Text style={styles.smallTxt}>Hair style</Text>
                </View>
                <View >
                    <Text style={styles.profileTxt}>
                        PROFILE
                    </Text>
                    <View style={{paddingVertical:10}}>
                        <LoginInputView
                            ref="firstName"
                            childRef="firstName"
                            label={"First Name"}
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
                                this.refs.firstName.refs.firstName.focus();
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
                    <View style={{paddingVertical:10}}>
                        <LoginInputView
                            ref="lastName"
                            childRef="lastName"
                            label={"Last Name"}
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
                                this.refs.lastName.refs.lastName.focus();
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
                    </View>
                    <View style={{paddingTop:10, marginLeft:scale(30)}}>
                        <Text style={{fontSize:scale(10), color:colors.primaryColor,paddingLeft:3}}>Gender</Text>
                        <View style={{flexDirection:'row'}}>
                            <CheckBox 
                                title='Male'
                                checked={this.state.gender === "male" ? true : false}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor={colors.primaryColor}
                                containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
                                onPress={() => this.setState({gender:'male'})}
                            />
                            <CheckBox 
                                title='Female'
                                checked={this.state.gender === "female" ? true : false}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor={colors.primaryColor}
                                containerStyle={{backgroundColor:'transparent', borderColor:'transparent'}}
                                onPress={() => this.setState({gender:'female'})}
                            />
                        </View>
                    </View>
                    <View style={{paddingBottom:10}}>
                        <LoginInputView
                            ref="emailAddress"
                            childRef="emailAddress"
                            label={"Email Address"}
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
                                this.refs.emailAddress.refs.emailAddress.focus();
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
                    <View style={{paddingVertical:10}}>
                        <LoginInputView
                            ref="phoneNo"
                            childRef="phoneNo"
                            label={"Phone Number"}
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
                            onChangeText={phoneNo => {
                            this.setState({
                                phoneNo: phoneNo
                            });
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                this.refs.phoneNo.refs.phoneNo.focus();
                            }}
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
                    <View style={{paddingVertical:10}}>
                        <LoginInputView
                            ref="region"
                            childRef="region"
                            label={"Region"}
                            value={this.state.region}
                            placeholderTextColor={
                            this.state.focused == "region"
                                ? colors.primaryColor
                                : colors.lightGrayColor1
                            }
                            borderBottomColor={
                            this.state.focused == "region"
                                ? colors.primaryLightBlackColor
                                : colors.blackOpacityColor4
                            }
                            activeLabelColor={colors.primaryLightBlackColor}
                            onChangeText={region => {
                            this.setState({
                                region: region
                            });
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                this.refs.region.refs.region.focus();
                            }}
                            onFocus={() => {
                                this.setState({
                                    focused: "region"
                                });
                            }}
                            onBlur={() => {
                                this.setState({
                                    focused: ""
                                });
                            }}
                            
                        />
                    </View>
                    <Text style={styles.profileTxt}>
                        UPLOAD PREVIOUS PHOTO
                    </Text>
                    <ScrollView 
                        style={{marginLeft:30, marginTop:20}}
                        horizontal={true}
                    >
                        {previousPhotos.map(data => {
                            return (
                                <Image
                                    source={require('../assets/images/ww.jpg')} 
                                    style={{
                                        width: scale(90),
                                        height:scale(90),
                                        marginRight: scale(10),
                                        borderRadius:10,
                                    }}
                                />
                            );
                        })}
                        <TouchableOpacity style={{
                            width:scale(90),
                            height:scale(90),
                            marginRight:scale(10),
                            borderRadius:10,
                            backgroundColor:'#f7f7f7',
                        }}>
                            {/* <Icon name="plus" color='black' size={30} /> */}
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => {
                        }}
                        style={styles.buttonStyle}
                    >
                        <Text style={styles.buttonTextStyle}>Save Changes</Text>
                    </TouchableOpacity>
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
)(StylelistProfile);


const styles = StyleSheet.create({
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
    image: {
        height: scale(80),
        width: scale(80),
        borderRadius: scale(40),
        marginTop:scale(20),
    },
    name: {
        fontSize: scale(20),
        color: 'white'
    },
    smallTxt: {
        color:'white',
        fontSize: scale(12),
        marginTop:scale(10),
        marginBottom: scale(33),
    },
    profileTxt:{
        color:colors.primaryColor, 
        fontSize:scale(18),
        marginTop: scale(34),
        fontFamily: 'Roboto-Medium',
        marginLeft:scale(30)
    },
    buttonTextStyle: {
        fontFamily: fonts.sfproDisplayMedium,
        fontSize: scale(18),
        color: colors.whiteColor
    },
    buttonStyle: {
        marginTop: scale(30),
        marginBottom:scale(200),
        backgroundColor: colors.primaryColor,
        alignSelf: "stretch",
        marginHorizontal: scale(25),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: scale(14),
        borderRadius: scale(25)
    },
})