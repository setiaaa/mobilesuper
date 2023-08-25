import React, { useMemo, useRef } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from '../../components/DropDown'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEventLists } from '../../store/Event'
import { useEffect } from 'react'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'

const kategories = [
    { key: 'q', value: 'satu' },
    { key: 'e', value: 'dua' },
    { key: 'r', value: 'tiga' },
    { key: 't', value: 'empat' },
]

const listsEvent = [
    {
        judul: 'UAT Korespondensi',
        departemen: 'Sekretariat Jendral',
        pic: AVATAR.U3,
        status: 'persiapan',
        progresEvent: [
            {
                judul: 'UAT Korespondensi',
                tanggal: '4 Juli 2023 - 10 Juli 2023',
                pic: AVATAR.U3,
                nama: 'TRIAN YUNANDA, S.PI, M.SC',
                jmltodo: '3',
                progres: '30%',
                todo: [
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                ]
            }
        ],

    },
    {
        judul: 'UAT Korespondensi',
        departemen: 'Sekretariat Jendral',
        pic: AVATAR.U3,
        status: 'persiapan',
        progresEvent: [
            {
                judul: 'UAT Korespondensi',
                tanggal: '4 Juli 2023 - 10 Juli 2023',
                pic: AVATAR.U3,
                nama: 'TRIAN YUNANDA, S.PI, M.SC',
                jmltodo: '3',
                progres: '30%',
                todo: [
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 2',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 3',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                ]
            }
        ],

    },
    {
        judul: 'UAT Korespondensi',
        departemen: 'Sekretariat Jendral',
        pic: AVATAR.U3,
        status: 'persiapan',
        progres: [
            {
                judul: 'UAT Korespondensi',
                tanggal: '4 Juli 2023 - 10 Juli 2023',
                pic: AVATAR.U3,
                nama: 'TRIAN YUNANDA, S.PI, M.SC',
                jmltodo: '3',
                progres: '30%',
                todo: [
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 2',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 3',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                ]
            }
        ],
    },
    {
        judul: 'UAT Korespondensi',
        departemen: 'Sekretariat Jendral',
        pic: AVATAR.U3,
        status: 'persiapan',
        progres: [
            {
                judul: 'UAT Korespondensi',
                tanggal: '4 Juli 2023 - 10 Juli 2023',
                pic: AVATAR.U3,
                nama: 'TRIAN YUNANDA, S.PI, M.SC',
                jmltodo: '3',
                progres: '30%',
                todo: [
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                ]
            }
        ],

    },
    {
        judul: 'UAT Korespondensi',
        departemen: 'Sekretariat Jendral',
        pic: AVATAR.U3,
        status: 'persiapan',
        progres: [
            {
                judul: 'UAT Korespondensi',
                tanggal: '4 Juli 2023 - 10 Juli 2023',
                pic: AVATAR.U3,
                nama: 'TRIAN YUNANDA, S.PI, M.SC',
                jmltodo: '3',
                progres: '30%',
                todo: [
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                    {
                        judul: 'TODO 1',
                        pic: AVATAR.U3,
                        nama: 'TRIAN YUNANDA, S.PI, M.SC',
                        tanggal: '4 Juli 2023',
                        progres: '40%'
                    },
                ]
            }
        ],

    },
]

const CardListEvent = ({ item }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
                backgroundColor: COLORS.white,
                width: 358,
                padding: 20,
                marginVertical: 10,
                borderRadius: 8
            }}>
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text>Departemen:</Text>
                    <Text style={{ marginVertical: 10 }}>{item.departemen}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>PIC</Text>
                        <Image source={item.pic} style={{ width: 26, height: 26, borderRadius: 30 }} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>Status</Text>
                        <View style={{
                            width: 80,
                            height: 24,
                            backgroundColor: COLORS.infoLight,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.info }}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const CardProgresEvent = ({ item, bottomSheetAttach }) => {
    return (
        item.progres?.map(((data) =>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    backgroundColor: COLORS.white,
                    width: 358,
                    padding: 20,
                    marginBottom: 10,
                    borderRadius: 8
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{data.judul}</Text>
                        <Text>{data.jmltodo} Todo</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ marginVertical: 10 }}>{data.tanggal}</Text>
                        <TouchableOpacity onPress={() => bottomSheetAttach(data.todo)}>
                            <Ionicons name='chevron-down-outline' size={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text>PIC</Text>
                            <Image source={data.pic} style={{ width: 26, height: 26, borderRadius: 30 }} />
                            <Text>{data.nama}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <View style={{
                                width: 42,
                                height: 24,
                                backgroundColor: COLORS.infoDangerLight,
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: COLORS.infoDanger }}>{data.progres}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
        )
    )
}

