import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import Carousel from "./LoopedCarouselComponent";
import { WINDOWSIZE, colors } from "../../utils/Constants";
import { BaseUrl } from "../../constants/config";

/**
 * displays all images, gif and videos as a slider
 */
export default class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoPlay: false,
      intervalTime: 4000,
      images: this.props.images
    };
  }

  componentWillMount = () => {};

  render() {
    return (
      <View style={styles.Slidercontainer}>
        <Carousel
          delay={this.state.autoPlay ? this.state.intervalTime : 0}
          style={styles.customImage}
          autoplay={this.state.autoPlay}
          bullets
        >
          {this.state.images.map((image, index) => (
            <View key={index} style={styles.customImage}>
              <Image
                source={{ uri: `${BaseUrl}${image}` }}
                style={styles.customImage}
              />
            </View>
          ))}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Slidercontainer: {
    height: WINDOWSIZE.width - 40,
    width: WINDOWSIZE.width
  },
  customImage: {
    backgroundColor: colors.whiteColor,
    height: WINDOWSIZE.width - 40,
    width: WINDOWSIZE.width
  }
});
