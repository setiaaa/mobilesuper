import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import { useNavigation } from "@react-navigation/native";
import Swiper from 'react-native-swiper'

export const Onboarding = () => {
    const navigation = useNavigation()
    return (
        <Swiper style={styles.wrapper} showsButtons={true} loop={false} autoplay={true}>
            <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
                <View>
                    <Button title={'Next'} onClick={() => navigation.navigate('Login')} />
                </View>
            </View>
        </Swiper>
    )
}
const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})