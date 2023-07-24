import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import React, { useMemo, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { TopsTaks } from '../Korespondensi/AppNavigator'
import { FlatList } from 'react-native'
import { CardListTask } from '../../components/CardListTask'
import { CardTaskCari } from '../../components/CardTaskCari'
import { Search } from '../../components/Search'


const item = [
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger
    },
    {
        kegiatan: 'Membuat laporan Kenaikan Gaji Berkala (KGB)',
        tanggal: '22 Juli 2023',
        subAvatar: [
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 },
            { avatar: AVATAR.U2 }
        ],
        warna: COLORS.infoDanger
    },
]

export const MyTask = () => {
    const navigation = useNavigation()
    const [variant, setVariant] = useState('list')
    const bottomSheetModalRef = useRef(null);
    const [badge, setBadge] = useState(1)

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
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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

                <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: 15 }}>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: COLORS.white, marginVertical: 20, height: 54, width: 317, justifyContent: 'center', borderRadius: 8 }}>
                            <Text style={{ marginLeft: 20, color: COLORS.lighter }}>Pilih Project</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={bottomSheetAttach}>
                        <View style={{ backgroundColor: COLORS.white, marginVertical: 20, height: 54, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                            {/* <Text style={{ marginLeft: 20, color: COLORS.lighter }}>Pilih Project</Text> */}
                            <Ionicons name='search-outline' size={24} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: FONTSIZE.H1, fontWeight: FONTWEIGHT.bold, color: COLORS.lighter }}>Task Saya</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, gap: 5 }}>
                        <TouchableOpacity>
                            <View style={styles.circleList}>
                                <Ionicons name='filter-outline' size={24} color={variant === 'grid' ? COLORS.primary : COLORS.grey} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.circleList}>
                                <Ionicons name='reorder-three-outline' size={24} color={variant === 'grid' ? COLORS.primary : COLORS.grey} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <View style={styles.circleList}>
                                <Ionicons name='list-outline' size={24} color={variant === 'list' ? COLORS.primary : COLORS.grey} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.circleList}>
                                <Ionicons name='apps-outline' size={24} color={variant === 'grid' ? COLORS.primary : COLORS.grey} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, marginTop: 20, width: 362, marginHorizontal: 15 }}>
                    <TopsTaks />
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
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '75%', marginHorizontal: 20, backgroundColor: '#F0F0F0', borderRadius: 8, borderColor: COLORS.white, }}>
                                    <Search
                                        placeholder={"Cari"}
                                        iconColor={COLORS.primary}
                                    />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: FONTSIZE.H1, color: COLORS.infoDanger, fontWeight: 500 }}>Batal</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>

                                <TouchableOpacity onPress={() => {
                                    setBadge(1)
                                }}>
                                    <View style={{
                                        backgroundColor: badge === 1 ? COLORS.infoDangerLight : COLORS.white,
                                        borderColor: badge === 1 ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        marginVertical: 10
                                    }}>
                                        <Text style={{
                                            color: badge == 1 ? COLORS.primary : COLORS.grey,
                                            marginVertical: 10,
                                            marginHorizontal: 7,
                                            fontSize: FONTSIZE.H3
                                        }}>
                                            Semua
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setBadge(2)
                                }}>
                                    <View style={{
                                        backgroundColor: badge === 2 ? COLORS.infoDangerLight : COLORS.white,
                                        borderColor: badge === 2 ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        marginVertical: 10
                                    }}>
                                        <Text style={{
                                            color: badge == 2 ? COLORS.primary : COLORS.grey,
                                            marginVertical: 10,
                                            marginHorizontal: 7,
                                            fontSize: FONTSIZE.H3
                                        }}>
                                            In Progres
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setBadge(3)
                                }}>
                                    <View style={{
                                        backgroundColor: badge === 3 ? COLORS.infoDangerLight : COLORS.white,
                                        borderColor: badge === 3 ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        marginVertical: 10
                                    }}>
                                        <Text style={{
                                            color: badge == 3 ? COLORS.primary : COLORS.grey,
                                            marginVertical: 10,
                                            marginHorizontal: 7,
                                            fontSize: FONTSIZE.H3
                                        }}>
                                            Pending
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setBadge(4)
                                }}>
                                    <View style={{
                                        backgroundColor: badge === 4 ? COLORS.infoDangerLight : COLORS.white,
                                        borderColor: badge === 4 ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        marginVertical: 10
                                    }}>
                                        <Text style={{
                                            color: badge == 4 ? COLORS.primary : COLORS.grey,
                                            marginVertical: 10,
                                            marginHorizontal: 7,
                                            fontSize: FONTSIZE.H3
                                        }}>
                                            Complete
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setBadge(5)
                                }}>
                                    <View style={{
                                        backgroundColor: badge === 5 ? COLORS.infoDangerLight : COLORS.white,
                                        borderColor: badge === 5 ? COLORS.infoDangerLight : COLORS.ExtraDivinder,
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        marginVertical: 10
                                    }}>
                                        <Text style={{
                                            color: badge == 5 ? COLORS.primary : COLORS.grey,
                                            marginVertical: 10,
                                            marginHorizontal: 7,
                                            fontSize: FONTSIZE.H3
                                        }}>
                                            Back Log
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
                                <FlatList
                                    data={item}
                                    renderItem={({ item }) => <CardTaskCari
                                        kegiatan={item.kegiatan}
                                        subAvatar={item.subAvatar}
                                        warna={item.warna}
                                        tanggal={item.tanggal}
                                    />
                                    }
                                />
                            </View>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
                <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='add-outline' size={24} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheetModalProvider>
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
    }
})
