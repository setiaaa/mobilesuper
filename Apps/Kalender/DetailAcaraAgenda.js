import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import { FlatList, TextInput, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AVATAR, COLORS, DATETIME, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { useEffect } from 'react'
import { Image } from 'react-native'
import { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setAgendaDetail } from '../../store/GrupKalender'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'
import { getTokenValue } from '../../service/session'
import { getListSubAgenda } from '../../service/api'


const CardSubAgenda = ({ item }) => {
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 30 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: FONTSIZE.H3 }}>{moment(item.date).format(DATETIME.LONG_DATE)}</Text>
                        <Text style={{ fontSize: FONTSIZE.H4 }}>{item.start_time.substr(0, 5)} - {item.end_time.substr(0, 5)}</Text>
                    </View>
                    <Text style={{ fontSize: FONTSIZE.Judul, fontWeight: 500 }}>{item.title}</Text>
                </View>
                <Text>{item.location}</Text>
            </View>
            <View style={{ height: 1, width: '100%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10 }} />
        </View>
    )
}



export const DetailAcaraAgenda = () => {
    const navigation = useNavigation()
    const [token, setToken] = useState('')


    const { acara, agendaAcara } = useSelector(state => state.grupKalender)
    const detail = acara.detail
    const dispatch = useDispatch()

    return (
        <SafeAreaView>
            <GestureHandlerRootView>
                <BottomSheetModalProvider>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.primary, height: 80, paddingBottom: 20 }}>
                            <View style={{
                                backgroundColor: COLORS.white,
                                borderRadius: 20,
                                width: 28,
                                height: 28,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 20
                            }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                                <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Detail Acara</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={{ backgroundColor: COLORS.white, width: '90%', borderRadius: 8, marginLeft: 20 }}>

                                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                                    <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.Judul }}>{detail?.title}</Text>
                                </View>

                                <View style={{
                                    marginHorizontal: 20,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    gap: 10
                                }}>
                                    <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Dibuat Pada :</Text>
                                    <Text>{moment(detail?.created_at, 'HH:mm:ss').format(DATETIME.LONG_DATE)}</Text>
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Lokasi</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{detail?.location}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Waktu Mulai</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{moment(detail?.start_date).format(DATETIME.LONG_DATETIME)}</Text>
                                        </View>
                                    </View>

                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Waktu Selesai</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text>{moment(detail?.end_date).format(LONG_DATETIME)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>PIC</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                <Image source={{ uri: detail.pic?.avatar_url }} style={{
                                                    marginLeft: -8,
                                                    borderWidth: 2,
                                                    borderRadius: 50,
                                                    borderColor: COLORS.white,
                                                    width: 30,
                                                    height: 30
                                                }} />
                                                <Text>{detail.pic?.nama}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, width: '90%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10, marginHorizontal: 20 }} />
                                </View>

                                <View>
                                    <View style={{ marginHorizontal: 20, marginVertical: 20, flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ fontSize: FONTSIZE.H2, fontWeight: FONTWEIGHT.bold }}>Anggota</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            {detail.members?.map((item, index) => {
                                                return (
                                                    <View key={index}>
                                                        <Image source={{ uri: item.avatar_url }} style={{
                                                            marginLeft: -8,
                                                            borderWidth: 2,
                                                            borderRadius: 50,
                                                            borderColor: COLORS.white,
                                                            width: 30,
                                                            height: 30
                                                        }} />
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <View style={{ backgroundColor: COLORS.white, width: '90%', borderRadius: 8, marginLeft: 20, marginVertical: 20 }}>
                                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                                        <Ionicons name='list-outline' size={24} />
                                        <Text style={{ fontWeight: FONTWEIGHT.bold, fontSize: FONTSIZE.Judul }}>Sub Agenda</Text>
                                    </View>
                                    <View style={{ height: 1, width: '100%', backgroundColor: COLORS.lighter, opacity: 0.3, marginTop: 10 }} />

                                    <FlatList
                                        data={agendaAcara.listsSub}
                                        renderItem={({ item }) => <CardSubAgenda
                                            item={item}
                                        />
                                        }
                                        style={{ height: 150 }}
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{
                                backgroundColor: COLORS.primary,
                                width: '90%',
                                marginHorizontal: 20,
                                marginVertical: 20,
                                padding: 15,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: COLORS.white }}>Hapus</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{
                                borderColor: COLORS.primary,
                                width: '90%',
                                marginHorizontal: 20,
                                padding: 15,
                                borderRadius: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1
                            }}
                        >
                            <Text>Edit</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
})
