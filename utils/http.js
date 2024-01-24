import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, Linking } from "react-native";
import { useDispatch } from "react-redux";
import { Config } from "../constants/config";
import { logout, setFirstLogin } from "../store/auth";
import { nde_api } from "./api.config";

export async function headerToken() {
  let token;
  await AsyncStorage.getItem("token").then((data) => {
    token = data;
  });
  return { Authorization: token };
}

export async function postAuth(data) {
  return await axios.post(nde_api.auth, data);
}
export async function postHTTP(url, data) {
  let header = await headerToken();
  return await axios.post(url, data, { headers: header });
}

export async function getHTTP(url) {
  console.log(url);
  let header = await headerToken();
  return await axios.get(url, { headers: header });
}

export const handlerError = (error, title, msg) => {
  // const dispatch = useDispatch();
  // function showError(error, title, msg) {
  if (error?.response?.status == null) {
    Alert.alert("Warning!", "Please check your connection");
  } else if (error?.response?.status == 404) {
    Alert.alert("Warning!", "Page not found", [
      {
        text: "Ok",
        onPress: () => {
          // navigation.goBack();
        },
        style: "cancel",
      },
    ]);
  } else if (error?.response?.status === 401) {
    // dispatch(setFirstLogin(false));
    // dispatch(logout());
  } else {
    Alert.alert(title, msg, [
      {
        text: "Ok",
        onPress: () => {
          // navigation.goBack();
        },
        style: "cancel",
      },
    ]);
  }
  // }
  // showError(error, title, msg);
};

export const handleUpgradeLink = async () => {
  // Checking if the link is supported for links with custom URL scheme.
  let url = Config.upgrade_url;
  const supported = await Linking.canOpenURL(url);
  // if (supported) {
  //   // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  //   // by some browser in the mobile
  //   await Linking.openURL(url);
  // } else {
  //   Alert.alert(`Don't know how to open this URL: ${url}`);
  // }
};
