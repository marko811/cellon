/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Provider } from "react-redux";
import { SafeAreaView, StatusBar } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from "react-navigation";

import axios from "axios";

import { colors, fonts } from "./src/utils/Constants";
import { BaseUrl } from "./src/constants/config";
import configureStore from "./src/configureStore";

import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Profile from "./src/screens/Profile";
import ShoppingBag from "./src/screens/ShoppingBag";
import Information from "./src/screens/Information";
import BrowserService from "./src/screens/BrowserService";
import ProductCardDetail from "./src/screens/ProductCardDetail";
import PayAndFeedback from "./src/screens/PayAndFeedback";
import ConfirmJobStart from "./src/screens/ConfirmJobStart";
import PreviewFullScreen from "./src/screens/PreviewFullScreen";
import Notification from "./src/screens/Notifications";
import SuccessPayment from "./src/screens/SuccessPayment";
import SplashScreen from "./src/screens/SplashScreen";
import ProductList from "./src/screens/ProductList";
import YourOffers from "./src/screens/YourOffers";
import AddPaymentCard from "./src/screens/AddPaymentCard";
import CardInfo from "./src/screens/CardInfo";
import CardEdit from "./src/screens/CardEdit";
import Salary from "./src/screens/Salary";
import StylistSchedule from "./src/screens/StylistSchedule";
import Book from "./src/screens/Book";
import Order from "./src/screens/Order";
import CustomerReview from "./src/screens/CustomerReview";
import SelectStylist from "./src/screens/SelectStylist";
import MyTour from "./src/screens/MyTour";
import MyTourFullMap from "./src/screens/MyTourFullMap";
import ClientMap from "./src/screens/ClientMap";
import ClientMapNavigation from "./src/screens/ClientMapNavigation";
import ClientMapAddress from "./src/screens/ClientMapAddress";
import StylelistProfile from './src/screens/StylistProfile';

import CustomDrawerContentComponent from "./src/component/common/CustomDrawerContentComponent";
import MenuItemIcon from "./src/component/common/MenuItemIcon";
console.disableYellowBox = true;
const AuthStack = createStackNavigator(
  {
    SignIn,
    SignUp,
  },
  {
    headerMode: "none",
  },
);

const contentOptions = {
  activeTintColor: colors.primaryColor,
  inactiveTintColor: colors.primaryLightBlackColor,
  labelStyle: {
    fontWeight: "normal",
    fontFamily: fonts.sfproRegular,
    fontSize: 14,
    color: colors.lightGrayColor1,
  },
  activeLabelStyle: {
    color: colors.primaryColor,
  },
  activeItemStyle: {
    borderLeftWidth: 4,
    borderColor: colors.primaryColor,
  },
};

const AddPaymentCardStack = createStackNavigator(
  {
    AddPaymentCard: {
      screen: AddPaymentCard,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primaryColor,
        borderBottomColor: "transparent",
      },
    },
  },
);

const CustomerDrawerStack = createDrawerNavigator(
  {
    Home: BrowserService,
    Profile,
    ShoppingBag,
    Information,
    AddPaymentCardStack: {
      screen: AddPaymentCardStack,
      navigationOptions: {
        drawerLabel: "Add Payment",
        drawerIcon: ({ tintColor }) => (
          <MenuItemIcon name="account" tintColor={tintColor} />
        ),
      },
    },
    CardEdit,
    Notification,
  },
  {
    initialRouteName: "Home",
    drawerType: "front",
    drawerPosition: "left",
    useNativeAnimations: true,
    contentComponent: CustomDrawerContentComponent,
    contentOptions,
  },
);

const CustomerMainStack = createStackNavigator(
  {
    DrawerStack: {
      screen: CustomerDrawerStack,
      navigationOptions: { header: null },
    },
    ProductCardDetail: {
      screen: ProductCardDetail,
      navigationOptions: { header: null },
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: { header: null },
    },
    ConfirmJobStart: {
      screen: ConfirmJobStart,
      navigationOptions: { header: null },
    },
    PreviewFullScreen: {
      screen: PreviewFullScreen,
      navigationOptions: { header: null },
    },
    PayAndFeedback: {
      screen: PayAndFeedback,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    PaymentDetail: {
      screen: AddPaymentCard,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    CardInfo: {
      screen: CardInfo,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    SuccessPayment: {
      screen: SuccessPayment,
      navigationOptions: { header: null },
    },
    CustomerReview: {
      screen: CustomerReview,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    Order: {
      screen: Order,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    SelectStylist: {
      screen: SelectStylist,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    ClientMap: {
      screen: ClientMap,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    ClientMapNavigation: {
      screen: ClientMapNavigation,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    ClientMapAddress: {
      screen: ClientMapAddress,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
  },
  {
    initialRouteName: "DrawerStack",
    // initialRouteName: "ClientMapAddress",
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primaryColor,
        borderBottomColor: "transparent",
      },
    },
  },
);

const StylishDrawerStack = createDrawerNavigator(
  {
    StylelistProfile,
    YourOffers,
    Salary,
    StylistSchedule,
    AddPaymentCard,
    CardEdit,
    Information,
    Notification,
  },
  {
    // restoreSS
    // initialRouteName: "StylistSchedule",
    initialRouteName: "YourOffers",
    // initialRouteName: "StylelistProfile",
    drawerType: "front",
    drawerPosition: "left",
    useNativeAnimations: true,
    contentComponent: CustomDrawerContentComponent,
    contentOptions,
  },
);

const StylishMainStack = createStackNavigator(
  {
    DrawerStack: {
      screen: StylishDrawerStack,
      navigationOptions: { header: null },
    },
    ProductCardDetail: {
      screen: ProductCardDetail,
      navigationOptions: { header: null },
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: { header: null },
    },
    ConfirmJobStart: {
      screen: ConfirmJobStart,
      navigationOptions: { header: null },
    },
    PreviewFullScreen: {
      screen: PreviewFullScreen,
      navigationOptions: { header: null },
    },
    PayAndFeedback: {
      screen: PayAndFeedback,
      navigationOptions: { header: null },
    },
    PaymentDetail: {
      screen: AddPaymentCard,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    CardInfo: {
      screen: CardInfo,
      navigationOptions: { header: null },
    },
    SuccessPayment: {
      screen: SuccessPayment,
      navigationOptions: { header: null },
    },
    Book: {
      screen: Book,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    MyTour: {
      screen: MyTour,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
    MyTourFullMap: {
      screen: MyTourFullMap,
      navigationOptions: {
        headerTintColor: colors.whiteColor,
      },
    },
  },
  {
    initialRouteName: "DrawerStack",
    // initialRouteName: "MyTourFullMap",
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primaryColor,
        borderBottomColor: "transparent",
      },
    },
  },
);

const AppNav = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      Auth: AuthStack,
      CustomerMainStack,
      StylishMainStack,
    },
    {
      // restoreSS
      // initialRouteName: "CustomerMainStack",
      initialRouteName: "Splash",
    },
  ),
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: configureStore(() => {}).store,
    };

    // axios.defaults.baseURL = "http://18.237.8.38:8181";
    console.log(BaseUrl);
    axios.defaults.baseURL = BaseUrl;
  }

  render() {
    const { store } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.whiteColor}
          translucent={false}
        />
        <Provider store={store}>
          <AppNav />
        </Provider>
      </SafeAreaView>
    );
  }
}
