import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { fonts, colors } from "../../utils/Constants";
import scale from "../../utils/scale";

export default class ServiceDetails extends Component {
  render() {
    const { data } = this.props;
    return (
      <FlatList
        data={data.services}
        keyExtractor={item => item.service_id.toString()}
        style={{ marginLeft: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            activeOpacity={1}
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate("ProductList", { data: item });
            }}
          >
            <View style={styles.detailContainer}>
              <View style={styles.deatails}>
                <View style={styles.headerContainer}>
                  <Text style={styles.name}>{item.title}</Text>
                  <MaterialIcons
                    style={styles.editIcon}
                    name="edit"
                    color={colors.primaryColor}
                    size={scale(15)}
                  />
                  <Text style={styles.editText}>Edit Price</Text>
                </View>
                <Text style={styles.price}>R 350</Text>
              </View>
              <Text style={styles.discription}>{item.description}</Text>
            </View>
            <View style={styles.gotoIconContainer}>
              <Image
                style={styles.gotoIcon}
                source={require("./../../assets/images/path3-2x.png")}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
}

ServiceDetails.propTypes = {
  navigation: PropTypes.any,
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomColor: colors.lightGrayColor3,
    borderBottomWidth: 1,
    alignItems: "center",
    alignContent: "center",
  },
  detailContainer: {
    flex: 9,
  },
  deatails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    marginLeft: scale(16),
  },
  editText: {
    fontFamily: fonts.sfproDisplayRegular,
    fontSize: scale(10),
    color: colors.primaryColor,
    marginLeft: scale(5),
  },
  name: {
    fontFamily: fonts.sfproDisplayMedium,
    fontSize: 14,
    color: colors.primaryLightBlackColor,
  },
  price: {
    fontFamily: fonts.sfproDisplayBold,
    fontSize: 14,
    color: colors.primaryColor,
  },
  discription: {
    fontFamily: fonts.sfproDisplayRegular,
    fontSize: 12,
    color: colors.primaryLightBlackColor,
  },
  gotoIconContainer: {
    flex: 1,
    alignItems: "center",
  },
  gotoIcon: {
    width: 10,
    height: 20,
  },
});
