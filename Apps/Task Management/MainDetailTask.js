import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BottomTabsDetailTask } from '../Korespondensi/AppNavigator'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export default function MainDetailTask() {
    return (
        <BottomSheetModalProvider>
            <BottomTabsDetailTask />
        </BottomSheetModalProvider>
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