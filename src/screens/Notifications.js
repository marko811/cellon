import React, { Component } from 'react'
import { Text, View, Image, FlatList, StyleSheet } from 'react-native'
import CommonStyles from '../utils/CommonStyles';
import CustomHeader from "../component/common/CustomHeader";
import scale from '../utils/scale';
import { fonts, colors } from '../utils/Constants';

const data = [
  {
    image:require('./../assets/images/Oval-2x.png'),
    name:'Dollie Perry',
    content:'Ordered a nail service from you',
    time:'4h'
  },
  {
    image:require('./../assets/images/Oval-2x.png'),
    name:'Dollie Perry1',
    content:'Ordered a nail service from you1',
    time:'4h'
  },
];

export default class Notifications extends Component {
  static navigationOptions = {
    drawerLabel: "Notifications",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/Bell.png")}
        style={[{height: 25, width: 25}, { tintColor: tintColor }]}
      />
    )
  };
  
  renderItem(item){
    console.log(item);
    return(
      <View style={styles.rowContainer}>
        <Image
          style={styles.imageStyle}
          source={item.image}
        />
        <View style={styles.contentContainer}>
          <Text numberOfLines={1} style={styles.nameText}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.contentText}>
            {item.content}
          </Text>
        </View>  
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} titleImage = {require('../assets/images/Bell.png')} title = 'Notifications' leftIcon noright />
        <FlatList
          style={styles.flatListContainer}
          data={data}
          renderItem={({item})=>this.renderItem(item)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex:1,
    marginTop:scale(20),
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: scale(60),
    marginBottom: scale(20)
  },
  imageStyle: {
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
    marginLeft: scale(30),
  },
  contentContainer: {
    flex:1,
    marginLeft: scale(20),
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: fonts.sfproMedium,
    fontSize: scale(16),
    color: colors.primaryLightBlackColor,
  },
  contentText: {
    fontFamily: fonts.sfproDisplayRegular,
    fontSize: scale(14),
    marginTop: scale(8),
    color: colors.primaryLightBlackColor,
  },
  timeContainer: {
    width: scale(55),
    padding: scale(10)
  },
  timeText: {
    fontFamily: fonts.sfproMedium,
    fontSize: scale(12),
    color: colors.darkGrayColor1,
  },
});