const CardTodoEvent = ({ item }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
                backgroundColor: COLORS.white,
                width: 358,
                padding: 20,
                marginBottom: 10,
                borderRadius: 8,
                //shadow ios
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                //shadow android
                elevation: 2,
            }}>
                <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.judul}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 }}>
                    <Text>PIC</Text>
                    <Image source={item.pic} style={{ width: 26, height: 26, borderRadius: 30 }} />
                    <Text>{item.nama}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons name='calendar-outline' size={24} />
                        <Text>{item.tanggal}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Ionicons name='time-outline' size={24} />
                        <Text style={{ fontWeight: FONTWEIGHT.bold }}>{item.progres}</Text>
                    </View>

                </View>
            </View>
        </View>
    )
}

export const HalamanUtama = () => {
    const navigation = useNavigation()
    const [kategori, setKategori] = useState('')
    const [progres, setProgres] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setEventLists(listsEvent))
    }, [])

    const { event } = useSelector(state => state.event)

    const [variant, SetVariant] = useState('hariini')

    const bottomSheetModalRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const bottomSheetAttach = (data) => {
        setProgres(data)
        bottomSheetModalRef.current?.present()
    }

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current?.close()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
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
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Event Management</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 10, marginVertical: 20, justifyContent: 'center' }}>
                    <View style={{ width: 309, }}>
                        <Dropdown
                            data={kategories}
                            placeHolder={'Pilih'}
                            setSelected={setKategori}
                            heightValue={200}
                        />
                    </View>
                    <View style={{
                        width: 44,
                        height: 43,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8
                    }}>
                        <Ionicons name='search-outline' size={24} color={COLORS.lighter} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>

                    <TouchableOpacity style={{
                        width: 171,
                        height: 41,
                        borderWidth: 1,
                        backgroundColor: variant === 'hariini' ? COLORS.infoDanger : COLORS.white,
                        borderRadius: 30,
                        borderColor: variant === 'hariini' ? COLORS.white : COLORS.ExtraDivinder,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => SetVariant('hariini')}
                    >
                        <Text style={{ color: variant === 'hariini' ? COLORS.white : null }}>Event Hari Ini</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: 171,
                        height: 41,
                        borderWidth: 1,
                        backgroundColor: variant === 'progres' ? COLORS.infoDanger : COLORS.white,
                        borderRadius: 30,
                        borderColor: variant === 'progres' ? COLORS.white : COLORS.ExtraDivinder,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => SetVariant('progres')}
                    >
                        <Text style={{ color: variant === 'progres' ? COLORS.white : null }}>Progres Event</Text>
                    </TouchableOpacity>
                </View>
                {variant === 'hariini' ? (
                    <FlatList
                        data={event.lists}
                        renderItem={({ item }) => <CardListEvent
                            item={item}
                        />
                        }
                    />
                ) : (
                    <View>
                        <View style={{ padding: 25 }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>Event</Text>

                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <View style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 30,
                                        backgroundColor: COLORS.white,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Ionicons name='filter-outline' size={24} />
                                    </View>

                                    <View style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 30,
                                        backgroundColor: COLORS.white,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Ionicons name='menu-outline' size={24} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <FlatList
                            data={event.lists}
                            renderItem={({ item }) => <CardProgresEvent
                                item={item}
                                bottomSheetAttach={bottomSheetAttach}
                            />
                            }
                        />
                    </View>

                )}

                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.infoDanger,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 100,
                    right: 20
                }}>
                    <Ionicons name='add-outline' size={24} color={COLORS.white} />
                </TouchableOpacity>


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
                        <FlatList
                            data={progres}
                            renderItem={({ item }) => <CardTodoEvent
                                item={item}
                            />
                            }
                            style={{ marginBottom: 40 }}
                        />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </SafeAreaView >
    )
}
