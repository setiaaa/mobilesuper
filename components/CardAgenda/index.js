import React from 'react'
import { Dimensions, Touchable, View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const CardAgenda = ({ kegiatan, subAvatar, warna, id }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity key={id} onPress={() => navigation.navigate('DetailAcara')}>
            <View style={{
                width: '100%',
                backgroundColor: COLORS.white,
                borderRadius: 8,
                flexDirection: 'row',
                gap: 1,
                marginVertical: 5,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                shadowRadius: 3,
                //shadow android
                elevation: 5
            }}>
                {warna === "#1868AB" ? (
                    <View style={{ width: '3%', backgroundColor: COLORS.info, height: 58, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
                ) : warna === "#EA5455" ? (
                    <View style={{ width: '3%', backgroundColor: '#EA5455', height: 58, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />

                ) : warna === "#F6AD1D" ? (
                    <View style={{ width: '3%', backgroundColor: '#F6AD1D', height: 58, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />

                ) : warna === "#FF8F28" ? (
                    <View style={{ width: '3%', backgroundColor: '#FF8F28', height: 58, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />

                ) : warna === "#11C15B" ? (
                    <View style={{ width: '3%', backgroundColor: '#11C15B', height: 58, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
                ) : (
                    <></>
                )}
                <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
                    <Text style={{ fontSize: FONTSIZE.H4, fontWeight: FONTWEIGHT.normal }}>{kegiatan}</Text>
                </View>
                <View style={{ flexDirection: 'row', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {subAvatar.map((data, index) => {
                        return (
                            <View key={index}>
                                <Image source={require('../../assets/superApp/AvatarDetail.png')} style={{
                                    marginLeft: -8,
                                    borderWidth: 2,
                                    borderRadius: 50,
                                    borderColor: COLORS.white,
                                }} />
                            </View>
                        )
                    })}
                    {/* <Image source={subAvatar} /> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}
