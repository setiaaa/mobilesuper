import React from 'react'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { COLORS, FONTSIZE, FONTWEIGHT, PADDING } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Search } from '../../components/Search'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { FlatList } from 'react-native'
import ListEmpty from '../../components/ListEmpty'

const ListDokumen = ({ item, variant, token }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isSelected, setSelection] = useState(false);
    // const getDetail = (id) => {
    //     const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    // dispatch(getDetailDigisign(params));
    //   };
    return (

        <View style={{ backgroundColor: COLORS.white, padding: 10, borderRadius: 8, gap: 15 }}>
            <Text style={{ fontSize: 12 }}>Tanggal Pengajuan: 30 Sepember 2023 | 15:33:30</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='person' size={18} color={COLORS.primary} />
                <Text style={{ fontSize: 12 }}>Pemohon: Muhammad Zaini / 196308141989031021</Text>
            </View>
            <Text style={{ fontSize: 12, color: COLORS.lighter }}>Jenis: Cuti Alasan Penting</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: COLORS.lighter }}>Tipe Dokumen: </Text>
                <View style={{ backgroundColor: 'red', borderRadius: 10, padding: 5, }}>
                    <Text style={{ fontSize: 12, color: COLORS.white }}>Pembatalan Cuti</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                    <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                    <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai: 01 Jan 2021</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                    <Ionicons name='calendar-outline' size={18} color={COLORS.primary} />
                    <Text style={{ fontSize: 12, color: COLORS.lighter }}>Mulai: 01 Jan 2021</Text>
                </View>
            </View>
        </View>
    );
}

export const PersetujanCuti = () => {
    const navigation = useNavigation()
    const [variant, SetVariant] = useState('')


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
                                        onPress={() => filterHandlerDraft()}
                                    >
                                        <View style={{
                                            backgroundColor: COLORS.success,
                                            borderRadius: 20,
                                            width: 28,
                                            height: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Libur')}>
                                                <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{ color: variant === 'draft' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center' }}>Disetujui Anda</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        maxWidth: 120,
                                        borderColor: variant === 'composer' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 10
                                    }}
                                        onPress={() => filterHandlerComposer()}
                                    >
                                        <View style={{
                                            backgroundColor: COLORS.danger,
                                            borderRadius: 20,
                                            width: 28,
                                            height: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Libur')}>
                                                <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{ color: variant === 'composer' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center' }}>Tidak Disetujui Anda</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        maxWidth: 98,
                                        borderColor: variant === 'inprogress' ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 10

                                    }}
                                        onPress={() => filterHandlerInProgress()}
                                    >
                                        <View style={{
                                            backgroundColor: COLORS.orange,
                                            borderRadius: 20,
                                            width: 28,
                                            height: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Libur')}>
                                                <Ionicons name='calendar-outline' size={18} color={COLORS.white} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{ color: variant === 'inprogress' ? COLORS.infoDanger : COLORS.foundation, textAlign: 'center' }}>Dikembalikan Anda</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            {/* <FlatList
                            // data={filterData}
                            renderItem={({ item }) => (
                                <View key={item.id}>
                                    <ListDokumen
                                        item={item}
                                        token={token}
                                        variant = {variant}
                                    />
                                </View>
                            )}
                            keyExtractor={item => item.id}
                            ListEmptyComponent={() => <ListEmpty />}
                            style={{ height: '70%' }} 
                        /> */}

                        </View>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate('DetailDokumenCuti')}><Text>Temp TO DETAIL</Text></TouchableOpacity>

                    </View>
                </View>
            </ View>
        </GestureHandlerRootView >
    )
}
