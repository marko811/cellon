import React, { Component } from "react";
import { View, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import CustomHeader from "../component/common/CustomHeader";
import YourOffersCard from "../component/offers/YourOffersCard";
import CommonStyles from "../utils/CommonStyles";
import { loadOfferListRequest } from "../actions/service";

const data = [
  {
    name: "Michelle Smith",
    image: require("./../assets/images/Oval-2x.png"),
    price: 340,
    discount: 5
  },
  {
    name: "Dollie Perry",
    image: require("./../assets/images/Oval-2x.png"),
    price: 340,
    discount: 12
  }
];

class YourOffers extends Component {
  static navigationOptions = {
    drawerLabel: "Your Offers",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/shoppingBag2x.png")}
        style={{
          width: 17,
          height: 20,
          tintColor: tintColor
        }}
      />
    )
  };

  componentDidMount = () => {
    const email = this.props.navigation.getParam("email");
    console.log("End");
  };

  render() {
    return (
      <View>
        <CustomHeader
          title="Your Offers"
          navigation={this.props.navigation}
          noright
        />
        <FlatList
          data={this.props.offerList}
          keyExtractor={item => item_id}
          data={data}
          keyExtractor={item => item.toString()}
          renderItem={({ item, index }) => (
            <YourOffersCard data={item} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}

mapStateToProps = ({ auth, service }) => ({
  ...auth,
  service
});

export default connect(
  mapStateToProps,
  {
    getOfferList: loadOfferListRequest
  }
)(YourOffers);
