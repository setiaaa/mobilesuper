import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BottomTabs } from '../Korespondensi/AppNavigator'

export default function Main() {
    return (
        <BottomTabs />
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