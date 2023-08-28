import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React from 'react'
import { BottomTabsDetailAgenda } from '../Korespondensi/AppNavigator'

export const MainDetailAgenda = () => {
    return (
        <BottomSheetModalProvider>
            <BottomTabsDetailAgenda />
        </BottomSheetModalProvider>
    )
}
