import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import React, { useMemo, useRef } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { TopsTask, TopsTaskDashboard, TopsTaskKorespondensi } from '../Korespondensi/AppNavigator'
import { Search } from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setTaskLists, setVariant } from '../../store/Task'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from '../../components/DropDown'
import { getListDashboardTM, getListTaskTM, getTreeTM } from '../../service/api'
import { getTokenValue } from '../../service/session'
import { FilterTask } from './FilterTask'

const item = [
    {
        id: 1,
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        status: 'in progress',
        tanggal: '22 Juli 2023',
        subAvatar: [
            {
                id: 1,
                avatar: AVATAR.U2
            },
            {
                id: 2,
                avatar: AVATAR.U2
            },
            {
                id: 3,
                avatar: AVATAR.U2
            },
            {
                id: 4,
                avatar: AVATAR.U2
            }
        ],
        warna: COLORS.infoDanger,
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ]
    },
    {
        id: 2,
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        status: 'backlog',
        subAvatar: [
            {
                id: 1,
                avatar: AVATAR.U2
            },
            {
                id: 2,
                avatar: AVATAR.U2
            },
            {
                id: 3,
                avatar: AVATAR.U2
            },
            {
                id: 4,
                avatar: AVATAR.U2
            }
        ],
        warna: COLORS.infoDanger,
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ]
    },
    {
        id: 3,
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        status: 'pending',
        subAvatar: [
            {
                id: 1,
                avatar: AVATAR.U2
            },
            {
                id: 2,
                avatar: AVATAR.U2
            },
            {
                id: 3,
                avatar: AVATAR.U2
            },
            {
                id: 4,
                avatar: AVATAR.U2
            }
        ],
        warna: COLORS.infoDanger,
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ],
    },
    {
        id: 4,
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        status: 'completed',
        subAvatar: [
            {
                id: 1,
                avatar: AVATAR.U2
            },
            {
                id: 2,
                avatar: AVATAR.U2
            },
            {
                id: 3,
                avatar: AVATAR.U2
            },
            {
                id: 4,
                avatar: AVATAR.U2
            }
        ],
        warna: COLORS.infoDanger,
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ]
    },
    {
        id: 5,
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        status: 'in progress',
        subAvatar: [
            {
                id: 1,
                avatar: AVATAR.U2
            },
            {
                id: 2,
                avatar: AVATAR.U2
            },
            {
                id: 3,
                avatar: AVATAR.U2
            },
            {
                id: 4,
                avatar: AVATAR.U2
            }
        ],
        warna: COLORS.infoDanger,
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ]
    },
    {
        id: 6,
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        status: 'in progress',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger,
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ]
    },
    {
        id: 7,
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        status: 'in progress',
        subAvatar: [
            {
                id: 1,
                avatar: AVATAR.U2
            },
            {
                id: 2,
                avatar: AVATAR.U2
            },
            {
                id: 3,
                avatar: AVATAR.U2
            },
            {
                id: 4,
                avatar: AVATAR.U2
            }
        ],
        warna: COLORS.infoDanger,
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ]
    },
    {
        id: 8,
        kegiatan: 'Hallo guys',
        tanggal: '22 Juli 2023',
        status: 'in progress',
        subAvatar: [
            {
                id: 1,
                avatar: AVATAR.U2
            },
            {
                id: 2,
                avatar: AVATAR.U2
            },
            {
                id: 3,
                avatar: AVATAR.U2
            },
            {
                id: 4,
                avatar: AVATAR.U2
            }
        ],
        warna: COLORS.infoDanger,
        prioritas: 'High',
        member: [
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
            {
                avatar: AVATAR.U2,
                jabatan: 'Kepala Badan Riset dan Sumber Daya Manusia Kelautan dan Perikanan',
                nama: 'Rizky Novriansyah'
            },
        ]
    },
]

const tipe = [
    { key: '1', value: 'Dashboard' },
    { key: '2', value: 'Korespondensi' },
    { key: '3', value: 'Agenda Rapat' },
    { key: '4', value: 'Task Untuk Saya' },
    { key: '5', value: 'Task Dari Saya' },
]

