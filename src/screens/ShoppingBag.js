import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import CommonStyles from "../utils/CommonStyles";
import CustomHeader from "../component/common/CustomHeader";
import { fonts, colors } from "../utils/Constants";
import { BaseUrl } from "../constants/config";
import { removeProduct } from "../actions/service";

class ShoppingBag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0,
      totalDiscount: 0
    };
  }

  static navigationOptions = {
    drawerLabel: "Shopping Bag",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/shopping-bag-2x.png")}
        style={[CommonStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  removeProduct = item => {
    this.props.removeProduct({
      product: item
    });
  };

  componentDidMount() {
    var price = 0;
    var discount = 0;
    let data = this.props.service.orderList;
    for (var i = 0; i < data.length; i++) {
      price += parseInt(data[i].price, 10);
      discount += parseInt(data[i].discount, 10);
    }
    this.setState({
      totalPrice: price,
      totalDiscount: discount
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;
    var price = 0;
    var discount = 0;
    let data = this.props.service.orderList;
    for (var i = 0; i < data.length; i++) {
      price += parseInt(data[i].price, 10);
      discount += parseInt(data[i].discount, 10);
    }
    this.setState({
      totalPrice: price,
      totalDiscount: discount
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          navigation={this.props.navigation}
          title="Shopping Cart"
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            marginVertical: 30
          }}
        >
          <Text
            style={{
              fontFamily: fonts.sfproBold,
              color: colors.primaryLightBlackColor,
              fontSize: 20,
              textAlign: "center",
              marginBottom: 30
            }}
          >
            {"Your Shopping Cart"}
          </Text>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{}}
              data={this.props.service.orderList}
              keyExtractor={item => item._id}
              numColumns={1}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginHorizontal: 15,
                    flex: 1,
                    borderRadius: 8,
                    marginBottom: 15,
                    flexDirection: "row"
                  }}
                  elevation={2}
                >
                  <Image
                    style={{ width: 121, height: 130 }}
                    source={{ uri: `${BaseUrl}${item.images[0]}` }}
                  />
                  <View style={{ margin: 15, flexDirection: "row" }}>
                    <View style={{ width: 153 }}>
                      <Text
                        style={{
                          fontFamily: fonts.montserratMedium,
                          fontSize: 14,
                          color: colors.primaryLightBlackColor,
                          marginBottom: 15,
                          flexWrap: "wrap"
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.montserratMedium,
                          fontSize: 24,
                          color: colors.primaryColor
                        }}
                      >
                        {`R ${item.price}`}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.removeProduct(item)}>
                      <Image
                        style={{ width: 26, height: 26 }}
                        source={require("./../assets/images/plus-2x.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
          <View style={{ marginHorizontal: 15, alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.sfproBold,
                  fontSize: 24,
                  color: colors.primaryLightBlackColor
                }}
              >
                {"Total:"}
                <Text style={{ color: colors.primaryColor }}>
                  {`R ${this.state.totalPrice}`}
                </Text>
                {` ${this.state.totalDiscount}`}
              </Text>
              <Image
                style={{ width: 21, height: 21, marginLeft: 4 }}
                source={require("./../assets/images/clock-circular-outline-2x.png")}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ConfirmJobStart")}
              style={{
                width: "100%",
                alignItems: "center",
                backgroundColor: colors.primaryColor,
                paddingVertical: 15,
                borderRadius: 30
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.sfproMedium,
                  fontSize: 18,
                  color: colors.whiteColor,
                }}
              >
                {"Order now"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

mapStateToProps = ({ service }) => ({
  service
});

export default connect(
  mapStateToProps,
  {
    removeProduct: removeProduct
  }
)(ShoppingBag);
