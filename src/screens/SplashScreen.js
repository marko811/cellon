import React, { Component } from "react";
import { Image, View } from "react-native";
import { colors } from "../utils/Constants";

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      const { navigation } = this.props;
      navigation.navigate("Auth");
    }, 1500);
  }

  render() {
    return (
      <View style={{flex:1, width: "100%", alignItems:"center", justifyContent:"center", backgroundColor: colors.splashSandColor}}>
        <Image source={require("./../assets/images/splash.png")} style={{width:"100%", height: "100%"}} />
      </View>
    );
  }
}
