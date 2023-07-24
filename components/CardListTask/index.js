import React from 'react'
import { Dimensions, Touchable, View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const CardListTask = ({ tanggal, kegiatan }) => {
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
                }}>
                <View style={{ marginVertical: 10, marginLeft: 10 }}>
                    <Text>{kegiatan}</Text>
                </View>
                <View style={{ marginBottom: 10, marginLeft: 10 }}>
                    <Text>Due Date: {tanggal}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}
