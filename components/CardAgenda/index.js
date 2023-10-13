import React from 'react'
import { Dimensions, Touchable, View } from 'react-native'
import { Text } from 'react-native'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { getDetailAcara, getDetailAgendaAcara, getListSubAgenda } from '../../service/api'

export const CardAgenda = ({ item, stringToColor, token, kegiatan }) => {
    const navigation = useNavigation()

    const dispatch = useDispatch();

    const getDetail = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailAcara(params))
        if (kegiatan === 'acara kalender') {
        } else {
            dispatch(getDetailAgendaAcara(params))
            dispatch(getListSubAgenda(params))
        }
    };
    return (
        <TouchableOpacity key={item.id}
            onPress={() => {
                getDetail(item.id)
                if (kegiatan === 'acara kalender') {
                    navigation.navigate('DetailAcara')
                } else {
                    navigation.navigate('DetailAcaraAgenda')
                }
            }
            }>
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

                <View style={{ width: '3%', backgroundColor: stringToColor(item.pic.title.name), height: 58, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />

                <View style={{ justifyContent: 'center', marginHorizontal: 20, width: 250 }}>
                    <Text>{item.name || item.title}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: COLORS.lighter }}>{moment(item.start_date).format('YYYY-MM-DD')} - </Text>
                        <Text style={{ color: COLORS.lighter }}>{moment(item.end_date).format('YYYY-MM-DD')}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {/* {subAvatar.map((data, index) => {
                        return ( */}
                    <View>
                        <Image source={{ uri: item.pic.avatar_url }} style={{
                            marginLeft: -8,
                            borderWidth: 2,
                            borderRadius: 50,
                            borderColor: COLORS.white,
                            width: 40,
                            height: 40
                        }} />
                    </View>
                    {/* )
                     })} */}
                </View>
            </View>
        </TouchableOpacity>
    )
}
