import React from 'react'
import { Dimensions, Touchable, View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const CardListGridTask = ({ tanggal, kegiatan, prioritas, subAvatar }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('MainDetailTask') }}>
            <View
                style={{
                    width: '100%',
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    gap: 1,
                    marginVertical: 5,
                    //shadow
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: '#171717',
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    width: 177,

                }}>
                <View style={{ marginVertical: 10, marginLeft: 10 }}>
                    <Text>{kegiatan}</Text>
                </View>
                <View style={{ marginBottom: 10, marginLeft: 10 }}>
                    <Text>Due Date: {tanggal}</Text>
                </View>
                <View style={{ marginBottom: 10, marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Prioritas: </Text>
                    <View style={{ backgroundColor: COLORS.infoDangerLight, borderRadius: 30 }}>
                        <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.primary, marginHorizontal: 8, marginVertical: 4 }}>{prioritas}</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 10, marginLeft: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text>Member: </Text>
                    <View style={{ flexDirection: 'row', position: 'relative', display: 'flex', alignItems: 'center', }}>
                        {subAvatar.map((data) => {
                            return (
                                <Image source={data.avatar} style={{
                                    marginLeft: -8,
                                    borderWidth: 2,
                                    borderRadius: 50,
                                    borderColor: COLORS.white,
                                }}
                                />
                            )
                        })}
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}
