import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PropTypes from "prop-types";

import NavButton from "../component/common/NavButton";
import SelectStylistItem from "../component/SelectStylist/SelectStylistItem";
import scale from "../utils/scale";
import dummyData from "../dummy";

class SelectStylist extends Component {
  static navigationOptions = () => {
    return {
      title: "Stylist List",
      headerRight: (
        <NavButton icon="search" onPress={() => alert("Pressed!")} />
      ),
    };
  };

  onSelectItem = () => {
    alert("Item Pressed!");
  };

  renderItem = ({ item }) => (
    <SelectStylistItem {...item} onPress={() => this.onSelectItem(item)} />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={dummyData.stylistList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default SelectStylist;

SelectStylist.defaultProps = {};

SelectStylist.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: scale(10),
  },
});
