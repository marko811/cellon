import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { WINDOWSIZE, colors, fonts } from "../utils/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import BigButton from "../component/common/BigButton";
import SliderComponent from "../component/common/SliderComponent";
import scale from "./../utils/scale";
import AntDesign from "react-native-vector-icons/AntDesign";

import { connect } from "react-redux";
import { orderProductRequest, addProduct } from "../actions/service";

const cartHeight = 80;
const PRODSCREENSIZE = WINDOWSIZE.height - 25;
class ProductCardDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      position: 1,
      counter: 0
    };
  }

  orderProduct = () => {
    data = this.props.navigation.state.params.data;
    this.props.orderProduct({
      product_id: data._id,
      count: this.state.counter,
      client_email: this.props.user.email
    });
    Alert.alert(
      "Info",
      "Order Success",
      [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  };

  addProduct = () => {
    data = this.props.navigation.state.params.data;
    this.props.addProduct({
      product: data
    });
    Alert.alert(
      "Info",
      "Add Product Success",
      [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.backIconWrapper}>
              <Text onPress={() => this.props.navigation.goBack()}>
                <Ionicons
                  name={"ios-arrow-back"}
                  size={35}
                  color={colors.primaryLightBlackColor}
                />
              </Text>
            </View>
            <View style={styles.headerImage}>
              <SliderComponent images={data.images} />
            </View>
          </View>
          <View style={styles.productInfoContainer}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                paddingTop: cartHeight / 2
              }}
            >
              <View
                style={{ width: WINDOWSIZE.width - 20 - 50, paddingRight: 10 }}
              >
                <Text
                  style={{
                    fontFamily: fonts.sfproMedium,
                    fontSize: 16,
                    color: colors.primaryLightBlackColor
                  }}
                >
                  {data.title}
                </Text>
              </View>
              <View
                style={{
                  width: 50,
                  justifyContent: "flex-start",
                  paddingTop: 10
                }}
              >
                <Image
                  style={{ height: 12, width: 22, alignSelf: "center" }}
                  source={require("../assets/images/upArrow.png")}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10
              }}
            >
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{data.price}</Text>
                <View style={styles.discountContainer}>
                  <Text style={styles.discount}>{data.discount}</Text>
                  <View
                    style={{
                      paddingTop: 3,
                      alignContent: "center",
                      justifyContent: "center",
                      alignSelf: "center"
                    }}
                  >
                    <Image
                      style={styles.discountImage}
                      source={require("../assets/images/clock-circular-outline-2x.png")}
                    />
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: "center" }}>
                <View style={styles.counterStyle}>
                  <TouchableOpacity
                    style={[
                      styles.counterButtonStyle,
                      {
                        borderBottomLeftRadius: scale(20),
                        borderTopLeftRadius: scale(20)
                      }
                    ]}
                    onPress={() => {
                      if (this.state.counter > 0) {
                        this.setState({ counter: this.state.counter - 1 });
                      }
                    }}
                  >
                    <AntDesign
                      name={"minus"}
                      color={colors.whiteColor}
                      size={scale(15)}
                    />
                  </TouchableOpacity>
                  <View style={styles.counterTextContainer}>
                    <Text style={styles.counterTextStyle}>
                      {this.state.counter}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.counterButtonStyle,
                      {
                        borderBottomRightRadius: scale(20),
                        borderTopRightRadius: scale(20)
                      }
                    ]}
                    onPress={() => {
                      this.setState({ counter: this.state.counter + 1 });
                    }}
                  >
                    <AntDesign name={"plus"} color={colors.whiteColor} size={scale(15)} />
                  </TouchableOpacity>
                </View>
                {/* <Image
                  style={{ height: 35, width: 122 }}
                  source={require("../assets/images/valuta_2x.png")}
                /> */}
              </View>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  paddingBottom: 10,
                  borderBottomWidth: this.state.tabIndex == 0 ? 2.5 : 2.5,
                  borderBottomColor:
                    this.state.tabIndex == 0
                      ? colors.primaryColor
                      : "transparent"
                }}
                onPress={() => this.setState({ tabIndex: 0 })}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color:
                      this.state.tabIndex == 0
                        ? colors.primaryColor
                        : colors.primaryLightBlackColor,
                    fontFamily: fonts.sfproMedium
                  }}
                >
                  Description
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  paddingBottom: 10,
                  borderBottomWidth: this.state.tabIndex == 1 ? 2.5 : 2.5,
                  borderBottomColor:
                    this.state.tabIndex == 1
                      ? colors.primaryColor
                      : "transparent"
                }}
                onPress={() => this.setState({ tabIndex: 1 })}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color:
                      this.state.tabIndex == 1
                        ? colors.primaryColor
                        : colors.primaryLightBlackColor,
                    fontFamily: fonts.sfproMedium
                  }}
                >
                  Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  paddingBottom: 10,
                  borderBottomWidth: this.state.tabIndex == 2 ? 2.5 : 2.5,
                  borderBottomColor:
                    this.state.tabIndex == 2
                      ? colors.primaryColor
                      : "transparent"
                }}
                onPress={() => this.setState({ tabIndex: 2 })}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color:
                      this.state.tabIndex == 2
                        ? colors.primaryColor
                        : colors.primaryLightBlackColor,
                    fontFamily: fonts.sfproMedium
                  }}
                >
                  Reviews
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.productDetailContainer}>
            <View
              style={{
                paddingVertical: 20,
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.sfproRegular,
                  letterSpacing: -0.34,
                  padding: 8
                }}
              >
                {this.state.tabIndex == 0 && data.description}
                {this.state.tabIndex == 1 && data.detailes}
                {this.state.tabIndex == 2 && data.reviews}
              </Text>
              <BigButton
                onPress={() => {
                  this.orderProduct();
                }}
                title={"Order Now"}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.addProduct();
            }}
            style={styles.cartWrapperStyle}
          >
            <Image
              style={styles.cartStyle}
              source={require("../assets/images/to_bag2x.png")}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ auth, service }) => ({
  ...auth,
  ...service
});

