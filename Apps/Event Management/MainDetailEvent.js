import React from 'react'
import { Text } from 'react-native'
import { BottomTabsDetailEvent } from '../Korespondensi/AppNavigator'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export const MainDetailEvent = () => {
    return (
        <BottomSheetModalProvider>
            <BottomTabsDetailEvent />
        </BottomSheetModalProvider>
    )
}
