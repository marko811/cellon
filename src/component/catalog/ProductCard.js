import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { colors, fonts } from "../../utils/Constants";
import { BaseUrl } from "../../constants/config";
import { addProduct } from "../../actions/service";

const { width } = Dimensions.get("screen");
const cardWidth = (width - (width / 2) * 0.04 * 4) / 2;

class ProductCard extends Component {
  addProduct = () => {
    const { data, addProduct } = this.props;
    addProduct({
      product: data,
    });
    Alert.alert(
      "Info",
      "Add Product Success",
      [
        {
          text: "OK",
          onPress: () => {},
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { navigation, data } = this.props;
    return (
      <View elevation={2} style={styles.cardContainer}>
        <View style={styles.cardUpperContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              navigation.navigate("ProductCardDetail", {
                data,
              })
            }
          >
            <Image
              style={styles.productImage}
              source={{ uri: `${BaseUrl}${data.images[0]}` }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.addProduct()}
            style={styles.cartImageWrapper}
          >
            <Image
              style={styles.cartImage}
              source={require("./../../assets/images/to_bag1x.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardLowerContainer}>
          <Text style={styles.productName}>{data.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{`R ${data.price}`}</Text>
            <View style={styles.discountContainer}>
              <Text style={styles.discount}>{data.discount}</Text>
              <Image
                style={styles.discountImage}
                source={require("./../../assets/images/clock-circular-outline-2x.png")}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {
    addProduct,
  },
)(ProductCard);

ProductCard.defaultProps = {
  addProduct: () => {},
};

ProductCard.propTypes = {
  navigation: PropTypes.any,
  data: PropTypes.object,
  addProduct: PropTypes.func,
};

const styles = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    marginHorizontal: (width / 2) * 0.04,
    height: cardWidth * 1.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardUpperContainer: {
    height: "70%",
    borderRadius: 0,
  },
  cardLowerContainer: {
    height: "30%",
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
  productImage: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cartImage: {},
  cartImageWrapper: {
    position: "absolute",
    top: 0,
    right: 20,
    width: "30%",
    height: "30%",
  },
  productName: {
    color: colors.primaryLightBlackColor,
    fontFamily: fonts.sfproMedium,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    color: colors.primaryColor,
    fontFamily: fonts.sfproBold,
    fontSize: 17,
    marginRight: 10,
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  discount: {
    fontSize: 17,
    fontFamily: fonts.sfproBold,
    color: colors.primaryLightBlackColor,
    marginRight: 3,
  },
  discountImage: {
    height: 15,
    width: 15,
  },
});
