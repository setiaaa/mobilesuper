import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

// export const setTokenValue = async (value) => {
//     try {
//         const jsonValue = JSON.stringify(value)
//         await AsyncStorage.setItem('token', jsonValue)
//     } catch (e) {
//         console.log(e)
//     }
// }

// export const getTokenValue = async () => {
//     try {
//         const token = JSON.parse(await AsyncStorage.getItem("token"))
//         console.log(token)
//         return token
//     } catch (error) {
//         console.log(error);
//     }
// };

export const getTokenValue = async () => {
    try {
        const token = await AsyncStorage.getItem("token")
        return token
    } catch (error) {
        console.log(error);
    }
};

export const setTokenValue = async (value) => {
    try {
        await AsyncStorage.setItem('token', value)
    } catch (e) {
        console.log(e)
    }
}

export const removeTokenValue = async (value) => {
    try {
        await AsyncStorage.removeItem('token')
    } catch (e) {
        console.log(e)
    }
}
