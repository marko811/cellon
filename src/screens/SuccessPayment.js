import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import BigButton from '../component/common/BigButton';
import { fonts, colors } from '../utils/Constants';

export default class SuccessPayment extends Component {
  render() {
    return (
      <View style={{ flex: 1,margin:15 }}>
        <View style={{ flex: 1, alignItems:"center", marginHorizontal: 30, marginTop:"35%"}}>
          <Image style={{width:90, height: 90}} source={require("./../assets/images/group-2x.png")} />
          <Text style={{fontFamily:fonts.sfproDisplayBold, fontSize:30, color:colors.primaryLightBlackColor, marginVertical: 30}}>Successful!</Text>
          <Text style={{fontFamily:fonts.sfproRegular, fontSize:17, color:colors.primaryLightBlackColor, textAlign:"center"}}>
            {'Your payment of R340 was successfully sent to '}
            <Text style={{color:colors.primaryColor}}>Nelle Phillips</Text>
          </Text>
        </View>
        <BigButton 
          onPress={() => {
              this.props.navigation.navigate("DrawerStack");
          }}
          title={"Done"}
        />
      </View>
    )
  }
}
