import React from 'react'
import { View, Text } from 'react-native'
import { TopsPencarianKorespondensi } from '../../../utils/menutab'
import { PADDING, COLORS } from '../../../config/SuperAppps'
import { Search } from '../../../components/Search'

export const Pencarian = () => {
  return (
    <View style={{ padding: PADDING.Page, flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ marginBottom: 20 }}>
            <Search 
                placeholder="Cari..."
            />
        </View>
        <TopsPencarianKorespondensi />
    </View>
  )
}
