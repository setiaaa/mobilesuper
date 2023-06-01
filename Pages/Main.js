import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BottomTabs } from '../App'

export default function Main() {
    return (
        <BottomTabs />
        // <View style={styles.container}>
        //     <View style={styles.image}>
        //         <Image source={require('../assets/Avatar.png')} />
        //     </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 70,
        left: 150
    }
})