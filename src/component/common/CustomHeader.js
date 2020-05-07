import React, { Component } from "react";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { DrawerActions } from "react-navigation";
import { Header } from "native-base";
import { fonts, colors } from "../../utils/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import scale, { verticalScale } from "../../utils/scale";

export default class CustomHeader extends Component {
  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  gotoShoppingBag = () => {
    this.props.navigation.navigate("ShoppingBag");
  };

  render() {
    return (
      <View
        style={[
          styles.header,
          { backgroundColor: this.props.backgroundColor || colors.whiteColor },
        ]}
      >
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          {this.props.leftIcon ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Ionicons name={"ios-arrow-back"} size={20} color={colors.blackColor} />
              <Text style={styles.goBack}>Back</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.openDrawer}>
              <Image
                style={styles.menu}
                source={require("./../../assets/images/menu-2x.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[
            { flex: 1, alignItems: "center" },
            this.props.titleImage && { paddingRight: scale(10) }
          ]}
        >
          {this.props.title != undefined ? (
            <View style={{ flexDirection: "row" }}>
              {this.props.titleImage && (
                <Image
                  style={styles.titleImage}
                  source={this.props.titleImage}
                />
              )}
              <Text
                style={[
                  {
                    fontSize: 18,
                    color: colors.blackColor,
                    fontFamily: fonts.sfproSemiBold
                  },
                  this.props.titleImage && { paddingLeft: scale(10) }
                ]}
              >
                {this.props.title}
              </Text>
            </View>
          ) : (
            <Image
              style={styles.logo}
              source={require("./../../assets/images/CellOn_PNG.png")}
            />
          )}
        </View>
        <View style={{ width: 30, alignItems: "flex-end" }}>
          {this.props.noright || (
            <TouchableOpacity onPress={this.gotoShoppingBag}>
              <Image
                style={styles.bag}
                source={require("./../../assets/images/shopping-bag-2x.png")}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

CustomHeader.defaultProps = {
  noright: false
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    height: 50,
    paddingHorizontal: 10
  },
  menu: {
    width: 25,
    height: 13
  },
  logo: {
    width: 75,
    height: 30
  },
  bag: {
    width: 20,
    height: 20
  },
  goBack: {
    fontSize: scale(17),
    fontFamily: fonts.sfproRegular,
    paddingLeft: scale(10)
  },
  titleImage: {
    height: scale(18),
    width: scale(18),
    alignSelf: "center"
  }
});
