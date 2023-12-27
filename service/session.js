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
        const token = await AsyncStorage.getItem("token")
        return token
    } catch (error) {
    }
};

export const setTokenValue = async (value) => {
    try {
        await AsyncStorage.setItem('token', value)
    } catch (e) {
    }
}

export const removeTokenValue = async (value) => {
    try {
        await AsyncStorage.removeItem('token')
    } catch (e) {
    }
}
