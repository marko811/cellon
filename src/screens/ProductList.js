import React, { Component } from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";

import ProductCard from "../component/catalog/ProductCard";
import CommonStyles from "../utils/CommonStyles";
import CustomHeader from "../component/common/CustomHeader";

export default class ProductList extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./../assets/images/home-2x.png")}
        style={[CommonStyles.icon, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.loadProductList();
    console.log(this.props.navigation.state.params.data);
  }

  _renderItem = ({ item }) => {
    return <ProductCard data={item} navigation={this.props.navigation} />;
  };

  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <View style={styles.container}>
        <CustomHeader
          navigation={this.props.navigation}
          title="Our Services"
          leftIcon={true}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
          data={data.product}
          keyExtractor={item => item._id}
          numColumns={2}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
