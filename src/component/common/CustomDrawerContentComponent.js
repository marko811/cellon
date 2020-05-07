import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { DrawerActions, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { colors, fonts } from "../../utils/Constants";
import CommonStyles from "../../utils/CommonStyles";

const { height } = Dimensions.get("screen");

const CustomDrawerContentComponent = props => {
  const {
    items,
    activeItemKey,
    activeTintColor,
    activeBackgroundColor,
    inactiveTintColor,
    inactiveBackgroundColor,
    getLabel,
    renderIcon,
    onItemPress,
    itemsContainerStyle,
    itemStyle,
    labelStyle,
    activeLabelStyle,
    inactiveLabelStyle,
    iconContainerStyle,
    drawerPosition,
    activeItemStyle
  } = props;

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeContainer}
            onPress={() => {
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
            <Image
              style={styles.close}
              source={require("./../../assets/images/exit-2x.png")}
            />
          </TouchableOpacity>
          <Image
            style={styles.profileImage}
            source={require("./../../assets/images/Oval-2x.png")}
          />
          {/* <Text style={styles.name}>{props.user.name}</Text> */}
          <Text style={styles.name}>Ali</Text>
        </View>
        {/* <DrawerItems {...props} /> */}

        <View style={[styles.ascontainer, itemsContainerStyle]}>
          {items.map((route, index) => {
            const focused = activeItemKey === route.key;
            const color = focused ? activeTintColor : inactiveTintColor;
            const backgroundColor = focused
              ? activeBackgroundColor
              : inactiveBackgroundColor;
            const scene = { route, index, focused, tintColor: color };
            const icon = renderIcon(scene);
            const label = getLabel(scene);
            const accessibilityLabel =
              typeof label === "string" ? label : undefined;
            const extraLabelStyle = focused
              ? activeLabelStyle
              : inactiveLabelStyle;
            const extraItemStyle = focused ? activeItemStyle : itemStyle;
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={route.key}
                accessible
                accessibilityLabel={accessibilityLabel}
                onPress={() => {
                  onItemPress({ route, focused });
                }}
                delayPressIn={0}
              >
                <SafeAreaView
                  style={{ backgroundColor }}
                  forceInset={{
                    [drawerPosition]: "always",
                    [drawerPosition === "left" ? "right" : "left"]: "never",
                    vertical: "never",
                  }}
                >
                  <View
                    style={[
                      styles.item,
                      extraItemStyle,
                      { paddingLeft: !focused ? 4 : 0 },
                    ]}
                  >
                    {icon ? (
                      <View
                        style={[
                          styles.icon,
                          focused ? null : styles.inactiveIcon,
                          iconContainerStyle,
                        ]}
                      >
                        {icon}
                      </View>
                    ) : null}
                    {typeof label === "string" ? (
                      <Text
                        style={[
                          styles.label,
                          { color },
                          labelStyle,
                          extraLabelStyle,
                        ]}
                      >
                        {label}
                      </Text>
                    ) : (
                      label
                    )}
                  </View>
                </SafeAreaView>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            activeOpacity={1}
            key="logout"
            onPress={() => {
              props.navigation.navigate("Auth");
            }}
            delayPressIn={0}
          >
            <SafeAreaView
              style={{ inactiveBackgroundColor }}
              forceInset={{
                [drawerPosition]: "always",
                [drawerPosition === "left" ? "right" : "left"]: "never",
                vertical: "never",
              }}
            >
              <View style={[styles.item, itemStyle, { paddingLeft: 4 }]}>
                <View
                  style={[styles.icon, styles.inactiveIcon, iconContainerStyle]}
                >
                  <Image
                    source={require("./../../assets/images/logout-2x.png")}
                    style={[
                      CommonStyles.icon,
                      { tintColor: inactiveTintColor },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.label,
                    { color: inactiveTintColor },
                    labelStyle,
                    inactiveLabelStyle,
                  ]}
                >
                  {"Logout"}
                </Text>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

mapStateToProps = ({ auth }) => ({
  ...auth
});

export default connect(
  mapStateToProps,
  null,
)(CustomDrawerContentComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: height / 4.5,
    margin: 15,
    alignItems: "center",
  },
  closeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  close: {
    width: 20,
    height: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
  },
  name: {
    fontSize: 19,
    fontFamily: fonts.sfproMedium,
    color: colors.primaryLightBlackColor,
  },
  ascontainer: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: "center",
  },
  inactiveIcon: {
    /*
     * Icons have 0.54 opacity according to guidelines
     * 100/87 * 54 ~= 62
     */
    // opacity: 0.62
  },
  label: {
    margin: 16,
    fontWeight: "bold",
  },
});
