import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
import { fonts, colors } from "../utils/Constants";
import scale from "../utils/scale";

class CardInfo extends Component {
  static navigationOptions = {
    title: "Lindsey Johnson",
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  onPay = () => {
    const { navigation } = this.props;
    navigation.navigate("SuccessPayment");
  };

  render() {
    const { checked } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Add a Card</Text>
        <Text style={styles.textFieldName}>Card Number</Text>
        <TextInput style={styles.textInputValue} placeholder="1234 5678 1234" />
        <Text style={styles.textFieldName}>Card Holder Name</Text>
        <TextInput
          style={styles.textInputValue}
          placeholder="Card Holder Name"
        />
        <View style={styles.rowContainer}>
          <View style={styles.cellLeftContainer}>
            <Text style={styles.textFieldName}>Expiration Date</Text>
            <TextInput style={styles.textInputValue} placeholder="MM/YY" />
          </View>
          <View style={styles.cellRightContainer}>
            <Text style={styles.textFieldName}>CVV</Text>
            <TextInput style={styles.textInputValue} placeholder="000" />
          </View>
        </View>
        <CheckBox
          left
          title="Save Card Details"
          checkedIcon="check-square-o"
          uncheckedIcon="square-o"
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.textCheckBox}
          checkedColor={colors.primaryColor}
          checked={checked}
          onPress={() => this.setState({ checked: !checked })}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.6}
          onPress={() => this.onPay()}
        >
          <Text style={styles.textButton}>Pay</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={styles.paymentSecureContainer}>
          <FontAwesome name="user-secret" style={styles.iconPaymentSecure} />
          <Text style={styles.textPaymentSecure}>100% Secure Payment</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  ...auth,
});

export default connect(
  mapStateToProps,
  null,
)(CardInfo);

CardInfo.defaultProps = {};

CardInfo.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(12),
  },
  textTitle: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.primaryLightBlackColor,
    marginTop: scale(20),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textFieldName: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(14),
    lineHeight: scale(16),
    marginTop: scale(20),
    color: colors.primaryLightBlackColor,
  },
  textInputValue: {
    height: scale(42),
    backgroundColor: colors.lightGrayColor5,
    color: colors.primaryLightBlackColor,
    paddingHorizontal: scale(12),
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: colors.lightGrayColor4,
  },
  cellLeftContainer: {
    flex: 1,
    marginRight: scale(6),
  },
  cellRightContainer: {
    flex: 1,
    marginLeft: scale(6),
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginTop: scale(20),
    marginBottom: scale(28),
  },
  textCheckBox: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(14),
    lineHeight: scale(16),
    fontWeight: "normal",
    color: colors.primaryLightBlackColor,
  },
  buttonContainer: {
    height: scale(60),
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(2),
    backgroundColor: colors.primaryColor,
  },
  textButton: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.whiteColor,
  },
  paymentSecureContainer: {
    flexDirection: "row",
    marginVertical: scale(32),
    justifyContent: "center",
    alignItems: "center",
  },
  iconPaymentSecure: {
    fontSize: scale(14),
    color: colors.darkGrayColor1,
    marginRight: scale(6),
  },
  textPaymentSecure: {
    fontFamily: fonts.robotoLight,
    fontSize: scale(15),
    lineHeight: scale(18),
    color: colors.darkGrayColor1,
  },
});
