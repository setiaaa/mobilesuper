import React from 'react'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS, DATETIME, FONTSIZE, FONTWEIGHT, PADDING } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getArsipCuti } from '../../service/api'
import { useEffect } from 'react'
import { FlatList } from 'react-native'
import ListEmpty from '../../components/ListEmpty'
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

export const DokumenCuti = () => {
    const navigation = useNavigation()
    const [variant, SetVariant] = useState('')
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.superApps)
    useEffect(() => {
        if (profile.nip !== "") {
            dispatch(getArsipCuti(profile?.nip))
        }
    }, [profile?.nip]);
    const { arsip } = useSelector(state => state.cuti)
    const arsipLists = arsip.lists.data
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
                            />
                        </View>
                    </View>

                    <View style={{ gap: 10 }}>
                        <View style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 8 }}>
                            <View style={{ paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'center', gap: 30 }}>
                                <TouchableOpacity style={{
                                    maxWidth: 80,
                                    borderColor: variant === 'draft' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 10
                                }}
                                    onPress={() => SetVariant('draf')}
                                >
                                    <View style={{
                                        backgroundColor: COLORS.grey,
                                        borderRadius: 20,
                                        width: 28,
                                        height: 28,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 5
                                    }}>
                                        <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                    </View>
                                    <Text style={{ color: variant === 'draft' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center', marginTop: 40 }}>Draft</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    maxWidth: 60,
                                    borderColor: variant === 'onprogress' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 10
                                }}
                                    onPress={() => SetVariant('onprogress')}
                                >
                                    <View style={{
                                        backgroundColor: COLORS.orange,
                                        borderRadius: 20,
                                        width: 28,
                                        height: 28,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 5
                                    }}>
                                        <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                    </View>
                                    <Text style={{ color: variant === 'onprogress' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center', marginTop: 40 }}>Sedang Proses</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    maxWidth: 120,
                                    borderColor: variant === 'postponed' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 10
                                }}
                                    onPress={() => SetVariant('postponed')}
                                >
                                    <View style={{
                                        backgroundColor: COLORS.success,
                                        borderRadius: 20,
                                        width: 28,
                                        height: 28,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 5
                                    }}>
                                        <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                    </View>
                                    <Text style={{ color: variant === 'postponed' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center', marginTop: 40 }}>Disetujui</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    maxWidth: 60,
                                    borderColor: variant === 'rejected' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 10

                                }}
                                    onPress={() => SetVariant('rejected')}
                                >
                                    <View style={{
                                        backgroundColor: COLORS.danger,
                                        borderRadius: 20,
                                        width: 28,
                                        height: 28,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 5
                                    }}>
                                        <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                    </View>
                                    <Text style={{ color: variant === 'rejected' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center', marginTop: 40 }}>Tidak Disetujui</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        {variant === 'postponed' ? (
                            <FlatList
                                data={arsipLists}
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
                        ) : variant === 'draft' ? (
                            <FlatList
                                data={arsipLists}
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
                        ) : variant === 'onprogress' ? (
                            <FlatList
                                data={arsipLists}
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
                        ) : variant === 'rejected' ? (
                            <FlatList
                                data={arsipLists}
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

            </ View >
        </GestureHandlerRootView >
    )
}
