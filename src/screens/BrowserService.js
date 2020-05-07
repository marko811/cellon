import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import PropTypes from "prop-types";
import { Accordion } from "native-base";
import { connect } from "react-redux";

import CommonStyles from "../utils/CommonStyles";
import { fonts, colors } from "../utils/Constants";
import CustomHeader from "../component/common/CustomHeader";
import ServiceDetails from "../component/BrowserService/ServiceDetails";
import scale from "../utils/scale";
import { loadServiceListRequest } from "../actions/service";
import { BaseUrl } from "../constants/config";
import CustomIndicator from "../component/common/CustomIndicator";

const homeImage = require("./../assets/images/home-2x.png");

class BrowserService extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => (
      <Image style={[CommonStyles.icon, { tintColor }]} source={homeImage} />
    ),
  };

  componentDidMount() {
    const { loadServiceList } = this.props;
    loadServiceList();
  }

  renderListHeader = item => {
    return (
      <ImageBackground
        source={{ uri: `${BaseUrl}${item.image}` }}
        style={styles.image}
      >
        <Text style={styles.paragraph}>{item.name}</Text>
      </ImageBackground>
    );
  };

  renderContent = item => {
    const { navigation } = this.props;
    return <ServiceDetails data={item} navigation={navigation} />;
  };

  render() {
    const { navigation, serviceList, loading } = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader navigation={navigation} title="Our Services" />
        <ScrollView>
          <Accordion
            dataArray={serviceList}
            renderHeader={this.renderListHeader}
            renderContent={this.renderContent}
          />
        </ScrollView>
        <CustomIndicator status={loading} />
      </View>
    );
  }
}

const mapStateToProps = ({ service }) => ({
  ...service,
});

export default connect(
  mapStateToProps,
  {
    loadServiceList: loadServiceListRequest,
  },
)(BrowserService);

BrowserService.defaultProps = {
  loadServiceList: () => {},
};

BrowserService.propTypes = {
  loading: PropTypes.bool,
  navigation: PropTypes.any,
  serviceList: PropTypes.array,
  loadServiceList: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  image: {
    flexGrow: 1,
    height: scale(150),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    textAlign: "center",
    fontSize: scale(44),
    color: colors.whiteColor,
    fontFamily: fonts.sfproBold,
  },
});
