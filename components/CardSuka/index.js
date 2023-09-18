import React from 'react'
import { Image } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Text } from 'react-native'

export const CardSuka = ({ avatar, nama, jabatan, id }) => {
    return (
        <View key={id} style={{ flexDirection: 'row', gap: 10, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={avatar} />
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.lighter }}>{jabatan}</Text>
                <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.grey }}>{nama}</Text>
            </View>
        </View>
    )
}
