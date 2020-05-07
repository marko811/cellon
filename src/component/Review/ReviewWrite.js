import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Animated,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { colors, fonts } from "../../utils/Constants";
import scale from "../../utils/scale";

export default class ReviewWrite extends Component {
  constructor(props) {
    super(props);
    this.animatedKeyboardHeight = new Animated.Value(0);
  }

  componentDidMount() {
    this.keyboardWillShowSubscription = Keyboard.addListener(
      Platform.select({
        ios: "keyboardWillShow",
        android: "keyboardDidShow",
      }),
      this.keyboardWillShow,
    );
    this.keyboardWillHideSubscription = Keyboard.addListener(
      Platform.select({
        ios: "keyboardWillHide",
        android: "keyboardDidHide",
      }),
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }

  keyboardWillShow = () => {
    // Animated.timing(this.animatedKeyboardHeight, {
    //   toValue: e.endCoordinates.height,
    //   duration: (e && e.duration) || 250,
    // }).start();
  };

  keyboardWillHide = () => {
    // Animated.timing(this.animatedKeyboardHeight, {
    //   toValue: 0,
    //   duration: (e && e.duration) || 250,
    // }).start();
  };

  render() {
    const { value, onChangeText, onSend } = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
          { marginBottom: this.animatedKeyboardHeight },
        ]}
      >
        <TextInput
          style={styles.textInputReview}
          placeholder="Write a Review"
          placeholderTextColor={colors.lightGrayColor1}
          autoCorrect={false}
          multiline
          underlineColorAndroid="transparent"
          value={value}
          onChangeText={text => onChangeText(text)}
        />
        <TouchableOpacity
          style={styles.sendButtonContainer}
          activeOpacity={0.6}
          onPress={() => onSend()}
        >
          <EvilIcons
            name="arrow-right"
            color={colors.whiteColor}
            size={scale(25)}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

ReviewWrite.defaultProps = {
  value: "",
  onChangeText: () => {},
  onSend: () => {},
};

ReviewWrite.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSend: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    maxHeight: scale(164),
    backgroundColor: colors.primaryLightBlackColor,
    paddingVertical: scale(14),
    paddingLeft: scale(14),
    padding: scale(4),
    alignItems: "flex-end",
  },
  textInputReview: {
    flex: 1,
    fontFamily: fonts.robotoRegular,
    fontSize: scale(12),
    lineHeight: scale(14),
    color: colors.whiteColor,
  },
  sendButtonContainer: {
    paddingHorizontal: scale(10),
  },
});
