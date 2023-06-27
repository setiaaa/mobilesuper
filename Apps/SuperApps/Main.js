import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BottomTabs } from '../Korespondensi/AppNavigator'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export default function Main() {
    return (
        <BottomSheetModalProvider>
            <BottomTabs />
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