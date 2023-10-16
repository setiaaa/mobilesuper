import React from 'react'
import LottieView from "lottie-react-native";
import { Dimensions, StyleSheet, View } from 'react-native';

export const Loading = () => {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    return (
        <View style={{ position: 'absolute', width: width, height: height, zIndex: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <LottieView source={require("../../assets/superApp/Loading.json")} autoPlay loop style={{ width: 100, height: 100 }} />
        </View>
    )
}