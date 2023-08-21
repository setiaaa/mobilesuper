import React, { useMemo, useRef } from 'react'
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTSIZE, FONTWEIGHT } from '../../config/SuperAppps'
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { Search } from '../../components/Search'


const CardPenilaian = ({ item }) => {
    const navigation = useNavigation()
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {item.listPenilaian?.map((data) =>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    width: '90%',
                    gap: 10,
                    marginTop: 10,
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    //shadow ios
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: '#171717',
                    shadowOpacity: 0.2,
                    //shadow android
                    elevation: 2,

                }}
                    onPress={() => navigation.navigate('DetailPenilain', { item: data })}
                >
                    <View>
                        <Image source={data.image} style={{ width: 70, height: 50 }} />
                    </View>
                    <View style={{ width: '75%' }}>
                        <Text>{data.judul}</Text>
                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ color: COLORS.lighter }}>Tanggal: {data.tanggal}</Text>
                            <Text style={{ color: COLORS.lighter }}>Poin:</Text>
                            {data.point === 'Waiting' ? (
                                <View style={{
                                    borderWidth: 1,
                                    padding: 5,
                                    borderColor: COLORS.primary,
                                    borderRadius: 16
                                }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.primary }}>{data.point}</Text>
                                </View>
                            ) : (
                                <View style={{
                                    padding: 5,
                                    backgroundColor: COLORS.success,
                                    borderRadius: 16
                                }}>
                                    <Text style={{ fontSize: FONTSIZE.H4, color: COLORS.white }}>{data.point}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

export const PenilaianPenggetahaun = () => {
    const navigation = useNavigation()
    const { penilaian } = useSelector(state => state.pengetahuan)

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
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Ionicons name='chevron-back-outline' size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 50 }}>
                        <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>Penilaian</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 20, gap: 5 }}>
                    <View style={{
                        height: 54,
                        width: 150,
                        backgroundColor: COLORS.white,
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingLeft: 10
                    }}>
                        <Text style={{ color: COLORS.lighter }}>Pilih Tahun</Text>
                    </View>

                    <View style={{
                        height: 54,
                        width: 150,
                        backgroundColor: COLORS.white,
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingLeft: 10
                    }}>
                        <Text style={{ color: COLORS.lighter }}>Pilih Kuartal</Text>
                    </View>

                    <TouchableOpacity style={{
                        height: 54,
                        width: 44,
                        backgroundColor: COLORS.white,
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingLeft: 10
                    }}
                        onPress={() => {
                            bottomSheetAttach()
                        }}
                    >
                        <Ionicons name='search-outline' size={24} />
                    </TouchableOpacity>
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
                        <View style={{ flex: 1 }}>
                            <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                {/* <TouchableOpacity onPress={() => bottomSheetAttachClose()}>
                                    <Ionicons name='chevron-back-outline' size={24} />
                                </TouchableOpacity> */}
                                <View style={{ width: 291 }}>
                                    <Search
                                        placeholder={'Cari'}
                                    />
                                </View>
                                <Text style={{ color: COLORS.danger }}>Batal</Text>
                            </View>

                            {/* custom divider */}
                            <View style={{ height: 1, width: '100%', backgroundColor: '#DBDADE', marginVertical: 20 }} />

                            <FlatList
                                data={penilaian.lists}
                                renderItem={({ item }) => <CardPenilaian
                                    item={item}
                                />
                                }
                                keyExtractor={item => item}
                            />

                        </View>
                    </BottomSheetView>
                </BottomSheetModal>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, gap: 5 }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        width: 175,
                        height: 100,
                        borderRadius: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        gap: 10
                    }}>
                        <View style={{
                            backgroundColor: COLORS.secondaryLighter,
                            width: 64,
                            height: 64,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Ionicons name='clipboard-outline' size={40} color={COLORS.lighter} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>BELUM{'\n'}DITINJAU</Text>
                            {penilaian.lists.map((item) => {
                                return (
                                    <Text style={{ fontSize: 25, fontWeight: FONTWEIGHT.bold, marginTop: 10 }}>{item.belumDitinjau}</Text>
                                )
                            })}
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: COLORS.white,
                        width: 175,
                        height: 100,
                        borderRadius: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        gap: 10
                    }}>
                        <View style={{
                            backgroundColor: COLORS.successLight,
                            width: 64,
                            height: 64,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Ionicons name='clipboard-outline' size={40} color={COLORS.success} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: FONTWEIGHT.bold }}>TELAH{'\n'}DITINJAU</Text>
                            {penilaian.lists?.map((item) => {
                                return (
                                    <Text style={{ fontSize: 25, fontWeight: FONTWEIGHT.bold, marginTop: 10 }}>{item.telahDitinjau}</Text>
                                )
                            })}
                        </View>
                    </View>
                </View>

                <FlatList
                    data={penilaian.lists}
                    renderItem={({ item }) => <CardPenilaian
                        item={item}
                    />
                    }
                    keyExtractor={item => item}
                    style={{ marginTop: 10 }}
                />
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'white',
        height: 28,
        width: 28,
        borderRadius: 50,
    },
    imageIos: {
        height: 193, width: 350, borderRadius: 16
    },
    imageAndroid: {
        height: 193, width: 369, borderRadius: 16
    },
})
