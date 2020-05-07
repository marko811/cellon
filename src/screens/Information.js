import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import CommonStyles from "../utils/CommonStyles";
import CustomHeader from "../component/common/CustomHeader";
import { fonts } from "../utils/Constants";
import scale, { verticalScale } from './../utils/scale'

export default class Information extends Component {
  static navigationOptions = {
    drawerLabel: "Information",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/info-2x.png")}
        style={[CommonStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    const topHeading =  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor.';
    const firstPara = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida. Donec vehicula rhoncus mattis.';
    return (
      <View style = {styles.container}>
        <CustomHeader navigation={this.props.navigation} titleImage = {require('../assets/images/info.png')} title = 'Information' leftIcon noright />
        <View style = {{marginTop: scale(40)}}/>
        <View style= {{marginHorizontal: scale(20)}}>
          <Text style = {styles.heading}>
            {topHeading}
          </Text>

          <Text style = {styles.contentStyle}>
            {firstPara}
          </Text>
        </View>

        <View style = {{marginTop: scale(40), marginHorizontal: scale(20)}} >
          <Text style = {styles.heading}>
            {topHeading}
          </Text>

          <Text style = {styles.contentStyle}>
            {firstPara}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: scale(13.5),
    fontFamily: fonts.sfproMedium,
  },
  contentStyle: {
    fontSize: scale(14),
    fontFamily: fonts.sfproRegular,
    marginTop: scale(20),
  }
});
