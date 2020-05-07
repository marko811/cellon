import { Dimensions } from "react-native";

export const SCREEN_HEIGHT = 667;
export const SCREEN_WIDTH = 375;

export const WINDOWSIZE = Dimensions.get("window");

export const GOOGLE_MAPS_APIKEY = "AIzaSyB4hkNcAngTyUmBnDVXI_ZYhF3Naa-aMsg";
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * (SCREEN_WIDTH / SCREEN_HEIGHT);

export const colors = {
  primaryColor: "#C79F73",
  primaryLightColor: "#FAC183",
  primaryOpacityColor: "#C79F739C",
  blackColor: "#000000",
  whiteColor: "#FFFFFF",
  greenColor: "#7ED321",
  primaryLightBlackColor: "#353739",
  primaryLightBlackOpacityColor: "#3537392B",
  activityIndicatorGrayColor: "#555555",
  grayColor: "#808080",
  darkGrayColor1: "#999A9A",
  darkGrayColor2: "#A7A7A7",
  lightGrayColor1: "#B1B1B1",
  lightGrayColor2: "#CFCFCF",
  lightGrayColor3: "#DDDDDD",
  lightGrayColor4: "#EEEEEE",
  lightGrayColor5: "#F6F6F6",
  splashSandColor: "#E3CEB7",
  pinkColor: "#FFC0CB",
  blackOpacityColor1: "rgba(0, 0, 0, 0.05)",
  blackOpacityColor2: "rgba(0, 0, 0, 0.1)",
  blackOpacityColor3: "rgba(0, 0, 0, 0.25)",
  blackOpacityColor4: "rgba(0, 0, 0, 0.3)",
  blackOpacityColor5: "rgba(0, 0, 0, 0.5)",
};

export const fonts = {
  sfproRegular: "SFProText-Regular",
  sfproMedium: "SFProText-Medium",
  sfproBold: "SFProText-Bold",
  sfproSemiBold: "SFProText-Semibold",
  sfproDisplayRegular: "SFProDisplay-Regular",
  sfproDisplayMedium: "SFProDisplay-Medium",
  sfproDisplayBold: "SFProDisplay-Bold",
  montserratMedium: "Montserrat-Medium",
  montserratBold: "Montserrat-Bold",
  robotoRegular: "Roboto-Regular",
  robotoMedium: "Roboto-Medium",
  robotoLight: "Roboto-Light",
  robotoBold: "Roboto-Bold",
};
