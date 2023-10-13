import React from 'react'
import { Image } from 'react-native'
import { View } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Text } from 'react-native'

export const CardItemMember = ({ item }) => {
    return (
        <View key={item.nip} style={{ flexDirection: 'row', gap: 10, marginHorizontal: 20, alignItems: 'center', marginTop: 20 }}>
            <Image source={{ uri: item.avatar_url }} style={{ width: 30, height: 30, borderRadius: 20 }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.H4 }}>{item?.title?.name !== '' ? item?.title?.name : item?.nama}</Text>
                {
                    item?.title?.name !== '' ? (
                        <Text style={{ fontWeight: FONTWEIGHT.normal, fontSize: FONTSIZE.H4 }}> {item?.nama}</Text>
                    ) : null
                }
            </View>
        </View>
    )
}
