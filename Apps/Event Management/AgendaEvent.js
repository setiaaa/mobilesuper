import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setAgendaDetail, setAgendaLists } from '../../store/Event'
import { useNavigation } from '@react-navigation/native'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { Portal } from 'react-native-portalize'
import ListEmpty from '../../components/ListEmpty'
import { deleteSubAgenda, getEventAgenda, getEventAgendaDetail } from '../../service/api'
import { getTokenValue } from '../../service/session'
import moment from 'moment'




const CardListDetail = ({ token, item, bottomSheetAttach, setIdEdit }) => {
    const navigation = useNavigation()
    const [user, setUser] = useState('resepsionis')
    // const { agenda } = useSelector(state => state.event)
    const { event } = useSelector(state => state.event)
    const dispatch = useDispatch()

    const getDetail = (id) => {
        // const data = agenda.lists.find(item => item.id === id)
        const params = { token, id }
        dispatch(getEventAgendaDetail(params))
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{
                width: '90%',
                backgroundColor: COLORS.white,
                marginTop: 10,
                borderRadius: 8,
                padding: 20,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}
                onPress={() => {
                    getDetail(item.id)
                    navigation.navigate('MainDetailAgenda')
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: FONTWEIGHT.bold, width: 280 }}>{item.title}</Text>
                    {
                        event.detailEvent.user_role.is_pic === true ||
                            item.user_role?.is_pic === true ||
                            item.user_role?.is_notulensi === false &&
                            item.user_role?.is_presensi === false &&
                            item.user_role?.is_member === false &&
                            item.user_role?.is_pic === false
                            ? (
                                <TouchableOpacity onPress={() => {
                                    bottomSheetAttach()
                                    setIdEdit(item.id)
                                }}>
                                    <Ionicons name='chevron-forward-outline' size={24} color={COLORS.lighter} />
                                </TouchableOpacity>
                            ) : (
                                null
                            )}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                    <View>
                        <Text>{moment(item.date).format('d MMM yyy')}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 5 }}>{moment(item.start_time, 'HH:mm:ss').format('HH:mm')} - </Text>
                            <Text style={{ marginTop: 5 }}>{moment(item.end_time, 'HH:mm:ss').format('HH:mm')}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name='list-circle-outline' size={24} color={COLORS.lighter} />
                        <Text>{item.jmltodo}</Text>
                        <Text>Todo</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>{item.location}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name='people-outline' size={24} color={COLORS.lighter} />
                        <Text>{item.member_count}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const AgendaEvent = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [idEdit, setIdEdit] = useState('')

    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = () => {
        bottomSheetModalRef.current?.present()
    }

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current?.close()
    }

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }
    const [token, setToken] = useState('')

    const { agenda, event } = useSelector(state => state.event)

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getEventAgenda({ token: token, id: event.detailEvent.id }))
        }
    }, [token])


    // useEffect(() => {
    //     setFilterData(agenda.lists)
    // }, [agenda])

    // useEffect(() => {
    //     if (search !== '') {
    //         const data = agenda.lists.filter((item) => {
    //             return item.judul.toLowerCase().includes(search.toLowerCase());
    //         })
    //         setFilterData(data)
    //     } else {
    //         setFilterData(agenda.lists)
    //     }
    // }, [search])

    return (
        <SafeAreaView>
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
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Agenda</Text>
                </View>
            </View>

            {/* <View style={{ width: 358, marginHorizontal: 15, marginVertical: 20 }}>
                <Search placeholder={'Cari Agenda'} onSearch={filter} />
            </View> */}

            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Ionicons name='filter-outline' size={24} />
                    </View>

                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: '#171717',
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}>
                        <Ionicons name='menu-outline' size={24} />
                    </View>
                </View>
            </View> */}
            <View style={{ alignItems: 'flex-end', marginHorizontal: 20 }}>
                <TouchableOpacity style={{
                    width: 157,
                    height: 40,
                    backgroundColor: COLORS.primary,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                }}
                    onPress={() => {
                        navigation.navigate("TambahSubAgenda")
                    }}
                >
                    <Text style={{ color: COLORS.white }}>Tambah Sub Agenda</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={agenda.lists}
                renderItem={({ item }) => <CardListDetail
                    token={token}
                    item={item}
                    bottomSheetAttach={bottomSheetAttach}
                    setIdEdit={setIdEdit}
                />
                }
                style={{ marginVertical: 10, height: 440 }}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => <ListEmpty />}
            />

            <Portal>
                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={animatedSnapPoints}
                        handleHeight={animatedHandleHeight}
                        contentHeight={animatedContentHeight}
                        index={0}
                        style={{ borderRadius: 50 }}
                        keyboardBlurBehavior="restore"
                        android_keyboardInputMode="adjust"
                        backdropComponent={({ style }) => (
                            <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
                        )}
                    >
                        <BottomSheetView onLayout={handleContentLayout} >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                <TouchableOpacity style={{
                                    width: 331,
                                    height: 50,
                                    backgroundColor: COLORS.lightBrown,
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}
                                    onPress={() => {
                                        const params = { token: token, id: idEdit }
                                        dispatch(getEventAgendaDetail(params))
                                        navigation.navigate('EditSubAgenda')
                                    }}
                                >
                                    <Text style={{ color: COLORS.white }}>Ubah</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    width: 331,
                                    height: 50,
                                    backgroundColor: COLORS.infoDanger,
                                    borderRadius: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginBottom: 30
                                }}
                                    onPress={() => {
                                        const data = { token: token, id: idEdit }
                                        dispatch(deleteSubAgenda(data))
                                        bottomSheetAttachClose()
                                    }}
                                >
                                    <Text style={{ color: COLORS.white }}>Hapus</Text>
                                </TouchableOpacity>

                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </Portal>

        </SafeAreaView>
    )
}
