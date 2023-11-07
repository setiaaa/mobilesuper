import React, { useEffect } from 'react'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS, DATETIME, FONTSIZE, FONTWEIGHT, PADDING } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList } from 'react-native'
import ListEmpty from '../../components/ListEmpty'
import { getDetailArsipCuti, getDokumenPersetujuan } from '../../service/api'
import moment from 'moment'

const ListDokumenDisetujui = ({ item, nip }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const getDetail = (id) => {
        const params = { nip, id };
        // const data = event.listsprogress.find(item => item.id === id)
        console.log(nip, id)
        dispatch(getDetailArsipCuti(params));
    };

    return (
        <>
            {item.status === 'Completed' ? (
                <TouchableOpacity onPress={onPress = () => {
                    getDetail(item.id)
                    // navigation.navigate('DetailDokumenCuti')
                }}>
                    <View style={{ backgroundColor: COLORS.white, padding: 10, borderRadius: 8, gap: 15 }}>
                        <Text style={{ fontSize: 12 }}>Tanggal Pengajuan: {moment(item.tanggal_pembuatan, 'DD MMMM YYYY HH:mm:ss').format(DATETIME.LONG_DATETIME)}</Text>
                        <Text style={{ fontSize: 12, color: COLORS.lighter }}>Jenis: {item.jenis_cuti}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: COLORS.lighter }}>Tipe Dokumen: </Text>
                            <View style={{ backgroundColor: COLORS.success, borderRadius: 10, padding: 5, }}>
                                <Text style={{ fontSize: 12, color: COLORS.white }}>{item.tipe_dokumen}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai: {moment(item.mulai_cuti, DATETIME.LONG_DATETIME).format(DATETIME.LONG_DATETIME)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', marginTop: 10 }}>
                                <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai: {moment(item.akhir_cuti, DATETIME.LONG_DATETIME).format(DATETIME.LONG_DATETIME)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                null
            )}
        </>
    );
}

const ListDokumenTidakDisetujui = ({ item, variant, token }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    return (
        <>
            {item.status === 'Postponed' ? (
                <TouchableOpacity onPress={onPress = () => navigation.navigate('DetailDokumenCuti')}>
                    <View style={{ backgroundColor: COLORS.white, padding: 10, borderRadius: 8, gap: 15 }}>
                        <Text style={{ fontSize: 12 }}>Tanggal Pengajuan: {moment(item.tanggal_pembuatan, 'DD MMMM YYYY HH:mm:ss').format(DATETIME.LONG_DATETIME)}</Text>
                        <Text style={{ fontSize: 12, color: COLORS.lighter }}>Jenis: {item.jenis_cuti}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: COLORS.lighter }}>Tipe Dokumen: </Text>
                            <View style={{ backgroundColor: 'red', borderRadius: 10, padding: 5, }}>
                                <Text style={{ fontSize: 12, color: COLORS.white }}>{item.tipe_dokumen}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai: {moment(item.mulai_cuti, DATETIME.LONG_DATETIME).format(DATETIME.LONG_DATETIME)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', marginTop: 10 }}>
                                <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai: {moment(item.akhir_cuti, DATETIME.LONG_DATETIME).format(DATETIME.LONG_DATETIME)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                null
            )}
        </>
    );
}

const ListDokumenTidakDikembalikan = ({ item, variant, token }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    return (
        <>
            {item.status !== 'Postponed' && item.status !== 'Completed' ? (
                <TouchableOpacity onPress={onPress = () => navigation.navigate('DetailDokumenCuti')}>
                    <View style={{ backgroundColor: COLORS.white, padding: 10, borderRadius: 8, gap: 15 }}>
                        <Text style={{ fontSize: 12 }}>Tanggal Pengajuan: {moment(item.tanggal_pembuatan, 'DD MMMM YYYY HH:mm:ss').format(DATETIME.LONG_DATETIME)}</Text>
                        <Text style={{ fontSize: 12, color: COLORS.lighter }}>Jenis: {item.jenis_cuti}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: COLORS.lighter }}>Tipe Dokumen: </Text>
                            <View style={{ backgroundColor: 'red', borderRadius: 10, padding: 5, }}>
                                <Text style={{ fontSize: 12, color: COLORS.white }}>{item.tipe_dokumen}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai: {moment(item.mulai_cuti, DATETIME.LONG_DATETIME).format(DATETIME.LONG_DATETIME)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', marginTop: 10 }}>
                                <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai: {moment(item.akhir_cuti, DATETIME.LONG_DATETIME).format(DATETIME.LONG_DATETIME)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                null
            )}
        </>
    );
}

