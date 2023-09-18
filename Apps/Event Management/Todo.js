import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Search } from '../../components/Search'
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
import { getTokenValue } from '../../service/session'
import { getDetailTodo, getlistTodo } from '../../service/api'



const CardListTodo = ({ token, item, bottomSheetAttach, role, eventpic }) => {
    const [user, setUser] = useState('resepsionis')
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const getDetail = (id) => {
        const params = { token, id }
        dispatch(getDetailTodo(params))
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity style={{
                width: '90%',
                backgroundColor: COLORS.white,
                borderRadius: 8,
                justifyContent: 'center',
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
                    navigation.navigate('DetailTodo', { item: item })
                }}
            >
                {eventpic === true && item.status !== 'hadir' ||
                    role.is_pic === true && item.status !== 'hadir' ||
                    role.is_pic === false && item.status !== 'hadir' &&
                    role.is_notulensi === false && item.status !== 'hadir' &&
                    role.is_presensi === false && item.status !== 'hadir' &&
                    role.is_member === false && item.status !== 'hadir' ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold, width: 250 }}>{item.project?.name}</Text>
                        <TouchableOpacity onPress={() => bottomSheetAttach()}>
                            <Ionicons name='chevron-forward-outline' size={24} />
                        </TouchableOpacity>
                    </View>
                ) : (

                    <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.project?.name}</Text>
                )}


                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.lighter }}>Due Date :</Text>
                    <Text style={{ marginVertical: 10, color: COLORS.lighter }}>{item.due_date}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.lighter }}>Agenda :</Text>
                    <Text style={{ color: COLORS.lighter, width: 250 }}>{item.agenda}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


export const Todo = () => {
    const { agenda, todo, event } = useSelector(state => state.event)
    const id = agenda.detail?.notulensi?.id
    const data = todo.lists

    const [token, setToken] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        getTokenValue().then(val => {
            setToken(val)
        })
    }, [])

    useEffect(() => {
        if (token !== '') {
            dispatch(getlistTodo({ token, id }))
        }
    }, [token])

    // console.log(data)

    const navigation = useNavigation()

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
    const [user, setUser] = useState('admin')

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const filter = (event) => {
        setSearch(event)
    }

    // useEffect(() => {
    //     setFilterData(data.todo)
    // }, [data])

    // useEffect(() => {
    //     if (search !== '') {
    //         const datas = data.todo.filter((item) => {
    //             return item.judul.toLowerCase().includes(search.toLowerCase());
    //         })
    //         setFilterData(datas)
    //     } else {
    //         setFilterData(data.todo)
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
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>ToDo</Text>
                </View>
            </View>

            <View style={{ width: '90%', marginTop: 20, marginHorizontal: 20 }}>
                <Search
                    placeholder={"Cari ToDO"}
                // onSearch={filter}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
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
            </View>

            <FlatList
                data={data}
                renderItem={({ item }) => <CardListTodo
                    token={token}
                    item={item}
                    role={data.user_role}
                    eventpic={event.detailEvent?.user_role?.is_pic}
                    bottomSheetAttach={bottomSheetAttach}
                />
                }
                keyExtractor={item => item.id}
                style={{ marginTop: 10 }}
                ListEmptyComponent={() => (
                    <ListEmpty />
                )}
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
                                }}>
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
                                }}>
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
