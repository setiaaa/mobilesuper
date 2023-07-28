import React from 'react'
import { Dimensions, Touchable, View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';


export const CardTaskCari = ({ kegiatan, subAvatar, warna }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('MainDetailTask')}>
            <View style={{
                width: '100%',
                backgroundColor: COLORS.white,
                borderRadius: 8,
                flexDirection: 'row',
                gap: 1,
                marginVertical: 5,
                //shadow
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                shadowRadius: 3,
            }}>
                {warna === COLORS.infoDanger ? (
                    <View style={{ width: '3%', backgroundColor: COLORS.infoDanger, height: 58, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
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
                <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={{
                            fontSize: FONTSIZE.H4,
                            fontWeight: FONTWEIGHT.normal,
                            width: 200
                        }}
                    >{kegiatan}</Text>
                </View>
                <View style={{ flexDirection: 'row', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {subAvatar.map((data) => {
                        return (
                            <Image source={data.avatar} style={{
                                marginLeft: -8,
                                borderWidth: 2,
                                borderRadius: 50,
                                borderColor: COLORS.white,
                            }} />
                        )
                    })}
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name='chevron-forward-outline' size={24} color={COLORS.grey} />
                    </View>
                    {/* <Image source={subAvatar} /> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}