export const PersetujanCuti = () => {
    const navigation = useNavigation()
    const [variant, SetVariant] = useState('setuju')
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.superApps)

    useEffect(() => {
        if (profile.nip !== "") {
            dispatch(getDokumenPersetujuan(profile?.nip))
        }
    }, [profile?.nip]);

    const { persetujuan } = useSelector(state => state.cuti)

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])


    const filter = (event) => {
        setSearch(event)
    }

    useEffect(() => {
        setFilterData(persetujuan.lists.data)
    }, [persetujuan])

    useEffect(() => {
        if (search !== '') {
            const data = persetujuan.lists?.data.filter((item) => {
                return item.jenis_cuti.toLowerCase().includes(search.toLowerCase());
            })
            setFilterData(data)
        } else {
            setFilterData(persetujuan.lists.data)
        }
    }, [search])

    console.log(persetujuan.lists)

    return (
        <GestureHandlerRootView>
            < View style={{ position: 'relative' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, height: 80, }}>
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
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.white }}>Cuti</Text>
                    </View>
                    <View style={{
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        width: 28,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 20
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Libur')}>
                            <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ padding: PADDING.Page }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '100%', marginTop: 20, }}>
                            <Search
                                placeholder={'Cari'}
                                iconColor={COLORS.primary}
                                onSearch={filter}
                            />
                        </View>
                    </View>

                    <View style={{ gap: 10 }}>
                        <View style={{ gap: 10 }}>
                            <View style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 8 }}>
                                <View style={{ paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'center', gap: 30 }}>
                                    <TouchableOpacity style={{
                                        maxWidth: 80,
                                        borderColor: variant === 'setuju' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 10
                                    }}
                                        onPress={() => {
                                            SetVariant('setuju')
                                        }}
                                    >
                                        <View style={{
                                            backgroundColor: COLORS.success,
                                            borderRadius: 20,
                                            width: 28,
                                            height: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                        </View>
                                        <Text style={{ color: variant === 'setuju' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center' }}>Disetujui Anda</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        maxWidth: 120,
                                        borderColor: variant === 'tidak setuju' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 10
                                    }}
                                        onPress={() => SetVariant('tidak setuju')}
                                    >
                                        <View style={{
                                            backgroundColor: COLORS.danger,
                                            borderRadius: 20,
                                            width: 28,
                                            height: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                        </View>
                                        <Text style={{ color: variant === 'tidak setuju' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center' }}>Tidak Disetujui Anda</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        maxWidth: 98,
                                        borderColor: variant === 'kembalikan' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 10

                                    }}
                                        onPress={() => SetVariant('kembalikan')}
                                    >
                                        <View style={{
                                            backgroundColor: COLORS.orange,
                                            borderRadius: 20,
                                            width: 28,
                                            height: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                        </View>
                                        <Text style={{ color: variant === 'kembalikan' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center' }}>Dikembalikan Anda</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            {/* <TouchableOpacity onPress={onPress=()=>navigation.navigate('DetailDokumenCuti')}>
                        <View style={{backgroundColor: COLORS.white, padding: 10, borderRadius: 8, gap: 15}}>
                                    <Text style={{fontSize: 12}}>Tanggal Pengajuan: 30 Sepember 2023 | 15:33:30</Text>
                                    <Text style={{fontSize: 12, color: COLORS.lighter}}>Jenis: Cuti Alasan Penting</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{fontSize: 12, color: COLORS.lighter}}>Tipe Dokumen: </Text>
                                        <View style={{backgroundColor: 'red', borderRadius: 10, padding: 5,}}>
                                            <Text style={{ fontSize: 12, color: COLORS.white}}>Pembatalan Cuti</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                                            <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                            <Text style={{ fontSize: 12, color: COLORS.lighter}}>Mulai: 01 Jan 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                                            <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                                            <Text style={{ fontSize: 12, color: COLORS.lighter}}>Mulai: 01 Jan 2021</Text>
                                        </View>
                                    </View>
                            </View>
                    </TouchableOpacity> */}
                            {variant === 'setuju' ? (
                                <FlatList
                                    data={filterData}
                                    renderItem={({ item }) => (
                                        <View key={item.id}>
                                            <ListDokumenDisetujui
                                                item={item}
                                                nip={profile.nip}
                                                variant={variant}
                                            />
                                        </View>
                                    )}
                                    keyExtractor={item => item.id}
                                    ListEmptyComponent={() => <ListEmpty />}
                                    style={{ height: '70%' }}
                                />
                            ) : variant === 'tidak setuju' ? (
                                <FlatList
                                    data={filterData}
                                    renderItem={({ item }) => (
                                        <View key={item.id}>
                                            <ListDokumenTidakDisetujui
                                                item={item}
                                                variant={variant}
                                            />
                                        </View>
                                    )}
                                    keyExtractor={item => item.id}
                                    ListEmptyComponent={() => <ListEmpty />}
                                    style={{ height: '70%' }}
                                />
                            ) : variant === 'kembalikan' ? (
                                <FlatList
                                    data={persetujuan.lists?.data}
                                    renderItem={({ item }) => (
                                        <View key={item.id}>
                                            <ListDokumenTidakDikembalikan
                                                item={item}
                                                variant={variant}
                                            />
                                        </View>
                                    )}
                                    keyExtractor={item => item.id}
                                    ListEmptyComponent={() => <ListEmpty />}
                                    style={{ height: '70%' }}
                                />
                            ) : (
                                null
                            )}


                        </View>

                    </View>
                </View>
            </ View>
        </GestureHandlerRootView >
    )
}