export default connect(
  mapStateToProps,
  {
    addProduct: addProduct,
    orderProduct: orderProductRequest
  }
)(ProductCardDetail);

const styles = StyleSheet.create({
  scrollViewContainer: {},
  container: {
    height: PRODSCREENSIZE
  },
  headerContainer: {
    flex: 4.5,
    backgroundColor: colors.pinkColor,
  },
  productInfoContainer: {
    flex: 2.5,
    backgroundColor: colors.lightGrayColor5,
    borderBottomColor: colors.blackOpacityColor1,
    borderBottomWidth: 0.8,
    justifyContent: "space-between"
  },
  productDetailContainer: {
    flex: 3,
    marginHorizontal: 10
  },
  backIconWrapper: {
    position: "absolute",
    left: 15,
    top: 15,
    zIndex: 1
  },
  headerImage: {
    height: WINDOWSIZE.width - 40,
    width: WINDOWSIZE.width
  },
  cartStyle: {
    height: cartHeight,
    width: cartHeight,
    zIndex: 1
  },
  cartWrapperStyle: {
    position: "absolute",
    top: PRODSCREENSIZE * 0.45 - cartHeight / 2,
    right: 10,
    zIndex: 1
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  price: {
    color: colors.primaryColor,
    fontFamily: fonts.sfproBold,
    fontSize: 35,
    marginRight: 10
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  discount: {
    fontSize: 35,
    fontFamily: fonts.sfproBold,
    color: colors.primaryLightBlackColor,
    marginRight: 3
  },
  discountImage: {
    height: 25,
    width: 25,
    alignSelf: "center"
  },
  counterStyle: {
    width: scale(122),
    height: scale(35),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  counterTextContainer: {
    width: scale(42),
    height: scale(35),
    justifyContent: "center",
    alignItems: "center"
  },
  counterTextStyle: {
    fontFamily: fonts.montserratMedium,
    fontSize: scale(14),
    color: colors.primaryColor,
  },
  counterButtonStyle: {
    width: scale(40),
    height: scale(35),
    backgroundColor: colors.lightGrayColor1,
    justifyContent: "center",
    alignItems: "center"
  }
});
