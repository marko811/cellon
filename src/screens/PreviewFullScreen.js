import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import ImageSlider from "react-native-image-slider";
import { fonts, colors } from "../utils/Constants";

class PreviewFullScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require("./../assets/images/rectangle3.png"),
        require("./../assets/images/rectangle3.png"),
        require("./../assets/images/rectangle3.png"),
        require("./../assets/images/rectangle3.png"),
      ],
      currentIndex: 0,
    };
  }

  handleShare = () => {
    alert("click share button");
  };

  render() {
    StatusBar.setBackgroundColor("#000", true);
    StatusBar.setBarStyle("dark-content", true);

    const { images, currentIndex } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons name="close" size={24} color={colors.whiteColor} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.sfproRegular,
              fontSize: 17,
              color: colors.whiteColor,
            }}
          >
            {currentIndex + 1} Of {images.length}
          </Text>
          <TouchableOpacity onPress={this.handleShare}>
            <EvilIcons name="share-apple" size={26} color={colors.whiteColor} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 366,
            alignSelf: "center",
            marginTop: 90,
          }}
        >
          <ImageSlider
            loopBothSides
            images={images}
            onPositionChanged={index => this.setState({ currentIndex: index })}
          />
        </View>
      </View>
    );
  }
}

export default PreviewFullScreen;

PreviewFullScreen.defaultProps = {};

PreviewFullScreen.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 38,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
