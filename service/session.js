import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

// export const setTokenValue = async (value) => {
//     try {
//         const jsonValue = JSON.stringify(value)
//         await AsyncStorage.setItem('token', jsonValue)
//     } catch (e) {
//     }
// }

// export const getTokenValue = async () => {
//     try {
//         const token = JSON.parse(await AsyncStorage.getItem("token"))
//         return token
//     } catch (error) {
//     }
// };

export const getTokenValue = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {}
};

export const setTokenValue = async (value) => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (e) {}
};

export const removeTokenValue = async (value) => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {}
};

export const setPushNotif = async (value) => {
  try {
    console.log("storage", value);
    await AsyncStorage.setItem("notif", JSON.stringify(value));
  } catch (e) {}
};

export const getPushNotif = async () => {
  try {
    const notif = await AsyncStorage.getItem("notif");
    return JSON.parse(notif);
  } catch (error) {}
};

export const removePushNotif = async (value) => {
  try {
    console.log("hapus");
    console.log(value);
    await AsyncStorage.removeItem("notif");
  } catch (e) {}
};