export const MyTask = () => {
    const dispatch = useDispatch()
    const [token, setToken] = useState("");

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    useEffect(() => {
        dispatch(setTaskLists(item))
        dispatch(getListDashboardTM({ token: token }))
        dispatch(getTreeTM({ token: token }))
    }, [token]);

    const { task, variant, treeView, list } = useSelector(state => state.task)
    const taskLists = list.data

    const navigation = useNavigation()
    // const [variantLocal, setVariantLocal] = useState('list')
    const bottomSheetModalRef = useRef(null);
    const bottomSheetModalSelectRef = useRef(null);
    const bottomSheetModalAddRef = useRef(null);
    const bottomSheetModalAddCategoryRef = useRef(null);
    const bottomSheetModalAddSubCategoryRef = useRef(null);
    const bottomSheetModalAddSubSubCategoryRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["50%", "90%"], [])
    const initialSnapPointsTambah = useMemo(() => ["CONTENT_HEIGHT"], [])
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPointsTambah)

    const bottomSheetAttach = () => {
        bottomSheetModalRef.current?.present()
    }

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current?.close()
    }

    const bottomSheetAttachSelect = () => {
        bottomSheetModalSelectRef.current?.present()
    }

    const bottomSheetSelectClose = () => {
        if (bottomSheetModalSelectRef.current)
            bottomSheetModalSelectRef.current?.close()
    }

    const bottomSheetAdd = () => {
        bottomSheetModalAddRef.current?.present()
    }

    const bottomsheetAddClose = () => {
        if (bottomSheetModalAddRef.current)
            bottomSheetModalAddRef.current?.close()
    }

    const bottomsheetAddCategory = () => {
        bottomSheetModalAddCategoryRef.current?.present()
    }

    const bottomsheetAddCategoryClose = () => {
        if (bottomSheetModalAddCategoryRef.current)
            bottomSheetModalAddCategoryRef.current?.close()
    }

    const bottomsheetAddSubCategory = () => {
        bottomSheetModalAddSubCategoryRef.current?.present()
    }

    const bottomsheetAddSubCategoryClose = () => {
        if (bottomSheetModalAddSubCategoryRef.current)
            bottomSheetModalAddSubCategoryRef.current?.close()
    }

    const bottomsheetAddSubSubCategory = () => {
        bottomSheetModalAddSubSubCategoryRef.current?.present()
    }

    const bottomsheetAddSubSubCategoryClose = () => {
        if (bottomSheetModalAddSubSubCategoryRef.current)
            bottomSheetModalAddSubSubCategoryRef.current?.close()
    }

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])

    const [choiceTipe, setChoiceTipe] = useState({ key: '1', value: 'Dashboard' })
    const [choiceKategori, setChoiceKategori] = useState('')
    const [choiceList, setChoiceList] = useState('')
    const [dataKategori, setDataKategori] = useState([])
    const [dataList, setDataList] = useState([])

    const [choiceFilter, setChoiceFilter] = useState('semua')

    useEffect(() => {
        if (choiceTipe.key !== '1' || choiceTipe.key !== '2') {
            let arrKategori = []
            treeView.map(item => {
                if (choiceTipe.key === '3' && item.kategori === 'event') {
                    arrKategori.push({
                        key: item.id,
                        value: item.name
                    })
                } else {
                    if (choiceTipe.key === '4' && item.kategori === 'task' && !item.my_project) {
                        arrKategori.push({
                            key: item.id,
                            value: item.name
                        })
                    } else if (choiceTipe.key === '5' && item.kategori === 'task' && item.my_project) {
                        arrKategori.push({
                            key: item.id,
                            value: item.name
                        })
                    }
                }
            })
            setChoiceKategori(arrKategori.length > 0 ? arrKategori[0] : '')
            setDataKategori(arrKategori)
        }
    }, [choiceTipe])

    useEffect(() => {
        let arrList = []
        const index = treeView.map(e => e.id).indexOf(choiceKategori.key)
        treeView[index]?.list_tasks?.map(item => {
            arrList.push({
                key: item.id,
                value: item.name
            })
        })
        setChoiceList(arrList.length > 0 ? arrList[0] : '')
        setDataList(arrList)
    }, [choiceKategori])

    const handleChoiceSubmit = () => {
        if (choiceTipe.value === 'Dashboard') {
            dispatch(getListDashboardTM({ token: token }))
        } else if (choiceTipe.value === 'Korespondensi') {

        } else {
            dispatch(getListTaskTM({ token: token, id_list: choiceList.key, type: choiceTipe.value }))
        }
        setChoiceFilter('semua')
    }

    const filter = (event) => {
        setSearch(event)
    }

    // useEffect(() => {
    //     if (search !== '') {
    //         const status = choiceFilter == 1 ? '' : choiceFilter == 2 ? 'in progress' : choiceFilter == 3 ? 'pending' : choiceFilter == 4 ? 'completed' : 'backlog'
    //         const data = taskLists.filter((item) => {
    //             if (choiceFilter == 1) {
    //                 return item.kegiatan.toLowerCase().includes(search.toLowerCase())
    //             } else {
    //                 return item.kegiatan.toLowerCase().includes(search.toLowerCase()) && item.status === status
    //             }
    //         })
    //         setFilterData(data)
    //     } else {
    //         const status = choiceFilter == 1 ? '' : choiceFilter == 2 ? 'in progress' : choiceFilter == 3 ? 'pending' : choiceFilter == 4 ? 'completed' : 'backlog'
    //         const data = taskLists.filter((item) => {
    //             if (choiceFilter == 1) {
    //                 return item
    //             } else {
    //                 return item.status === status
    //             }
    //         })
    //         setFilterData(data)
    //     }
    // }, [search])

    useEffect(() => {
        const data = taskLists.filter((item) => {
            if (choiceFilter === 'semua') {
                return item
            } else {
                if (list.type === 'Dashboard') {
                    return item.deadline_status === choiceFilter
                } else {
                    return item.status === choiceFilter
                }
            }
        })
        setFilterData(data)
    }, [choiceFilter, list.type])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Task Management</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: 15, width: '100%' }}>
                        <TouchableOpacity onPress={bottomSheetAttachSelect} style={{ width: '80%' }}>
                            <View style={{ backgroundColor: COLORS.white, marginVertical: 20, height: 54, justifyContent: 'center', borderRadius: 8 }}>
                                <Text style={{ marginLeft: 20, color: COLORS.lighter }}>Pilih Project</Text>
                            </View>
                        </TouchableOpacity>

                        <BottomSheetModal
                            ref={bottomSheetModalSelectRef}
                            snapPoints={initialSnapPoints}
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
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: 500 }}>Pilih</Text>
                                    </View>

                                    <View style={{ width: '90%', marginHorizontal: 20 }}>
                                        <Dropdown
                                            placeHolder={'Tipe'}
                                            borderWidth={1}
                                            data={tipe}
                                            borderColor={'#D0D5DD'}
                                            selected={choiceTipe}
                                            setSelected={setChoiceTipe}
                                            handleClick={(item) => {
                                                // console.log(item.value)
                                            }}
                                        />
                                    </View>

                                    {
                                        choiceTipe.key === '3' || choiceTipe.key === '4' || choiceTipe.key === '5' ? (
                                            <>
                                                <View style={{ width: '90%', marginHorizontal: 20, marginTop: 20 }}>
                                                    <Dropdown
                                                        placeHolder={'Kategori'}
                                                        borderWidth={1}
                                                        data={dataKategori}
                                                        selected={choiceKategori}
                                                        setSelected={setChoiceKategori}
                                                        borderColor={'#D0D5DD'}
                                                    />
                                                </View>

                                                <View style={{ width: '90%', marginHorizontal: 20, marginTop: 20 }}>
                                                    <Dropdown
                                                        placeHolder={'List'}
                                                        borderWidth={1}
                                                        data={dataList}
                                                        selected={choiceList}
                                                        setSelected={setChoiceList}
                                                        borderColor={'#D0D5DD'}
                                                    />
                                                </View>
                                            </>
                                        ) : null
                                    }

                                    <TouchableOpacity style={{
                                        width: '90%',
                                        backgroundColor: COLORS.primary,
                                        height: 34,
                                        marginVertical: 40,
                                        borderRadius: 6,
                                        alignItems: 'center',
                                        marginHorizontal: 20,
                                        justifyContent: 'center'
                                    }}
                                        onPress={() => {
                                            bottomSheetSelectClose()
                                            handleChoiceSubmit()
                                        }}
                                    >
                                        <Text style={{ color: COLORS.white, fontSize: FONTSIZE.H1, fontWeight: 500 }}>Terapkan</Text>
                                    </TouchableOpacity>

                                </View>
                            </BottomSheetView>
                        </BottomSheetModal>

                        <TouchableOpacity onPress={bottomSheetAttach} style={{ width: "11%" }}>
                            <View style={{ backgroundColor: COLORS.white, marginVertical: 20, height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                                {/* <Text style={{ marginLeft: 20, color: COLORS.lighter }}>Pilih Project</Text> */}
                                <Ionicons name='search-outline' size={24} color={COLORS.primary} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column', gap: 4, flex: 1 }}>
                            <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>{list.type}</Text>
                            {
                                list.type === 'Dashboard' || list.type === 'Korespondensi' ? null :
                                    (
                                        <Text style={{ fontSize: FONTSIZE.H3, fontWeight: FONTWEIGHT.normal, color: COLORS.lighter }} numberOfLines={2}>{list.name}</Text>
                                    )
                            }
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, gap: 5 }}>
                            <TouchableOpacity onPress={() => dispatch(setVariant("filter"))}>
                                <View style={styles.circleList}>
                                    <Ionicons name='filter-outline' size={24} color={variant === 'filter' ? COLORS.primary : COLORS.grey} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(setVariant("reorder"))}>
                                <View style={styles.circleList}>
                                    <Ionicons name='reorder-three-outline' size={24} color={variant === 'reorder' ? COLORS.primary : COLORS.grey} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(setVariant("list"))}>
                                <View style={styles.circleList}>
                                    <Ionicons name='list-outline' size={24} color={variant === 'list' ? COLORS.primary : COLORS.grey} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(setVariant("grid"))}>
                                <View style={styles.circleList}>
                                    <Ionicons name='apps-outline' size={24} color={variant === 'grid' ? COLORS.primary : COLORS.grey} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginTop: 20, width: '90%', marginHorizontal: '5%' }}>
                        {
                            list.type === 'Dashboard' ? (
                                <TopsTaskDashboard />
                            ) : list.type === 'Korespondensi' ? (
                                <TopsTaskKorespondensi />
                            ) : (
                                <TopsTask />
                            )
                        }
                    </View>

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
                            <View style={{ marginHorizontal: 20 }}>
                                <View style={{ flexDirection: 'row', gap: 16 }}>
                                    <View style={{ flex: 1, backgroundColor: '#F0F0F0', borderRadius: 8, borderColor: COLORS.white, }}>
                                        <Search
                                            placeholder={"Cari"}
                                            iconColor={COLORS.primary}
                                            onSearch={filter}
                                        />
                                    </View>
                                    <TouchableOpacity style={{ justifyContent: 'center' }}
                                        onPress={() => {
                                            bottomSheetAttachClose()
                                        }}
                                    >
                                        <Text style={{ fontSize: FONTSIZE.H1, color: COLORS.infoDanger, fontWeight: 500 }}>Batal</Text>
                                    </TouchableOpacity>
                                </View>

                                <FilterTask choiceFilter={choiceFilter} setChoiceFilter={setChoiceFilter} filterData={filterData} type={list.type} />
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    {
                        list.type === 'Task Dari Saya' ? (
                            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                                <TouchableOpacity onPress={bottomSheetAdd}>
                                    <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name='add-outline' size={24} color={COLORS.white} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }

                    <BottomSheetModal
                        ref={bottomSheetModalAddRef}
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
                        <BottomSheetView onLayout={handleContentLayout}>
                            <View style={{ marginBottom: 50 }}>
                                <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 10, borderRadius: 8 }}>
                                    <TouchableOpacity
                                        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                                        onPress={() => {
                                            bottomsheetAddCategory()
                                        }}
                                    >
                                        <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Kategori</Text>
                                    </TouchableOpacity>
                                </View>

                                { }
                                <View style={{ marginHorizontal: 20, backgroundColor: COLORS.infoDanger, height: 60, marginTop: 10, borderRadius: 8 }}>
                                    <TouchableOpacity
                                        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                                        onPress={() => {
                                            // navigation.navigate('TambahGrup', { unread: false })
                                            // props.navigation.navigate('Home', { unread: false })
                                            // bottomSheetClose()
                                            navigation.navigate('AddTask')
                                            bottomsheetAddClose()
                                        }}
                                    >
                                        <Text style={{ color: COLORS.white, fontWeight: FONTWEIGHT.bold }}>Tambah Task</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    {/* tambah ketegori */}
                    <BottomSheetModal
                        ref={bottomSheetModalAddCategoryRef}
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
                        <BottomSheetView onLayout={handleContentLayout}>
                            <View>
                                <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 20, marginTop: 20 }}>
                                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Kategori Baru</Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={{ color: COLORS.infoDanger }}>Reset</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Nama Kategori'
                                        style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD' }}
                                    />
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Nama Sub Kategori'
                                        style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD' }}
                                    />
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Nama Sub Sub Kategori'
                                        style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD' }}
                                    />
                                </View>

                                <TouchableOpacity style={{
                                    marginBottom: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    marginTop: 10,
                                    backgroundColor: COLORS.infoDanger,
                                    width: '90%',
                                    height: 50,
                                    marginHorizontal: 20,
                                    borderRadius: 6
                                }}
                                    onPress={() => {
                                        bottomsheetAddCategoryClose()
                                    }}
                                >
                                    <Text style={{ color: COLORS.white, fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Simpan</Text>
                                </TouchableOpacity>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    {/* tambah sub kategori */}
                    <BottomSheetModal
                        ref={bottomSheetModalAddSubCategoryRef}
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
                        <BottomSheetView onLayout={handleContentLayout}>
                            <View>
                                <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 20, marginTop: 20 }}>
                                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Sub Kategori Baru</Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={{ color: COLORS.infoDanger }}>Reset</Text>
                                    </View>
                                </View>
                                <View style={{ width: '90%', marginHorizontal: 20, marginTop: 20 }}>

                                    {/* <Dropdown
                                        placeHolder={'Kategori'}
                                        borderWidth={1}
                                        data={kategori}
                                        borderColor={'#D0D5DD'}
                                    /> */}
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Nama Sub Kategori'
                                        style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD' }}
                                    />
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Nama Sub Sub Kategori'
                                        style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD' }}
                                    />
                                </View>

                                <TouchableOpacity style={{
                                    marginBottom: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    marginTop: 10,
                                    backgroundColor: COLORS.infoDanger,
                                    width: '90%',
                                    height: 50,
                                    marginHorizontal: 20,
                                    borderRadius: 6
                                }}
                                    onPress={() => {
                                        bottomsheetAddSubCategoryClose()
                                    }}
                                >
                                    <Text style={{ color: COLORS.white, fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Simpan</Text>
                                </TouchableOpacity>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    {/* tambah sub sub kategori */}
                    <BottomSheetModal
                        ref={bottomSheetModalAddSubSubCategoryRef}
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
                        <BottomSheetView onLayout={handleContentLayout}>
                            <View>
                                <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 20, marginTop: 20 }}>
                                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Sub Sub Kategori Baru</Text>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                        <Text style={{ color: COLORS.infoDanger }}>Reset</Text>
                                    </View>
                                </View>
                                <View style={{ width: '90%', marginHorizontal: 20, marginTop: 20 }}>

                                    {/* <Dropdown
                                        placeHolder={'Kategori'}
                                        borderWidth={1}
                                        data={kategori}
                                        borderColor={'#D0D5DD'}
                                    /> */}
                                </View>

                                <View style={{ width: '90%', marginHorizontal: 20, marginTop: 20 }}>

                                    {/* <Dropdown
                                        placeHolder={'Sub Kategori'}
                                        borderWidth={1}
                                        data={kategori}
                                        borderColor={'#D0D5DD'}
                                    /> */}
                                </View>

                                <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }}>

                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        placeholder='Nama Sub Sub Kategori'
                                        style={{ borderWidth: 1, width: '90%', height: 40, paddingHorizontal: 10, paddingTop: 10, borderRadius: 6, borderColor: '#D0D5DD' }}
                                    />
                                </View>

                                <TouchableOpacity style={{
                                    marginBottom: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    marginTop: 10,
                                    backgroundColor: COLORS.infoDanger,
                                    width: '90%',
                                    height: 50,
                                    marginHorizontal: 20,
                                    borderRadius: 6
                                }}
                                    onPress={() => {
                                        bottomsheetAddSubSubCategoryClose()
                                    }}
                                >
                                    <Text style={{ color: COLORS.white, fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold }}>Simpan</Text>
                                </TouchableOpacity>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    circleList: {
        width: 35,
        height: 35,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20
    },
    checkbox: {
        alignSelf: 'flex-end',
    },
})
