import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import CustomHeader from '../component/common/CustomHeader';
import { colors, fonts } from '../utils/Constants';
import BigButton from '../component/common/BigButton';
import CommonStyles from '../utils/CommonStyles';

const data = [
  {
    name: "Michelle Smith",
    price: 340,
  },
  {
    name: "Timothy Stevenson",
    price: 30,
  },
  {
    name: "Hannah Chavez",
    price: 120,
  },
  {
    name: "Eleanor Garza",
    price: 150,
  },
  {
    name: "Alberta Frazier",
    price: 340,
  }
]

export default class Salary extends Component {
  static navigationOptions = {
    drawerLabel: "Salary",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/salary_2x.png")}
        style={{
          width: 14,
          height: 20, tintColor: tintColor
        }}
      />
    )
  };
  render() {
    return (
      <View style={{ flex: 1, width: "100%", backgroundColor: colors.whiteColor }}>
        <CustomHeader title="Salary" navigation={this.props.navigation} noright/>
        <View elevation={3} style={{ flex: 1 }}>
          <FlatList
            style={{ color: "transparent" }}
            data={data}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 30, paddingTop: 20, paddingBottom: 20, borderBottomColor: colors.lightGrayColor3, borderBottomWidth: 1 }}>
                <Image source={require("./../assets/images/Oval-2x.png")} style={{ height: 36, width: 36, marginRight: 15 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.sfproMedium, color: colors.primaryLightBlackColor, fontSize: 14 }}>{item.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontFamily: fonts.sfproMedium, color: colors.primaryLightBlackColor, fontSize: 12 }}>{'4.8'}</Text>
                    <Image style={{ width: 14, height: 14, marginLeft: 3 }} source={require("./../assets/images/star.png")} />
                  </View>
                </View>
                <Text style={{ fontFamily: fonts.sfproDisplayBold, color: colors.primaryColor, fontSize: 24 }}>{`R ${item.price}`}</Text>
              </View>
            )}
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingVertical: 30, backgroundColor: colors.lightGrayColor5 }}>
          <Text style={{ textAlign: "center", marginBottom: 15, fontFamily: fonts.sfproDisplayBold, color: colors.primaryLightBlackColor, fontSize: 24 }}>Total: <Text style={{ color: colors.primaryColor }}>R 980</Text></Text>
          <BigButton title="Receive money via PayFast" onPress={() => {this.props.navigation.navigate("PayAndFeedback") }} />
        </View>
      </View>
    )
  }
}
