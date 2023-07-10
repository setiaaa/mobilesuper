import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Image } from 'react-native'
export const CardAgenda = () => {
    return (
        <View style={{ width: '100%', backgroundColor: COLORS.white, borderRadius: 8, flexDirection: 'row', gap: 15 }}>
            <View style={{ width: '5%', backgroundColor: COLORS.info, height: 58, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: FONTSIZE.H4, fontWeight: FONTWEIGHT.normal }}>Rapat Gabungan dengan seluruh anggota</Text>
            </View>
            <View style={{ flexDirection: 'row', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Image source={require('../../assets/superApp/AvatarDetail.png')} />
                <Image source={require('../../assets/superApp/AvatarDetail.png')} style={{ marginLeft: -15 }} />
                <Image source={require('../../assets/superApp/AvatarDetail.png')} style={{ marginLeft: -15 }} />
            </View>
        </View>
    )
}
